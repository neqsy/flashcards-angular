import { Component, OnInit } from '@angular/core';
import { Flashcard } from '../flashcard';
import { FlashcardService } from '../flashcard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  flashcards: Flashcard[] = [];

  constructor(private flashcardService: FlashcardService) { }

  ngOnInit(): void {
    this.getFlashcards();
  }

  getFlashcards(): void {
    this.flashcardService.getFlashcards()
      .subscribe(flashcards => this.flashcards = flashcards.slice(1, 5));
  }
}