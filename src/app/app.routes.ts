import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SurveyCreationComponent } from './components/survey-creation/survey-creation.component';
import { RecipientComponent } from './components/recipient/recipient.component';
import { SurveyComponent } from './components/survey/survey.component';
import { AnswerComponent } from './components/answer/answer.component';
import { RoleGuard } from './guards/role.guard';
import { SurveyTokenComponent } from './components/survey-token/survey-token.component';
import { SurveyDashboardComponent } from './components/survey-dashboard/survey-dashboard.component';


export const routes: Routes = [
  { path: 'dashboard/survey', canActivate: [RoleGuard], component: SurveyDashboardComponent },
  { path: 'dashboard', canActivate: [RoleGuard], component: HomeComponent },
  { path: 'surveys-edit', canActivate: [RoleGuard], component: SurveyCreationComponent },
  { path: 'survey', component: SurveyTokenComponent },
  { path: 'answer', component: AnswerComponent },
  { path: 'surveys', component: SurveyComponent },
  { path: 'recipients', canActivate: [RoleGuard], component: RecipientComponent },
  { path: '*', redirectTo: '/surveys', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RoleGuard]
})
export class AppRoutingModule { }
