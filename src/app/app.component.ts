import { afterNextRender, Component, HostListener, ViewChild } from '@angular/core';
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
import { MatSidenav } from '@angular/material/sidenav';
import { StepsModule } from 'primeng/steps'; 
import { TableModule } from 'primeng/table'; 

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule,MatIconModule,MatFormFieldModule,MatSidenavModule,MatToolbarModule,MatListModule, MatInputModule, MatButtonModule,     ReactiveFormsModule, // ✅ Ajout du module pour les Reactive Forms
    FormsModule, StepsModule, TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  isMobile = false;
  admin = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  constructor() {
  afterNextRender(() => {
        this.isAdmin();
  });
}

  ngOnInit() {
    this.checkScreenSize();
  }

  toggleAdmin() {
    let role = sessionStorage.getItem('role');

    sessionStorage.setItem('role', role === 'admin' ? 'user' : 'admin');
  }

  isAdmin(): boolean {
      try {
      this.admin = sessionStorage.getItem('role') === 'admin';
      }
      catch (err) {
      }
    return this.admin;
  }


  checkScreenSize() {
    if (typeof window !== 'undefined') { // Vérifie si `window` existe
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile && this.sidenav) {
        this.sidenav.open();
      }
    }
  }
  
}