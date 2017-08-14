import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageaccountUserDetailsComponent } from './user-details.component';

describe('ManageaccountUserDetailsComponent', () => {
  let component: ManageaccountUserDetailsComponent;
  let fixture: ComponentFixture<ManageaccountUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageaccountUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageaccountUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
