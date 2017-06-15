import {ImmigrationViewPetitionsService} from "./petitions.service";
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";

@Component({
    template: `<select class="form-control" (change)="Changesubtype($event)">
    <option value="">-- Select --</option>
    <option *ngFor="let subtype of allSubTypes" [value]="subtype.petitionSubType">{{ subtype.petitionSubType }}</option>
    </select>
`
})
export class PetitionSubTypeCustomEditorComponent extends DefaultEditor implements AfterViewInit {
    private allPetitionTypesAndSubTypes;
    private item: any[];
    allSubTypes;
    constructor(private immigrationviewpetitionService: ImmigrationViewPetitionsService, private appService: AppService) {
        super();
    }
    ngDoCheck() {
        this.allSubTypes=this.appService.subtypesarray;
    }
    ngAfterViewInit() {
        if (this.cell.newValue !== '') {
            //this.name.nativeElement.value = this.getUrlName();
            //this.url.nativeElement.value = this.getUrlHref();
        }
    }
    Changesubtype(event) {
        console.log(event.target.value);
        this.cell.newValue = event.target.value;

        //this.selectedOne = this.allPetitionTypesAndSubTypes.filter((ptst) => {
        //    return ptst.id == event.target.value;
        //})[0];

    }
    //updateValue() {
    //    const href = this.url.nativeElement.value;
    //    const name = this.name.nativeElement.value;
    //    this.cell.newValue = `<a href='${href}'>${name}</a>`;
    //}

    //getUrlName(): string {
    //    return this.htmlValue.nativeElement.innerText;
    //}

    //getUrlHref(): string {
    //    return this.htmlValue.nativeElement.querySelector('a').getAttribute('href');
    //}
}
