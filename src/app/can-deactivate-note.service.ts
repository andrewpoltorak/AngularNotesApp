import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NotesEditorComponent } from './notes-editor/notes-editor.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateNoteService implements CanDeactivate<NotesEditorComponent> {

  constructor() { }



  canDeactivate(notesEditorComponent: NotesEditorComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const note = notesEditorComponent.notesComponent.noteText.nativeElement.value;
    if (note && note.length > 0) {
      return window.confirm(`Вы уверены, что хотите перейти в другую секцию?`);
    } else {
      return true;
    }
  }
}

