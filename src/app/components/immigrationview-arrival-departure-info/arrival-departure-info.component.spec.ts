/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImmigrationViewArrivalDepartureInfoComponent } from './arrival-departure-info.component';

describe('ImmigrationViewArrivalDepartureInfoComponent', () => {
  let component: ImmigrationViewArrivalDepartureInfoComponent;
  let fixture: ComponentFixture<ImmigrationViewArrivalDepartureInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmigrationViewArrivalDepartureInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmigrationViewArrivalDepartureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
