import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerDashboardComponent } from './answer-dashboard.component';

describe('AnswerDashboardComponent', () => {
  let component: AnswerDashboardComponent;
  let fixture: ComponentFixture<AnswerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
