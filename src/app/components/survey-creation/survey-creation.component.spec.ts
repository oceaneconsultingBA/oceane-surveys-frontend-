import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCreationComponent } from './survey-creation.component';
import { describe, beforeEach, it } from 'node:test';

describe('SurveyComponent', () => {
  let component: SurveyCreationComponent;
  let fixture: ComponentFixture<SurveyCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
