import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../services/survey-service.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-survey-creation',
  imports: [
    ToastModule,
    ToolbarModule,
    StepsModule,
    ButtonModule,
    ReactiveFormsModule,
    TableModule,
    CommonModule,
    DropdownModule
  ],
  templateUrl: './survey-token.component.html',
  styleUrl: './survey-token.component.scss'
})
export class SurveyTokenComponent implements OnInit {
  token = null as unknown as string;

  constructor(
      private surveyService: SurveyService,
      private route: ActivatedRoute,
      private router: Router
    ) { }

 ngOnInit(): void {
     this.route.queryParams.pipe(
       filter(params => params['token'])
     )
     .subscribe(params => {
       // Read the query parameters
       this.token = params['token'];
   
        this.surveyService.getToken(this.token).subscribe(response => {
          this.router.navigate(['answer'], {queryParams: {
            'survey-id': response.survey.id,
            'recipient-id': response.recipient.id,
            'token': response.token
          }});
        });
      });
 }
}