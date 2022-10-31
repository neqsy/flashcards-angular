import { Component, OnInit } from '@angular/core';
import { Flashcard } from 'src/app/flashcard';
import { FlashcardService } from '../flashcard.service';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.css']
})
export class FlashcardsComponent implements OnInit {

  flashcards: Flashcard[] = [];
  
  constructor(private flashcardService: FlashcardService) { }

  ngOnInit(): void {
    this.getFlashcards();
  }
  

getFlashcards(): void {
  this.flashcardService.getFlashcards()
    .subscribe(flashcards => this.flashcards = flashcards);
}
add(name: string, translation: string): void {
  name = name.trim();
  translation = translation.trim();
  if (!name && !translation) { return; }
  this.flashcardService.addFlashcard({ name, translation } as Flashcard)
    .subscribe(flashcard => {
      this.flashcards.push(flashcard);
    });
}
delete(flashcard: Flashcard): void {
  this.flashcards = this.flashcards.filter(h => h !== flashcard);
  this.flashcardService.deleteFlashcard(flashcard.id).subscribe();
}
}
