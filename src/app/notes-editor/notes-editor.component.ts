import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-notes-editor',
  templateUrl: './notes-editor.component.html',
  styleUrls: ['./notes-editor.component.css']
})
export class NotesEditorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.pipe(map(params => params['name'])).subscribe(section => this.section = section);
  }

  @ViewChild(NotesComponent)
  notesComponent!: NotesComponent;

  ngOnInit(): void {
  }

  section!: string;

  setSection(section: string) {
    //this.section = section;
    this.router.navigate([section]);
  }
}
