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
import { Survey } from '../../models/survey';
import { QuestionOption } from '../../models/question-option';
import { QuestionType } from '../../models/question-type';

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
  questions: Question[] = [];
  
  getQuestionDTOs(): Question[] {
    return this.questionComponents?.toArray().map(e => e.getQuestionDTO());
  }
  
  setQuestionDTOs(input: Question[]) {
    console.log('Nombre de questions : ' + input.length);
    this.questions = [];
    for (let i = 0; i < input.length; i++) {
      let questionSource: Question = input[i] as unknown as Question;
      console.log('Texte de question : ' + questionSource.text);
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
      console.log('Nouveau texte de question : ' + questionTarget.text);
      this.questions.push(questionTarget);
    }
  }
  
  addQuestion() {
    this.questions.push( {
      id: null as unknown as number,
      text: '',
      type: null as unknown as QuestionType,
      required: false,
      displayOrder: null as unknown as number,
      conditionalLogic: null as unknown as string,
      survey: null as unknown as Survey,
      options: [] as QuestionOption[],
    } as Question);
  }
  
  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }
}