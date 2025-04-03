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
import { RecipientService } from '../../services/recipient-service.service';

@Component({
  selector: 'app-survey-creation',
  imports: [StepsModule, ButtonModule, ReactiveFormsModule, TableModule, CommonModule,
    RecipientComponent, DropdownModule, QuestionsComponent],
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
    private recipientService: RecipientService
  ) {
    this.surveyForm = this.fb.group({
      surveyName: ['', Validators.required],
      description: [null, Validators.required],
      enqueteType: [null, Validators.required],
      frequencies: ['', Validators.required]
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
  let survey: Survey = {
    id: undefined as unknown as number,
    title: this.surveyForm.controls['surveyName'].value,
    description: this.surveyForm.controls['description'].value,
    creationDate: new Date(),
    lastModifiedDate: new Date(),
    status: SurveyStatus.DRAFT,
    questions: this.questionsComponent.getQuestionDTOs() as Question[]
  }
  this.surveyService.createSurvey(survey).subscribe(response => {
    let surveyId = response.id;
    this.addRecipient(surveyId, 0);
  });
  }

  private addRecipient(surveyId: number, index: number) {
    this.recipientService.addRecipientToSurvey(this.recipientsComponent.getSelectedRecipients()[index], surveyId).subscribe(response => {
      if (index < this.recipientsComponent.getSelectedRecipients().length - 1) {
        this.addRecipient(surveyId, index + 1);
      }
    });
  }
}