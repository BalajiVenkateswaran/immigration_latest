import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppService} from "../../services/app.service";
import {ImmigrationViewPetitionNotesService} from "./petition-notes.service";
import {User} from "../../models/user";
import {ImmigrationViewPetitionNotes} from "../../models/ImmigrationViewPetitionNotes";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

export interface formControl {
    name: string;
    value: FormControl;
}

@Component({
    selector: 'app-petition-notes',
    templateUrl: './petition-notes.component.html'
})
export class ImmigrationviewPetitionNotesComponent implements OnInit {
    private user: User;
    private notes: string;
    private petitionDetails: any = {};
        private beforeCancelPetition;
    //Profile section variables
    isNotesEdit;
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };

    constructor(public appService: AppService, private petitionNotesService: ImmigrationViewPetitionNotesService) {
        if (this.appService.user) {
            this.user = this.appService.user;
        }
    }

    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }

    ngOnInit() {
        this.appService.showSideBarMenu("immigrationview-petition", "petitions");
        this.petitionNotesService.getPetitionDetails(this.appService.petitionId).subscribe((res) => {
            if (res['petitionInfo'] != undefined) {
                this.petitionDetails = res['petitionInfo'];
                    //TODO - Set client first name and last name to appService
                    this.notes = this.petitionDetails['notes'];
                }
                

                if (res['clientId'] != undefined) {
                    this.appService.clientId = res['clientId'];
                }
                this.isNotesEdit = true;
            });



    }



    //is edit function for read only
    editNotesForm() {
        this.beforeCancelPetition = (<any>Object).assign({}, this.petitionDetails);
        this.isNotesEdit = !this.isNotesEdit;
    }

    //cancel button function
    cancelNotesEdit() {
        this.petitionDetails = this.beforeCancelPetition;
        this.isNotesEdit = !this.isNotesEdit;
    }

    //Save Client Details
    saveNotes() {
        this.petitionDetails['petitionId'] = this.appService.petitionId;
        this.petitionDetails['notes'] = this.petitionDetails.notes;
        this.petitionNotesService.savePetitionDetails(this.petitionDetails,this.appService.user.userId)
            .subscribe((res) => {
                this.isNotesEdit = true;
                if (res['petitionInfo'] != undefined) {
                    this.notes = this.petitionDetails['notes'];
                }
            });
    }

}
