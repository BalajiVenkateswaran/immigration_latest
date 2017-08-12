/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImmigrationviewDocumentExpirationsComponent } from './document-expirations.component';

describe('ImmigrationviewDocumentExpirationsComponent', () => {
  let component: ImmigrationviewDocumentExpirationsComponent;
  let fixture: ComponentFixture<ImmigrationviewDocumentExpirationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmigrationviewDocumentExpirationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmigrationviewDocumentExpirationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
