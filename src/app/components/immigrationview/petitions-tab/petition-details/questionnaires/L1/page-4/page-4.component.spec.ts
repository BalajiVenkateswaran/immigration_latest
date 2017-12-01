import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I129LPage4Component } from './page-4.component';

describe('I129LPage4Component', () => {
  let component: I129LPage4Component;
  let fixture: ComponentFixture<I129LPage4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I129LPage4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I129LPage4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
