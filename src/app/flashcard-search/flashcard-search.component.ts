import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Flashcard } from '../flashcard';
import { FlashcardService } from '../flashcard.service';

@Component({
  selector: 'app-flashcard-search',
  templateUrl: './flashcard-search.component.html',
  styleUrls: ['./flashcard-search.component.css']
})
export class FlashcardSearchComponent implements OnInit {
  flashcards$!: Observable<Flashcard[]>;
  private searchTerms = new Subject<string>();

// Push a search term into the observable stream.

  constructor(private flashcardService: FlashcardService) { }
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    
    this.flashcards$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.flashcardService.searchFlashcards(term)),
    );
  }

}
