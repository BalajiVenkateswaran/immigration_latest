import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { RestService } from "../../services/rest.service";
import { clientviewpetition } from "../../models/clientviewpetitions";

@Injectable()
export class clientviewPetitionsService {

    constructor(private restService: RestService) {

    }

    public getPetitions(userId: string) {
        console.log("PetitionsService|getPetitions|userId:%o", userId);
        return this.restService.getData("/petitions/clientview/" + userId);
    }
    public getPetitionsFilteredData(userId: string, filterQueries: any) {
        return this.restService.getData("/petitions/clientview/" + userId + '?' + "filter=" + filterQueries)
    }


}


