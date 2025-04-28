import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { ListboxModule } from 'primeng/listbox';
import { Question } from '../../models/question';
import { QuestionType } from '../../models/question-type';
import { Survey } from '../../models/survey';
import { QuestionOption } from '../../models/question-option';
import { Answer } from '../../models/answer';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RatingModule,
    ListboxModule
  ]
})
export class QuestionComponent implements OnInit {
  @Input() editable = true;
  @Input() order = 0;
  @Input() question: Question = {} as Question;
  questionText: string = "Votre question ici ?";
  questionType: string = "choix-unique";
  questionTypes = [
    { label: "Choix unique", value: "choix-unique" },
    { label: "Choix multiple", value: "choix-multiple" },
    { label: "Texte", value: "texte" },
    { label: "Notation (Étoiles)", value: "rating" }
  ];

  responseOptions: string[] = [];
  questionId = undefined as unknown as number;
  questionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      questionType: ['', Validators.required],
      questionText: ['', Validators.required],
      textResponse: [''],
      newOption: [''],
      rating: [0],
      selectedResponses: [[]]
    });
  }

  ngOnInit() {
    this.setQuestionDTO(this.question);
  }

  getQuestionDTO(): Question {
    let questionTypeEnum: QuestionType;
    switch (this.questionForm.controls['questionType'].value) {
      case 'choix-unique': {
        questionTypeEnum = QuestionType.SINGLE_CHOICE;
        break;
      }
      case 'choix-multiple': {
        questionTypeEnum = QuestionType.MULTIPLE_CHOICE;
        break;
      }
      case 'texte': {
        questionTypeEnum = QuestionType.TEXT;
        break;
      }
      case 'rating': {
        questionTypeEnum = QuestionType.RATING;
        break;
      }
      default: {
        questionTypeEnum = QuestionType.TEXT;
        break;
      }
    }
    let questionOptions: QuestionOption[] = this.responseOptions.map(e => ({
      id: undefined as unknown as number,
      text: e,
      displayOrder: 0,
      question: undefined as unknown as Question
    } as QuestionOption));
    return {
      id: this.questionId,
      text: this.questionForm.controls['questionText'].value,
      type: questionTypeEnum,
      required: false,
      displayOrder: 0,
      conditionalLogic: null as unknown as string,
      survey: null as unknown as Survey,
      options: questionOptions
    } as Question;
  }

  getAnswerDTO(): Answer {
    let questionTypeEnum: QuestionType;
    switch (this.questionForm.controls['questionType'].value) {
      case 'choix-unique': {
        questionTypeEnum = QuestionType.SINGLE_CHOICE;
        break;
      }
      case 'choix-multiple': {
        questionTypeEnum = QuestionType.MULTIPLE_CHOICE;
        break;
      }
      case 'texte': {
        questionTypeEnum = QuestionType.TEXT;
        break;
      }
      case 'rating': {
        questionTypeEnum = QuestionType.RATING;
        break;
      }
      default: {
        questionTypeEnum = QuestionType.TEXT;
        break;
      }
    }
    let questionOptions: QuestionOption[] = ((this.questionForm.controls['selectedResponses'].value) as string[]).map(e => ({
      id: undefined as unknown as number,
      text: e,
      displayOrder: 0,
      question: undefined as unknown as Question
    } as QuestionOption));
    return {
      id: undefined as unknown as number,
      recipientId: 1/* TODO Add recipient */ as unknown as number,
      question: this.getQuestionDTO(),
      text: this.questionForm.controls['textResponse'].value,
      rating: +this.questionForm.controls['rating'].value,
      options: questionOptions
    } as Answer;
  }

  setQuestionDTO(questionObject: Question) {
    switch (questionObject.type) {
      case QuestionType.SINGLE_CHOICE: {
        this.questionForm.controls['questionType'].setValue('choix-unique');
        break;
      }
      case QuestionType.MULTIPLE_CHOICE: {
        this.questionForm.controls['questionType'].setValue('choix-multiple');
        break;
      }
      case QuestionType.TEXT: {
        this.questionForm.controls['questionType'].setValue('texte');
        break;
      }
      case QuestionType.RATING: {
        this.questionForm.controls['questionType'].setValue('rating');
        break;
      }
      default: {
        this.questionForm.controls['questionType'].setValue('texte');
        break;
      }
    }

    this.questionId = questionObject.id;
    this.questionForm.controls['questionText'].setValue(questionObject.text);
    this.responseOptions = questionObject.options.map(e => e.text);
  }

  addOption() {
    if (this.questionForm.controls['newOption'].value.trim()) {
      this.responseOptions.push(this.questionForm.controls['newOption'].value.trim());
      this.questionForm.controls['newOption'].reset();
    }
  }

  removeOption(index: number) {
    this.responseOptions.splice(index, 1);
  }
}
