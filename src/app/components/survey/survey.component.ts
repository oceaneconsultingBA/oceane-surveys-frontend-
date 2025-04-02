import { Component, OnInit, ViewChild } from '@angular/core';
import { Survey } from '../../models/survey';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Recipient } from '../../models/recipient';
import { RecipientType } from '../../models/recipient-type';
import { RecipientService } from '../../services/recipient-service.service';
import { SurveyStatus } from '../../models/survey-status';
import { Question } from '../../models/question';
import { SurveyService } from '../../services/survey-service.service';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-survey',
  imports: [
    TableModule,
    ButtonModule,
    SelectModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    TextareaModule,
    CommonModule,
        IconFieldModule,
        InputIconModule
  ],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss'
})
export class SurveyComponent implements OnInit {
  enquetes!: Survey[];
  enquete!: Survey;
  submitted: boolean = false;
  statuses!: any[];
  modalMode!: String;
  SurveyStatus = SurveyStatus;
  
  @ViewChild('dt') dt!: Table;

  constructor(
    private messageService: MessageService,
    private surveyService: SurveyService
  ) {

  }

  ngOnInit(): void {
    const questions: Question[] = []; 
    this.getSurveys();
  }

  private getSurveys() {
    this.surveyService.getSurveys().subscribe({
      next: (data: any) => {
        console.log('Enquêtes récupérées avec succès :', data);
        this.enquetes = data; // Met à jour la liste des enquêtes
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des enquêtes :', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des enquêtes' });
      }
    });
  }
  


  // Modifier un recipient existant
  editeEnquete(enquete: Survey) {

  }

  // Ouvrir la fenêtre de création
  openNew() {
    //this.recepientDialog = true;
    this.submitted = false;
    this.modalMode = "CREATE";
    //this.recipientForm.reset();
  }



  // Supprimer un recipient
  deleteEnquete(enquete: Survey) {
    this.surveyService.deleteSurvey(enquete.id).subscribe({
      next: (data: any) => {
        console.log('Enquete supprimé avec succès :', data);
        this.enquetes = this.enquetes.filter(r => r.id !== enquete.id);
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Enquete supprimé avec succès' });
      },
      error: (err: any) => {
        console.error('Erreur lors de la suppression  :', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la suppression' });
      }
    });
  }


  globalSearch(event: Event):void{
    const target = (event.target as HTMLInputElement);
    this.dt.filterGlobal(target.value, 'contains');
  }

}