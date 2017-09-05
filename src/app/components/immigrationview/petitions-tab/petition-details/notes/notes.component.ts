import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '../../../../../services/app.service';
import {NotesService} from "./notes.service";

@Component({
    selector: 'app-petition-details-notes',
    templateUrl: './notes.component.html'
})
export class NotesComponent implements OnInit {
    isNotesEdit;
    private notes: string;
    private beforeCancelPetition;
    private petitionDetails: any = {};
    //Profile section variables
    


    constructor(public appService: AppService, private petitionNotesService: NotesService) {
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
