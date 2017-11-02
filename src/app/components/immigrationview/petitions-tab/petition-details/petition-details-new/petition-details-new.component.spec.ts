/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitionDetailsNewComponent } from './petition-details-new.component';

describe('ImmigrationviewPetitionDetailsNewComponent', () => {
  let component: PetitionDetailsNewComponent;
  let fixture: ComponentFixture<PetitionDetailsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetitionDetailsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetitionDetailsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
