import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTokenComponent } from './survey-token.component';
import { describe, beforeEach, it } from 'node:test';

describe('SurveyTokenComponent', () => {
  let component: SurveyTokenComponent;
  let fixture: ComponentFixture<SurveyTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyTokenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
