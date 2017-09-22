import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppService } from '../../../../../services/app.service';
import { NotesService } from "./notes.service";
import {HeaderService} from "../../../../common/header/header.service";

@Component({
    selector: 'app-petition-details-notes',
    templateUrl: './notes.component.html'
})
export class NotesComponent implements OnInit {
    isNotesEdit;
    private notes: string;
    private beforeCancelPetition;
    private petitionDetails: any = {};
    constructor(public appService: AppService, private petitionNotesService: NotesService, public headerService: HeaderService) {
    }

    ngOnInit() {
        this.headerService.showSideBarMenu("immigrationview-petition", "petitions");
        this.petitionNotesService.getPetitionDetails(this.appService.petitionId).subscribe((res) => {
            if (res['petitionInfo'] != undefined) {
                this.petitionDetails = res['petitionInfo'];
                this.notes = this.petitionDetails['notes'];
            }
            if (res['clientId'] != undefined) {
                this.appService.clientId = res['clientId'];
            }
            this.isNotesEdit = true;
        });
    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }

    //is edit function for read only
    onEditNotesClick() {
        this.beforeCancelPetition = (<any>Object).assign({}, this.petitionDetails);
        this.isNotesEdit = !this.isNotesEdit;
    }

    //cancel button function
    onCancelNotesClick() {
        this.petitionDetails = this.beforeCancelPetition;
        this.isNotesEdit = !this.isNotesEdit;
    }

    //Save Client Details
    onSaveNotesClick() {
        this.petitionDetails['petitionId'] = this.appService.petitionId;
        this.petitionDetails['notes'] = this.petitionDetails.notes;
        this.petitionNotesService.savePetitionDetails(this.petitionDetails, this.headerService.user.userId)
            .subscribe((res) => {
                this.isNotesEdit = true;
                if (res['petitionInfo'] != undefined) {
                    this.notes = this.petitionDetails['notes'];
                }
            });
    }

}
