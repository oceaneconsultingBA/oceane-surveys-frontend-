import { Component, Inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { SurveyService } from '../../services/survey-service.service';
import { MessageService } from 'primeng/api';
import { Survey } from '../../models/survey';
import { Statistics } from '../../models/statistics';


@Component({
  selector: 'app-home',
  imports: [CardModule, TableModule, ButtonModule, ChartModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  surveys = [
    { name: "Satisfaction consultant - ABC Corp", date: new Date(2025, 2, 14), status: "active", statusLabel: "Active", responses: "18/24" },
    { name: "Évaluation mission XYZ Tech", date: new Date(2025, 2, 1), status: "paused", statusLabel: "En pause", responses: "12/15" },
    { name: "Onboarding nouveaux consultants", date: new Date(2025, 1, 15), status: "completed", statusLabel: "Complétée", responses: "8/8" }
  ];

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
      next: (data: any) => {
        console.log('Statistiques récupérées avec succès :', data);
        this.statistics = data; // Met à jour la liste des statistiques
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des statistiques :', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des statistiques' });
      }
    });

  }
}

