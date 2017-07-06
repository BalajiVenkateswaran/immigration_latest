import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationViewReportsComponent } from './immigration-view-reports.component';

describe('ImmigrationViewReportsComponent', () => {
  let component: ImmigrationViewReportsComponent;
  let fixture: ComponentFixture<ImmigrationViewReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmigrationViewReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmigrationViewReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
