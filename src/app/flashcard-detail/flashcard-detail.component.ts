import { Component, OnInit, Input } from '@angular/core';
import { Flashcard } from '../flashcard';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FlashcardService } from '../flashcard.service';

@Component({
  selector: 'app-flashcard-detail',
  templateUrl: './flashcard-detail.component.html',
  styleUrls: ['./flashcard-detail.component.css']
})
export class FlashcardDetailComponent implements OnInit {

  @Input() flashcard?: Flashcard;
  constructor(
    private route: ActivatedRoute,
    private heroService: FlashcardService,
    private location: Location
  ) { }
  
  ngOnInit(): void {
    this.getFlashcard();
  }
  getFlashcard(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getFlashcard(id)
      .subscribe(flashcard => this.flashcard = flashcard);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.flashcard) {
      this.heroService.updateFlashcard(this.flashcard)
        .subscribe(() => this.goBack());
    }
  }

}
