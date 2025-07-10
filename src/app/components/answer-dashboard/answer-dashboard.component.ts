import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { AnswerComponent } from "../answer/answer.component";

@Component({
  selector: 'app-answer-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    TooltipModule,
    TableModule,
    ButtonModule,
    ChartModule,
    RadioButtonModule,
    AnswerComponent
],
  templateUrl: './answer-dashboard.component.html',
  styleUrl: './answer-dashboard.component.scss'
})
export class AnswerDashboardComponent {
}

