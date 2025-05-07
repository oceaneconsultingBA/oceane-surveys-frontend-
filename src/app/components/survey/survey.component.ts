import { Component, OnInit, ViewChild } from '@angular/core';
import { Survey } from '../../models/survey';
import { MessageService } from 'primeng/api';
import { SurveyStatus } from '../../models/survey-status';
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
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-survey',
  imports: [
    ToastModule,
    TableModule,
    ButtonModule,
    SelectModule,
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
    private surveyService: SurveyService,
    private router: Router,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.getSurveys();
  }

  isAdmin(): boolean {
    return sessionStorage.getItem('role') === 'admin';
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
    this.router.navigate(['/surveys-edit'], {queryParams: {'survey-id': enquete.id}});
  }

  // Modifier un recipient existant
  repondEnquete(enquete: Survey) {
    this.router.navigate(['/answer'], {queryParams: {'survey-id': enquete.id}});
  }

  // Ouvrir la fenêtre de création
  openNew() {
    //this.recepientDialog = true;
    this.submitted = false;
    this.modalMode = "CREATE";
    //this.recipientForm.reset();
    this.router.navigate(['/surveys-edit']);
  }

  // Supprimer une enquete
  deleteEnquete(enquete: Survey) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Confirmer la suppression d'une enquête",
        message: "Êtes-vous sûr de vouloir supprimer l'enquête: " + enquete.title + " ?",
        confirmation: true
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Enquête à supprimer : ' + enquete.id);
        this.surveyService.deleteSurvey(enquete.id).subscribe({
          next: () => {
            console.log('Enquête supprimée avec succès :' + enquete.id);
            this.enquetes = this.enquetes.filter(r => r.id !== enquete.id);
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Enquête supprimée avec succès' });
          },
          error: (err: any) => {
            console.error('Erreur lors de la suppression :', err);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la suppression' });
          }
        });
      }
    });
  }

  globalSearch(event: Event):void{
    const target = (event.target as HTMLInputElement);
    this.dt.filterGlobal(target.value, 'contains');
  }
}