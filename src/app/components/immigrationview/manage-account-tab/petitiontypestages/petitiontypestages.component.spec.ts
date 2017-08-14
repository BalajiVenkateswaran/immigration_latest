/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageAccountPetitionTypeStagesComponent } from './petitiontypestages.component';

describe('ManageAccountPetitionTypeStagesComponent', () => {
    let component: ManageAccountPetitionTypeStagesComponent;
    let fixture: ComponentFixture<ManageAccountPetitionTypeStagesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ManageAccountPetitionTypeStagesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageAccountPetitionTypeStagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
