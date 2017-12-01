import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I129LPage2Component } from './page-2.component';

describe('I129LPage2Component', () => {
  let component: I129LPage2Component;
  let fixture: ComponentFixture<I129LPage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I129LPage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I129LPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
