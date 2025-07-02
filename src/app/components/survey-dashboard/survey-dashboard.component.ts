import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChartModule } from 'primeng/chart';
import { SurveyService } from '../../services/survey-service.service';
import { MessageService } from 'primeng/api';
import { Survey } from '../../models/survey';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipientService } from '../../services/recipient-service.service';
import { Recipient } from '../../models/recipient';
import { TooltipModule } from 'primeng/tooltip';
import { filter } from 'rxjs/operators';

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
       RadioButtonModule
       ],
  templateUrl: './survey-dashboard.component.html',
  styleUrl: './survey-dashboard.component.scss'
})
export class SurveyDashboardComponent implements OnInit {
  surveyId = null as unknown as number;
  surveyName = null as unknown as string;
  recipients = null as unknown as { name: string; mail: string | undefined; date: Date; status: string; }[];

  constructor(
    private messageService: MessageService,
    private surveyService: SurveyService,
    private recipientService: RecipientService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.pipe(
      filter(params => params['surveyId'])
    )
    .subscribe(params => {
      // Read the query parameters
      this.surveyId = params['surveyId'];
  
      this.surveyService.getSurvey(this.surveyId).subscribe(response => {
        console.log('Chargement de ' + response.title);
        this.surveyName = response.title;
      });

      this.surveyService.getSurveyAnswerState(this.surveyId).subscribe({
        next: (data: {}) => {
          console.log('Données récupérées avec succès :', data);
          this.recipients = [];
          let result = Object.entries(data);
          let recipientsToDisplay = [] as { name: string; mail: string | undefined; date: Date; status: string; }[];
          this.addRecipient(result, recipientsToDisplay, 0);
        },
        error: (err: any) => {
          console.error('Erreur lors du chargement des données :', err);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des données' });
        }
      });

      this.surveyService.getSurveys().subscribe({
        next: (data: Survey[]) => {
          console.log('Statistiques récupérées avec succès :', data);
        },
        error: (err: any) => {
          console.error('Erreur lors du chargement des statistiques :', err);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des statistiques' });
        }
      });
    });
  }

  private addRecipient(
    result: [string, unknown][],
    recipientsToDisplay: { name: string; mail: string | undefined; date: Date; status: string; }[],
  index: number
) {
    if (index > result.length - 1) {
      this.recipients = recipientsToDisplay;
      return;
    }

    this.recipientService.getRecipient(Number(result[index][0])).subscribe({
      next: (recipientData: Recipient) => {
        console.log('Données destinataire récupérées avec succès :', recipientData);
        recipientsToDisplay.push({
          name: recipientData.firstName + ' ' + recipientData.lastName as string,
          mail: recipientData.email as string,
          date: result[index][1] as Date,
          status: (result[index][1] == null) ? 'PENDING' : 'COMPLETED' as string
        }); // Met à jour la liste des statistiques
        this.addRecipient(result, recipientsToDisplay, index + 1);
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des données :', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des données' });
      }
    });
  }
}

