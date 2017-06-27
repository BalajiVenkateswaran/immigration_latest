/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImmigrationViewI797HistoryComponent } from './i-797-history.component';

describe('ImmigrationViewI797HistoryComponent', () => {
  let component: ImmigrationViewI797HistoryComponent;
  let fixture: ComponentFixture<ImmigrationViewI797HistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmigrationViewI797HistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmigrationViewI797HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
