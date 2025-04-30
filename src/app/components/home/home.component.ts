import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { SurveyService } from '../../services/survey-service.service';
import { MessageService } from 'primeng/api';
import { Statistics } from '../../models/statistics';
import { Survey } from '../../models/survey';
import { SurveyStatus } from '../../models/survey-status';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    CardModule,
     TableModule,
      ButtonModule,
       ChartModule
       ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  surveys = null as unknown as { name: string; description: string | undefined; date: Date; status: SurveyStatus; statusLabel: SurveyStatus; }[];

  chartData: any;

  statistics = null as unknown as Statistics;

  constructor(
    private messageService: MessageService,
    private surveyService: SurveyService
  ) {
  }

  ngOnInit() {
    this.chartData = {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
      datasets: [
        { label: 'Taux de participation', backgroundColor: '#3f51b5', data: [5, 10, 15, 20, 25, 18] }
      ]
    };

    this.surveyService.getStatistics().subscribe({
      next: (data: Statistics) => {
        console.log('Statistiques récupérées avec succès :', data);
        this.statistics = data; // Met à jour la liste des statistiques
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des statistiques :', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des statistiques' });
      }
    });

    this.surveyService.getSurveys().subscribe({
      next: (data: Survey[]) => {
        console.log('Statistiques récupérées avec succès :', data);
        this.surveys = data.map(e => ({
          name: e.title,
          description: e.description,
          date: e.creationDate,
          status: e.status,
          statusLabel: e.status
        })); // Met à jour la liste des statistiques
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des statistiques :', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des statistiques' });
      }
    });
  }
}

