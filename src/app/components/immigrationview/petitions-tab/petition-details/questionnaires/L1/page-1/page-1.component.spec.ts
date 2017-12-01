import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I129LPage1Component } from './page-1.component';

describe('I129LPage1Component', () => {
  let component: I129LPage1Component;
  let fixture: ComponentFixture<I129LPage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I129LPage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I129LPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
