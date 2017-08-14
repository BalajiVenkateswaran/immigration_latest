import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperuserviewAccountdetailsMfdComponent } from './mfd.component';

describe('SuperuserviewAccountdetailsMfdComponent', () => {
  let component: SuperuserviewAccountdetailsMfdComponent;
  let fixture: ComponentFixture<SuperuserviewAccountdetailsMfdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperuserviewAccountdetailsMfdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperuserviewAccountdetailsMfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
