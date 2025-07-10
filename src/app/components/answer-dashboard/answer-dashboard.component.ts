import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { AnswerComponent } from "../answer/answer.component";
import { ActivatedRoute } from '@angular/router';

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
export class AnswerDashboardComponent implements OnInit {
  surveyId = null as unknown as number;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.surveyId = Number(this.route.snapshot.params['surveyId']);
  }
}

