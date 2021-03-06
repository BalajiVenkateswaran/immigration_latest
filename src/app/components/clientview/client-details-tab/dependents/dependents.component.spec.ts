/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DependentsComponent } from './dependents.component';

describe('DependentsComponent', () => {
  let component: DependentsComponent;
  let fixture: ComponentFixture<DependentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
