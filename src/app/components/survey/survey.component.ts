import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { QuestionComponent } from '../question/question.component'; 

@Component({
  selector: 'app-survey',
  imports: [StepsModule, ButtonModule, ReactiveFormsModule, TableModule, CommonModule, QuestionComponent],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss'
})
export class SurveyComponent {
  activeStep = 0;
  surveyForm: FormGroup;
  questions: any[] = [];

  steps = [
    { label: 'Informations' },
    { label: 'Questions' },
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
