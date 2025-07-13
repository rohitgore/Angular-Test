import { TestBed } from '@angular/core/testing';

import { HttpCalls } from './http-calls';

describe('HttpCalls', () => {
  let service: HttpCalls;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCalls);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
