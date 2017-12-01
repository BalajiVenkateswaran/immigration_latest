import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I129LPage3Component } from './page-3.component';

describe('I129LPage3Component', () => {
  let component: I129LPage3Component;
  let fixture: ComponentFixture<I129LPage3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I129LPage3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I129LPage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
