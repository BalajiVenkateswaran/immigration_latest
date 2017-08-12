import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageaccountChecklistComponent } from './checklist.component';

describe('ManageaccountChecklistComponent', () => {
  let component: ManageaccountChecklistComponent;
  let fixture: ComponentFixture<ManageaccountChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageaccountChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageaccountChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
