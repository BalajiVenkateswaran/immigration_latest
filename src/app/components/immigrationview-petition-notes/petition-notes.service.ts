import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";

@Injectable()
export class ImmigrationViewPetitionNotesService {

    constructor(private restService: RestService) {
    }

    public getPetitionDetails(petitionId: string) {
        return this.restService.getData("/petition/details/" + petitionId);
    }

    public getUsersForAccount(accountId: string){
         return this.restService.getData("/user/immigration/"+accountId);
    }

    public savePetitionDetails(petitionDetails: any, userId: string) {
        var req = {
            "petitionInfo": petitionDetails,
            "userId": userId
        };

        return this.restService.postData("/petition/petitionInfo", req);
    }

}
