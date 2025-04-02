import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyComponent } from './survey.component';
import { describe, beforeEach, it } from 'node:test';

describe('SurveyComponent', () => {
  let component: SurveyComponent;
  let fixture: ComponentFixture<SurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
