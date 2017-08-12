import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperuserviewProductcatalogDiscountsComponent } from './discounts.component';

describe('SuperuserviewProductcatalogDiscountsComponent', () => {
  let component: SuperuserviewProductcatalogDiscountsComponent;
  let fixture: ComponentFixture<SuperuserviewProductcatalogDiscountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperuserviewProductcatalogDiscountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperuserviewProductcatalogDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
