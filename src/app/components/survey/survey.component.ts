import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { QuestionComponent } from '../question/question.component';
import { RecipientComponent } from "../recipient/recipient.component"; 

@Component({
  selector: 'app-survey',
  imports: [StepsModule, ButtonModule, ReactiveFormsModule, TableModule, CommonModule,
     QuestionComponent, RecipientComponent, DropdownModule],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss'
})
export class SurveyComponent {
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

  constructor(private fb: FormBuilder) {
    this.surveyForm = this.fb.group({
      surveyName: ['', Validators.required]
    });
  }

  nextStep() {
    if (this.activeStep < this.steps.length - 1) {
      this.activeStep++;
    }
  }

  prevStep() {
    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }

  removeQuestion(question: any) {
    this.questions = this.questions.filter(q => q !== question);
  }
}
