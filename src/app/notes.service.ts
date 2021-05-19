import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from './notes/notes.component';

@Injectable({
  providedIn: 'root'
})

export class NotesService {

  private notesUrl = 'notes';

  constructor(private http: HttpClient) { }

  getNotes(section: string): Observable<Note[]> {
    if (section == null) return of([] as Note[]);
    return this.http.get<Note[]>(
      this.notesUrl, { params: { section } });
  }
}
