import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Section {
  _id?: string;
  title: string;
}

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

  private sectionsUrl = 'sections';

  sectionsReplaceUrl = '/sections/replace';

  sections: Section[] = [];

  activeSection?: string;

  @Input()
  set section(section: string) {
    if (section && section.length > 0) {
      this.activeSection = section;
    }
  }

  @Output() sectionChanged: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(private http: HttpClient) {
    this.readSections();
  }

  ngOnInit(): void {
  }

  getSections(): Promise<Section[]> {
    return this.http.get<Section[]>(this.sectionsUrl)
      .toPromise();
  }

  async readSections() {
    this.sections = await this.getSections();
    if (!this.activeSection && this.sections.length > 0) {
      this.showSection(this.sections[0]);
    }
  }

  showSection(section: Section) {
    //this.activeSection = section.title;
    this.sectionChanged.emit(section.title);
  }

  addSection(newSection: HTMLInputElement) {
    const title = newSection.value;
    if (!title) { return; }

    if (this.sections.map(s => s.title).find(t => t === title)) { return; }
    const section: Section = { title };
    this.sections.unshift(section);
    this.showSection(section);

    this.writeSections().subscribe(res =>
      newSection.value = '');
  }

  writeSections() {
    return this.http.post(this.sectionsReplaceUrl, this.sections);
  }

}
