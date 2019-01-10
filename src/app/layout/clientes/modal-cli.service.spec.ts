import { TestBed } from '@angular/core/testing';

import { ModalCliService } from './modal-cli.service';

describe('ModalCliService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalCliService = TestBed.get(ModalCliService);
    expect(service).toBeTruthy();
  });
});
