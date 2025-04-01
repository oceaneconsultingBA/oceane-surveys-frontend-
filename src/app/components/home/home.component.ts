import { Component, Inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { SurveyService } from '../../services/survey-service.service';
import { MessageService } from 'primeng/api';
import { Survey } from '../../models/survey';


@Component({
  selector: 'app-home',
  imports: [CardModule, TableModule, ButtonModule, ChartModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  surveyService = Inject(SurveyService);
   private messageService = Inject(MessageService);
  surveys = [
    { name: "Satisfaction consultant - ABC Corp", date: new Date(2025, 2, 14), status: "active", statusLabel: "Active", responses: "18/24" },
    { name: "Évaluation mission XYZ Tech", date: new Date(2025, 2, 1), status: "paused", statusLabel: "En pause", responses: "12/15" },
    { name: "Onboarding nouveaux consultants", date: new Date(2025, 1, 15), status: "completed", statusLabel: "Complétée", responses: "8/8" }
  ];

  chartData: any;

  ngOnInit() {
    this.chartData = {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
      datasets: [
        { label: 'Taux de participation', backgroundColor: '#3f51b5', data: [5, 10, 15, 20, 25, 18] }
      ]
    };

    this.surveyService.getSurveys().subscribe(
      (data: Survey[]) => {
        this.surveys = data.values;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des enquetes :', error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la récupération des enquetes' });
      }
    );

  }
}

