/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImmigrationViewAddressinfoComponent } from './addressinfo.component';

describe('ImmigrationViewAddressinfoComponent', () => {
  let component: ImmigrationViewAddressinfoComponent;
  let fixture: ComponentFixture<ImmigrationViewAddressinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmigrationViewAddressinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmigrationViewAddressinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
