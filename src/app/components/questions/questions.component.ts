import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { QuestionComponent } from "../question/question.component";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { RatingModule } from 'primeng/rating';
import { Question } from '../../models/question';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RatingModule,
    ListboxModule,
    QuestionComponent
  ]
})
export class QuestionsComponent {
  @Input() editable = true;
  @ViewChildren('questionComponent') questionComponents!:QueryList<QuestionComponent>;
  questionIndices: number[] = [0];
  questions: Question[] = [];
  
  getQuestionDTOs(): Question[] {
    return this.questionComponents?.toArray().map(e => e.getQuestionDTO());
  }
  
  setQuestionDTOs(input: Question[]) {
    this.questionIndices = [];
    this.questions = [];
    for (let i = 0; i < input.length; i++) {
      this.questionIndices.push(i);
    }
    console.log('Nombre de questions : ' + input.length);
    for (let i = 0; i < input.length; i++) {
      let questionSource: Question = input[i] as unknown as Question;
      let questionTarget: Question = {
        id: questionSource.id,
        text: questionSource.text,
        type: questionSource.type,
        required: questionSource.required,
        displayOrder: questionSource.displayOrder,
        conditionalLogic: questionSource.conditionalLogic,
        survey: questionSource.survey,
        options: questionSource.options,
      } as Question;
      this.questions.push(questionTarget);
    }
    return this.questionComponents?.toArray().map(e => e.getQuestionDTO());
  }
  
  addQuestion() {
    let maxId = this.questionIndices.length > 0 ? this.questionIndices.reduce((a, b)=>Math.max(a, b)) : 0;
    this.questionIndices.push(maxId + 1);
  }
  
  removeQuestion(index: number) {
    this.questionIndices.splice(index, 1);
  }
}