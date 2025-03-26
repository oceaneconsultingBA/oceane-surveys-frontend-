import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // Importer ici
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule,MatIconModule,MatFormFieldModule,MatSidenavModule,MatToolbarModule,MatListModule, MatInputModule, MatButtonModule,     ReactiveFormsModule, // ✅ Ajout du module pour les Reactive Forms
    FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'oceane-surveys-frontend';
  constructor(private router: Router) {}
    
  navigateToCreateSurvey() {
    this.router.navigate(['survey/create']);
  }
  
}