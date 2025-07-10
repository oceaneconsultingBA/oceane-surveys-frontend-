import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { QuestionsComponent } from "../questions/questions.component"; 
import { SurveyService } from '../../services/survey-service.service';
import { Question } from '../../models/question';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AnswerService } from '../../services/answer-service.service';
import { Answer } from '../../models/answer';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-answer',
  imports: [
    ToastModule,
    ToolbarModule,
    StepsModule,
    ButtonModule,
    ReactiveFormsModule,
    TableModule,
    CommonModule,
    DropdownModule,
    QuestionsComponent
],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss'
})
export class AnswerComponent implements OnInit {
  @ViewChild('questionList') questionList!: QuestionsComponent;
  @Input() answered = false;
  @Input() surveyId = null as unknown as number;
  @Input() recipientId = null as unknown as number;
  activeStep = 0;
  surveyForm: FormGroup;
  questions: any[] = [];
  previousRecipients: number[] = [];
  questionDTOs = null as unknown as Question[];
  token = null as unknown as string;

  creationDate = null as unknown as Date;
  description: string = '';
  enqueteTypes = [
    { label: 'Satisfaction Consultant', value: 'satisfaction_consultant' },
    { label: 'Satisfaction Client', value: 'satisfaction_client' },
    { label: 'Autre', value: 'autre' }
  ];
  frequencies = [
    { label: 'Mensuelle', value: 'mensuelle' },
    { label: 'Trimestrielle', value: 'trimestrielle' },
    { label: 'Annuelle', value: 'annuelle' }
  ];

  steps = [
    { label: 'Informations' },
    { label: 'Questions' },
    { label: 'Merci' }
  ];

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private answerService: AnswerService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    console.log("Chargement des champs de formulaire");
    this.surveyForm = this.fb.group({
      surveyName: ['', Validators.required],
      description: [null, Validators.required],
      enqueteType: [null, Validators.required],
      frequencies: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.surveyId) {
      console.log("Chargement pour l'enquête #" + this.surveyId);
      this.initComponent();
    } else {
      console.log("Chargement des paramètres de page");
      // Get the current route and its query parameters
      this.route.queryParams.pipe(
        filter(params => params['survey-id'])
      )
      .subscribe(params => {
        // Read the query parameters
        if (!this.surveyId) {
          this.surveyId = params['survey-id'];
        }
        this.recipientId = params['recipient-id'];
        this.token = params['token'];
        console.log('this.surveyId : ' + this.surveyId);

        if (this.surveyId) {
          this.initComponent();
        }
      });
    }
  }

  private initComponent() {
    console.log("Chargement de l'enquête déjà créée");
    this.surveyService.getSurvey(this.surveyId).subscribe(response => {
      console.log('Chargement des ' + response.questions.length + " question(s) de l'enquête déjà créée");
      this.surveyForm.controls['surveyName'].setValue(response.title);
      this.surveyForm.controls['description'].setValue(response.description);
      this.creationDate = response.creationDate;
      this.questionDTOs = response.questions;
      this.previousRecipients = response.recipientIds;
    });
  }

  public surprise(): void {
    const canvas = this.renderer2.createElement('canvas');
    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);
    const myConfetti = confetti.create(canvas, {
      resize: true // will fit all screen sizes
    }); 
    myConfetti();
  }

  nextStep() {
    if (this.activeStep < this.steps.length - 1) {
      this.activeStep++;

      this.update();
    }
  }

  prevStep() {
    if (this.activeStep > 0) {
      this.activeStep--;

      this.update();
    }
  }

  update() {
    if (this.questionDTOs !== null) {
      console.log('Chargement des ' + this.questionDTOs.length + ' question(s) déjà créée(s)');
      
      if (this.answered) {
        this.answerService.getQuestionsBySurveyAndRecipient(this.surveyId, this.recipientId).subscribe(response => {
          console.log('Chargement des ' + response.length + " response(s) de l'enquête déjà respondue");
          this.questionList.setQuestionDTOs(this.questionDTOs);
          this.questionDTOs = null as unknown as Question[];
        });
      } else {
        this.questionList.setQuestionDTOs(this.questionDTOs);
        this.questionDTOs = null as unknown as Question[];
      }
    }
  }

  getEnqueteTypesLabel() {
    return this.enqueteTypes.find(item => item.value === this.surveyForm.controls['enqueteType'].value)?.label;
  }

  getFrequenciesLabel() {
    return this.frequencies.find(item => item.value === this.surveyForm.controls['frequencies'].value)?.label;
  }

  removeQuestion(question: any) {
    this.questions = this.questions.filter(q => q !== question);
  }
  
  publish() {
    let questions = this.questionList.getQuestionDTOs();
    let answers = this.questionList.getAnswerDTOs(this.recipientId);
    console.log(questions.length + " question(s) et " + answers.length + " réponse(s)");

    let answersByQuestionId = new Map<number, Answer>();

    for (let i = 0; i < questions.length; i++) {
      let question = questions[i];
      let answer = answers[i];
      let questionId: number = question.id;

      console.log("Nouvelle entrée " + JSON.stringify(answer));
      answersByQuestionId.set(questionId, answer);
    }

    console.log(answersByQuestionId.size + " réponse(s) remplie(s) : " + JSON.stringify(Object.fromEntries(answersByQuestionId)));
  
    this.answerService.saveAnswers(this.surveyId, this.token, Object.fromEntries(answersByQuestionId)).subscribe(
      {next: () => {
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Enquête remplie avec succès' });
      this.nextStep();
      this.surprise();
    },
    error: (err: any) => {
      console.error("Échec du remplissage de l'enquête :", err);
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: "Échec du remplissage de l'enquête" });
    }});
  }
}