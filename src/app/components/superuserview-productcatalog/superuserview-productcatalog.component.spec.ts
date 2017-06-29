import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperuserviewProductcatalogComponent } from './superuserview-productcatalog.component';

describe('SuperuserviewProductcatalogComponent', () => {
  let component: SuperuserviewProductcatalogComponent;
  let fixture: ComponentFixture<SuperuserviewProductcatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperuserviewProductcatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperuserviewProductcatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
