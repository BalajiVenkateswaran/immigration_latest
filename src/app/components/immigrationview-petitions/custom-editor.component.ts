import {ImmigrationViewPetitionsService} from "./petitions.service";
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';
import {AppService} from "../../services/app.service";

@Component({
    template: `<select class="form-control" (change)="handleChange($event)">
    <option value="">-- Select --</option>
    <option *ngFor="let ptst of allPetitionTypesAndSubTypes" [value]="ptst.petitionTypeId">{{ ptst.petitiontype }}</option>
    </select>
`
})
export class CustomEditorComponent extends DefaultEditor implements AfterViewInit {
    allPetitionTypesAndSubTypes;
    private item: any[];
    private allSubTypes = {};
    constructor(private immigrationviewpetitionService: ImmigrationViewPetitionsService, private appService: AppService) {
        super();
    }
    ngOnInit() {
        this.immigrationviewpetitionService.getAllPetitionTypesAndSubTypes()
            .subscribe((res) => {
                this.allPetitionTypesAndSubTypes = res['petitionTypes'];
            });
    }
    ngAfterViewInit() {
        if (this.cell.newValue !== '') {
            //this.name.nativeElement.value = this.getUrlName();
            //this.url.nativeElement.value = this.getUrlHref();
        }
    }
    handleChange(event) {
        console.log(event.target.value);
        for (var i = 0; i < this.allPetitionTypesAndSubTypes.length; i++) {
            if (event.target.value == this.allPetitionTypesAndSubTypes[i].petitionTypeId) {
                this.allSubTypes = this.allPetitionTypesAndSubTypes[i].petitionSubTypes;
            }
        }
        this.appService.allsubtypesarray(this.allSubTypes);

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
