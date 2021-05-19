import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NotesService } from '../notes.service';

export interface Note {
  _id?: string;
  text: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnChanges {

  private notesUrl = 'notes';

  notes: Note[] = [
    { text: 'Note one' },
    { text: 'Note two' }
  ];

  text!: string;

  @Input()
  section!: string;

  @ViewChild('noteText')
  noteText!: ElementRef<HTMLTextAreaElement>;

  constructor(private http: HttpClient, private notesService: NotesService) {

  }

  readNotes() {
    this.notesService.getNotes(this.section)
      .subscribe(notes => this.notes = notes);
  }

  ngOnChanges(): void {
    this.readNotes();
  }

  addNote(note: Note) {
    this.http.post(this.notesUrl, note).toPromise()
      .then(response => {
        this.readNotes();
      });
  }

  add(noteText: HTMLTextAreaElement) {
    const note = {
      text: noteText.value,
      section: this.section,
    };
    noteText.value = '';
    this.addNote(note);
  }

  remove(id?: string) {
    if (id === undefined)
      return;
    this.http.delete<{ ok: boolean }>(this.notesUrl, { params: { id } }).toPromise().then(response => {
      if (response.ok) {
        console.log(`note with id ${id} removed, response`, response);
        this.readNotes();
      } else {
        console.error(`server-side error when removing note with id ${id}`);
      }
    })
      .catch(err =>
        console.error(err)
      );
  }
}
