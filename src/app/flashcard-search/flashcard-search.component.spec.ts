import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardSearchComponent } from './flashcard-search.component';

describe('FlashcardSearchComponent', () => {
  let component: FlashcardSearchComponent;
  let fixture: ComponentFixture<FlashcardSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
