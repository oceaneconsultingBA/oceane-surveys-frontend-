import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyEditorComponent } from './survey-editor.component';

describe('SurveyEditorComponent', () => {
  let component: SurveyEditorComponent;
  let fixture: ComponentFixture<SurveyEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
