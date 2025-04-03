import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SurveyComponent } from './components/survey/survey.component';
import { RecipientComponent } from './components/recipient/recipient.component';


export const routes: Routes = [
  { path: 'dashboard', component: HomeComponent },
  { path: 'surveys', component: SurveyComponent },
  { path: 'recipients', component: RecipientComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
