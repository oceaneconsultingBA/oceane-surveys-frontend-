import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChartModule } from 'primeng/chart';
import { SurveyService } from '../../services/survey-service.service';
import { MessageService } from 'primeng/api';
import { Statistics } from '../../models/statistics';
import { Survey } from '../../models/survey';
import { SurveyStatus } from '../../models/survey-status';
import { CommonModule } from '@angular/common';
import { AnswerService } from '../../services/answer-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
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
       MatProgressSpinnerModule
       ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  surveys = null as unknown as { id: number; name: string; description: string | undefined; date: Date; status: SurveyStatus; }[];

  chartData: any;
  chartDelayData: any;

  statistics = null as unknown as Statistics;
  graphes = [{key: 'bar', name: 'Histogramme'}, {key: 'pie', name: 'Camembert'}];
  selectedGraph = this.graphes[0];
  periodicities = [{key: 'day', name: 'Jour'}, {key: 'month', name: 'Mois'}, {key: 'year', name: 'Année'}];
  selectedPeriodicity = this.periodicities[0];

  constructor(
    private messageService: MessageService,
    private surveyService: SurveyService,
    private router: Router,
    private answerService: AnswerService
  ) {
  }

  ngOnInit() {
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

    this.updateAnswerStats();

    this.surveyService.getSurveys().subscribe({
      next: (data: Survey[]) => {
        console.log('Statistiques récupérées avec succès :', data);
        this.surveys = data.map(e => ({
          id: e.id,
          name: e.title,
          description: e.description,
          date: e.creationDate,
          status: e.status
        })); // Met à jour la liste des statistiques
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des statistiques :', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des statistiques' });
      }
    });
  }

  public updateAnswerStats() {
    this.answerService.getAnswersByDate(this.selectedPeriodicity?.key as 'day' | 'month' | 'year').subscribe({
      next: (data: {}) => {
        console.log('Statistiques récupérées avec succès :', data);
        let dateData = [] as string[];
        let countData = [] as number[];

        for (const key in data) {
          dateData.push(key as unknown as string);
          countData.push(data[key as keyof typeof data] as number);
        }

        this.chartData = {
          labels: dateData,
          datasets: [
            {
              label: 'Taux de participation',
              data: countData,
          backgroundColor: this.getRandomColors(dateData.length)
        }
          ]
        };
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des statistiques :', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des statistiques' });
      }
    });

    this.answerService.getAnswersByDelay(this.selectedPeriodicity?.key as 'day' | 'month' | 'year').subscribe({
      next: (data: {}) => {
        console.log('Statistiques récupérées avec succès :', data);
        let dateData = [] as string[];
        let countData = [] as number[];

        for (const key in data) {
          dateData.push(key as unknown as string);
          countData.push(data[key as keyof typeof data] as number);
        }

        this.chartDelayData = {
          labels: dateData,
          datasets: [
            {
              label: 'Nombre de réponses',
              data: countData,
          backgroundColor: this.getRandomColors(dateData.length)
        }
          ]
        };
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des statistiques :', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des statistiques' });
      }
    });
  }

  getRandomColors(num: number): string[] {
    const colors = [];
    for (let i = 0; i < num; i++) {
      colors.push(
        `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
      );
    }
    return colors;
  }
  
  access(surveyId: number) {
    this.router.navigate(['dashboard', surveyId]);
  }
}

