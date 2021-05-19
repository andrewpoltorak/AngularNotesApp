import { TestBed } from '@angular/core/testing';

import { CanDeactivateNoteService } from './can-deactivate-note.service';

describe('CanDeactivateNoteService', () => {
  let service: CanDeactivateNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanDeactivateNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
