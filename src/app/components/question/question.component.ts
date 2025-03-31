import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RatingModule,
    ListboxModule
  ]
})
export class QuestionComponent {
  questionText: string = "Votre question ici ?";
  questionType: string = "choix-unique";
  questionTypes = [
    { label: "Choix unique", value: "choix-unique" },
    { label: "Choix multiple", value: "choix-multiple" },
    { label: "Texte", value: "texte" },
    { label: "Notation (Étoiles)", value: "rating" }
  ];
  
  responseOptions: string[] = [];
  newOption: string = '';
  selectedResponses: any = {};
  textResponse: string = "";
  rating: number = 0;

  addOption() {
    if (this.newOption.trim()) {
      this.responseOptions.push(this.newOption.trim());
      this.newOption = '';
    }
  }

  removeOption(index: number) {
    this.responseOptions.splice(index, 1);
  }
}
