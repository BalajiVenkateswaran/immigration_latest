/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VisasComponent } from './visas.component';

describe('VisasComponent', () => {
  let component: VisasComponent;
  let fixture: ComponentFixture<VisasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
