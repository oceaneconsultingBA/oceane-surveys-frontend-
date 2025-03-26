import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientComponent } from './recipient.component';
import { describe, beforeEach, it } from 'node:test';

describe('RecipientComponent', () => {
  let component: RecipientComponent;
  let fixture: ComponentFixture<RecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
