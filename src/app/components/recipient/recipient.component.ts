import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Dialog } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { RecipientService } from '../../services/recipient-service.service';
import { MessageService } from 'primeng/api';
import { Recipient } from '../../models/recipient';
import { Column } from '../../models/Column';
import { ExportColumn } from '../../models/ExportColumn';
import { RecipientType } from '../../models/recipient-type';
import { FileUploadModule } from 'primeng/fileupload';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-recipient',
  imports: [
    TableModule,
    CardModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule,
    Dialog,
    SelectModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    TextareaModule,
    CommonModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    FileUploadModule 
  ],
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss']
})
export class RecipientComponent implements OnInit {
  recepients!: Recipient[];
  recepientDialog: boolean = false;
  recepient!: Recipient;
  selectedRecs!: Recipient[] | null;
  submitted: boolean = false;
  statuses!: any[];
  modalMode!: String;
  cols!: Column[];
  exportColumns!: ExportColumn[];

  recipientForm: FormGroup;
  recipientTypes = Object.keys(RecipientType).map(key => ({
    label: RecipientType[key as keyof typeof RecipientType], // Valeur affichée
    value: key // Clé de l'énum (ce qui sera sauvegardé)
  }));

  @ViewChild('dt') dt!: Table;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private recipientService: RecipientService
  ) {
    this.recipientForm = this.fb.group({
      id: [null],
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      company: [''],
      type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getRecepients();

    this.cols = [
      { field: 'firstName', header: 'Nom', customExportHeader: 'Product Code' },
      { field: 'lastName', header: 'Prénom' },
      { field: 'email', header: 'Email' },
      { field: 'company', header: 'Entreprise' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  private getRecepients() {
    this.recipientService.getRecipients().subscribe({
      next: (data: any) => {
        console.log('Destinataires récupérées avec succès :', data);
        this.recepients = data; // Met à jour la liste des destinataire
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des destinataires :', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec du chargement des destinataires' });
      }
    });
  }

  // Pour la soumission du formulaire
  onSubmit() {
    if (this.recipientForm.valid) {
      const recipient: Recipient = this.recipientForm.value;
      if (this.modalMode === "CREATE") {
        this.createRecipient(recipient);
      } else {
        this.editeRecipient(recipient);
      }
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Veuillez remplir tous les champs obligatoires' });
    }
  }

  // Créer un nouveau recipient
  private createRecipient(recipient: Recipient) {
    this.recipientService.createRecipient(recipient).subscribe({
      next: (newRecipient: any) => {
        console.log('Recipient créé avec succès :', newRecipient);
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Recipient créé avec succès' });
        this.recepients.push(newRecipient);
        this.recipientForm.reset(); // Réinitialiser le formulaire après la création
        this.recepientDialog = false;
      },
      error: (err: any) => {
        console.error('Erreur lors de la création du recipient :', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la création du recipient' });
      }
    });
  }

  // Modifier un recipient existant
  private editeRecipient(recipient: Recipient) {
    this.recipientService.updateRecipient(recipient.id, recipient).subscribe({
      next: (newRecipient: any) => {
        console.log('Recipient mis à jour avec succès :', newRecipient);
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Recipient mis à jour avec succès' });
        const index = this.recepients.findIndex(recipient => recipient.id === newRecipient.id);
  
        if (index !== -1) {
          // Si l'élément est trouvé, on le met à jour
          this.recepients[index] = { ...this.recepients[index], ...newRecipient };
        } else {
          // Sinon, on ajoute le nouvel élément
          this.recepients.push(newRecipient);
        }
        this.recepientDialog = false;
        this.recipientForm.reset(); // Réinitialiser le formulaire après la mise à jour
      },
      error: (err: any) => {
        console.error('Erreur lors de la mise à jour du recipient :', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la mise à jour du recipient' });
      }
    });
  }

  // Ouvrir la fenêtre de création
  openNew() {
    this.recepientDialog = true;
    this.submitted = false;
    this.modalMode = "CREATE";
    this.recipientForm.reset();
  }

  // Ouvrir la fenêtre d'édition
  editRecepient(recipient: Recipient) {
    this.modalMode = "EDIT";
    this.recipientForm.patchValue({
      id: recipient.id,
      email: recipient.email,
      firstName: recipient.firstName || '',
      lastName: recipient.lastName || '',
      company: recipient.company || '',
      type: recipient.type
    });
    this.recepientDialog = true;
  }

  // Supprimer un recipient
  deleteRecepient(recipient: Recipient) {
    this.recipientService.deleteRecipient(recipient.id).subscribe({
      next: (newRecipient: any) => {
        console.log('Recipient supprimé avec succès :', newRecipient);
        this.recepients = this.recepients.filter(r => r.id !== recipient.id);
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Recipient supprimé avec succès' });
        this.recipientForm.reset(); // Réinitialiser le formulaire après la suppression
      },
      error: (err: any) => {
        console.error('Erreur lors de la suppression du recipient :', err);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la suppression du recipient' });
      }
    });
  }

  // Exporter les destinataires en CSV
  exportCSV() {
    this.dt?.exportCSV();
  }

  nextId = 1;
  expectedColumns = ["firstName", "lastName", "email", "company", "type"];

  onFileSelect(event: any) {
    const file = event.files[0]; // Récupérer le fichier sélectionné
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0]; // Première feuille du fichier
        const worksheet = workbook.Sheets[sheetName];

        // Convertir en JSON brut
        const rawData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });

        // Vérification des colonnes
        const fileColumns = rawData.length > 0 ? Object.keys(rawData[0]) : [];
        if (!this.validateColumns(fileColumns)) {
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Erreur', 
                detail: "Les colonnes du fichier ne correspondent pas à l'ordre attendu : " + this.expectedColumns.join(", ") 
            });
            return;
        }

        // Initialisation de la liste des destinataires à sauvegarder
        const newRecipients = rawData.map(row => ({
            id:row["id"] || undefined,
            email: row["email"] || "", 
            firstName: row["firstName"] || undefined, 
            lastName: row["lastName"] || undefined, 
            company: row["company"] || undefined,
            type: row["type"]||undefined
        }));

        let savedRecipients: Recipient[] = [];

        // Sauvegarde des destinataires en base et mise à jour de la liste locale
        for (const recipient of newRecipients) {
            try {
                const savedRecipient = await this.recipientService.createRecipient(recipient).toPromise();
                
                // Vérifier que l'élément a bien été sauvegardé
                if (savedRecipient) {
                    savedRecipients.push(savedRecipient);
                }
            } catch (error) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: `Échec de l'ajout du destinataire : ${recipient.email}`
                });
                console.error(`Erreur lors de l'ajout de ${recipient.email} :`, error);
            }
        }

        // Mettre à jour la liste locale avec uniquement les éléments bien enregistrés
        if (savedRecipients.length > 0) {
            this.recepients = [...this.recepients, ...savedRecipients];

            this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: `${savedRecipients.length} destinataire(s) ajouté(s) avec succès.`
            });
        }
    };

    reader.readAsArrayBuffer(file);
}


  // Vérification des colonnes du fichier
  private validateColumns(fileColumns: string[]): boolean {
    return JSON.stringify(fileColumns) === JSON.stringify(this.expectedColumns);
  }

  // Fonction pour mapper les valeurs Excel au bon type RecipientType
  private mapRecipientType(value: string): RecipientType {
    const typeMap: { [key: string]: RecipientType } = {
      "Consultant": RecipientType.CONSULTANT,
      "Freelance": RecipientType.FREELANCE,
      "Client": RecipientType.CLIENT,
      "Autre": RecipientType.AUTRE
    };
    return typeMap[value] || RecipientType.CLIENT; // Valeur par défaut
  }

  globalSearch(event: Event):void{
    const target = (event.target as HTMLInputElement);
    this.dt.filterGlobal(target.value, 'contains');
  }
}
