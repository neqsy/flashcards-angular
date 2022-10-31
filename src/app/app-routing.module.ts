import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashcardsComponent } from './flashcards/flashcards.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlashcardDetailComponent } from './flashcard-detail/flashcard-detail.component';
const routes: Routes = [
  { path: 'flashcards', component: FlashcardsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: FlashcardDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }