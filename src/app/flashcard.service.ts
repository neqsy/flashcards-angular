import { Injectable } from '@angular/core';
import { Flashcard } from './flashcard';
//import { FLASHCARDS } from './mock-flashcards';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private flashcardsUrl = 'api/flashcards';  // URL to web api
  constructor(private http: HttpClient,
    private messageService: MessageService) { }
  /** GET heroes from the server */
getFlashcards(): Observable<Flashcard[]> {
  return this.http.get<Flashcard[]>(this.flashcardsUrl)
  .pipe(
    tap(_ => this.log('fetched flashcards')),
    catchError(this.handleError<Flashcard[]>('getFlashcards', []))
  );
}
  getFlashcard(id: number): Observable<Flashcard> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const url = `${this.flashcardsUrl}/${id}`;
    return this.http.get<Flashcard>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Flashcard>(`getFlashcard id=${id}`))
    );
    
  }
  private log(message: string) {
    this.messageService.add(`FlashcardService: ${message}`);
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
/** PUT: update the hero on the server */
updateFlashcard(flashcard: Flashcard): Observable<any> {
  return this.http.put(this.flashcardsUrl, flashcard, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${flashcard.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}
/** POST: add a new flashcard to the server */
addFlashcard(flashcard: Flashcard): Observable<Flashcard> {
  return this.http.post<Flashcard>(this.flashcardsUrl, flashcard, this.httpOptions).pipe(
    tap((newFlashcard: Flashcard) => this.log(`added flashcard w/ id=${newFlashcard.id}`)),
    catchError(this.handleError<Flashcard>('addFlashcard'))
  );
}
/** DELETE: delete the hero from the server */
deleteFlashcard(id: number): Observable<Flashcard> {
  const url = `${this.flashcardsUrl}/${id}`;

  return this.http.delete<Flashcard>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted flashcard id=${id}`)),
    catchError(this.handleError<Flashcard>('deleteFlashcard'))
  );
}
/* GET heroes whose name contains search term */
searchFlashcards(term: string): Observable<Flashcard[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Flashcard[]>(`${this.flashcardsUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found flashcards matching "${term}"`) :
       this.log(`no flashcards matching "${term}"`)),
    catchError(this.handleError<Flashcard[]>('searchFlashcards', []))
  );
}
getFlashcardNo404<Data>(id: number): Observable<Flashcard> {
  const url = `${this.flashcardsUrl}/?id=${id}`;
  return this.http.get<Flashcard[]>(url)
    .pipe(
      map(flashcards => flashcards[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} flashcard id=${id}`);
      }),
      catchError(this.handleError<Flashcard>(`getFlashcard id=${id}`))
    );
}
httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
}
