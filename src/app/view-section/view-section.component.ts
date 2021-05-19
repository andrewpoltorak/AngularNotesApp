import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NotesService } from '../notes.service';
import { Note } from '../notes/notes.component';

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.css']
})
export class ViewSectionComponent implements OnInit {

  section!: string;

  notes$!: Observable<Note[]>; 

  constructor(private route: ActivatedRoute, private notesService: NotesService) { }

  async ngOnInit() {
    this.section = this.route.snapshot.params['name'];
    this.notes$ = this.getNotes();
  }

  getNotes() {
    return this.notesService.getNotes(this.section);
  }
}
