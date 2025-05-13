import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { RecipientComponent } from "../recipient/recipient.component";
import { QuestionsComponent } from "../questions/questions.component"; 
import { SurveyService } from '../../services/survey-service.service';
import { SurveyStatus } from '../../models/survey-status';
import { Question } from '../../models/question';
import { Survey } from '../../models/survey';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-survey-creation',
  imports: [
    ToastModule,
    ToolbarModule,
    StepsModule,
    ButtonModule,
    ReactiveFormsModule,
    TableModule,
    CommonModule,
    RecipientComponent,
    DropdownModule,
    QuestionsComponent
  ],
  templateUrl: './survey-creation.component.html',
  styleUrl: './survey-creation.component.scss'
})
export class SurveyCreationComponent {
  @ViewChild('questions') questionsComponent!: QuestionsComponent;
  @ViewChild('recipients') recipientsComponent!: RecipientComponent;
  @ViewChild('questionSummary') questionSummary!: QuestionsComponent;
  activeStep = 0;
  surveyForm: FormGroup;
  questions: any[] = [];
  previousRecipients: number[] = [];
  questionDTOs = null as unknown as Question[];
  surveyId = null as unknown as number;

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
    { label: 'Destinataires' },
    { label: 'Validation' }
  ];

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    console.log("Chargement des champs de formulaire");
    this.surveyForm = this.fb.group({
      surveyName: ['', Validators.required],
      description: [null, Validators.required],
      enqueteType: [null, Validators.required],
      frequencies: ['', Validators.required]
    });
    
    console.log("Chargement des paramètres de page");
    // Get the current route and its query parameters
    this.route.queryParams.pipe(
      filter(params => params['survey-id'])
    )
    .subscribe(params => {
      // Read the query parameters
      this.surveyId = params['survey-id'];
      console.log('this.surveyId : ' + this.surveyId);

      if (this.surveyId) {
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
    });
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
      this.questionsComponent.setQuestionDTOs(this.questionDTOs);
      this.questionDTOs = null as unknown as Question[];
    }

    if (this.previousRecipients !== null) {
      console.log('Chargement des ' + this.previousRecipients.length + ' destinataire(s) déjà créée(s)');
      this.recipientsComponent.setSelectedRecipients(this.previousRecipients);
      this.previousRecipients = null as unknown as number[];
    }
    
    this.questionSummary.setQuestionDTOs(this.questionsComponent.getQuestionDTOs());
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
  
  save() {
    this.persist(SurveyStatus.DRAFT);
  }
  
  publish() {
    let messages = [] as string[];

    if (!this.surveyForm.controls['surveyName'].value) {
      messages.push("Il manque un titre d'enquête");
    }

    if (!this.surveyForm.controls['description'].value) {
      messages.push("Il manque une description d'enquête");
    }

    if (this.recipientsComponent.getSelectedRecipients().length === 0) {
      messages.push("Il manque un destinataire à l'enquête");
    }

    if (this.questionsComponent.getQuestionDTOs().length === 0) {
      messages.push("Il manque une question à l'enquête");
    }

    if (messages.length !== 0) {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: "Données manquantes",
          message: '<ul><li>' + messages.join('</li><li>') + '</li></ul>',
          confirmation: false
        }
      });
      confirmDialog.afterClosed().subscribe();
    } else {
      this.doPublish();
    }
  }
  
  doPublish() {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: "Confirmer la publication d'une enquête",
          message: "Êtes-vous sûr de vouloir publier l'enquête : " + this.surveyForm.controls['surveyName'].value + " ?",
          confirmation: true
        }
      });
      confirmDialog.afterClosed().subscribe(result => {
        if (result === true) {
          this.persist(SurveyStatus.ACTIVE);
        }
      });
  }
  
  private persist(status: SurveyStatus) {
    if (!this.creationDate) {
      this.creationDate = new Date();
    }
  
    let survey: Survey = {
      id: undefined as unknown as number,
      title: this.surveyForm.controls['surveyName'].value,
      description: this.surveyForm.controls['description'].value,
      creationDate: this.creationDate,
      lastModifiedDate: new Date(),
      status: status,
      recipientIds: this.recipientsComponent.getSelectedRecipients().map(e => e.id),
      questions: this.questionsComponent.getQuestionDTOs() as Question[]
    }
  
    if (this.surveyId) {
      this.surveyService.updateSurvey(this.surveyId, survey).subscribe(
        {next: () => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Enquête modifiée avec succès' });
      },
      error: (err: any) => {
        console.error("Échec de la modification de l'enquête :", err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: "Échec de la modification de l'enquête" });
      }});
    } else {
      this.surveyService.createSurvey(survey).subscribe(
        {next: response => {
        this.surveyId = response.id;
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Enquête créé avec succès' });
      },
      error: (err: any) => {
        console.error("Échec de la création de l'enquête :", err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: "Échec de la création de l'enquête" });
      }});
    }
  }
}