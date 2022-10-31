import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Flashcard } from './flashcard';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const flashcards = [
      { id: 12, name: 'Speed' },
  { id: 13, name: 'More' },
  { id: 14, name: 'Tomato' },
  { id: 15, name: 'Aluminium' },
  { id: 16, name: 'Computer' },
  { id: 17, name: 'Brother' },
  { id: 18, name: 'Sister' },
  { id: 19, name: 'Father' },
  { id: 20, name: 'Mother' }
    ];
    return {flashcards};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(flashcards: Flashcard[]): number {
    return flashcards.length > 0 ? Math.max(...flashcards.map(flashcard => flashcard.id)) + 1 : 11;
  }
}
