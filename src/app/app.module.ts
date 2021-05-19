const appRoutes: Routes = [
  { path: '', component: NotesEditorComponent, canDeactivate: [CanDeactivateNoteService] },
  { path: 'viewSection/:name', component: ViewSectionComponent },
  { path: 'register', component: UserFormComponent },
  { path: ':name', component: NotesEditorComponent, canDeactivate: [CanDeactivateNoteService] },
  { path: '**', component: PageNotFoundComponent }
 ];

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { HttpClientModule } from '@angular/common/http';
import { SectionsComponent } from './sections/sections.component';
import { NotesEditorComponent } from './notes-editor/notes-editor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { ViewSectionComponent } from './view-section/view-section.component';
import { CanDeactivateNoteService } from './can-deactivate-note.service';
import { UserFormComponent } from './user-form/user-form.component';
import { EqualToValidatorDirective } from './directives/equal-to-validator.directive';
import { UserUniqueValidatorDirective } from './directives/user-unique-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    SectionsComponent,
    NotesEditorComponent,
    PageNotFoundComponent,
    ViewSectionComponent,
    UserFormComponent,
    EqualToValidatorDirective,
    UserUniqueValidatorDirective
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
