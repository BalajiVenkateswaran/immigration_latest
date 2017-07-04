import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";

@Injectable()
export class ImmigrationViewPetitionDetailsService {

    constructor(private restService: RestService) {
    }

    public getPetitionDetails(petitionId: string) {
        return this.restService.getData("/petition/details/" + petitionId);
    }

    public getPetitionStages(accountId: string, petitionTypeId: string) {
         return this.restService.getData("/account/petitionStage/accountId/"+accountId+"/petitionType/"+ petitionTypeId);
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

    public saveReceiptInfo(receiptInfo: any) {
        var req = {
            "receiptInfo": receiptInfo
        };

        return this.restService.postData("/petition/receiptInfo", req);
    }

    public saveLcaInfo(lcaInfo: any) {
        var req = {
            "lcaInfo": lcaInfo
        };

        return this.restService.postData("/petition/LCAInfo", req);
    }

    public saveSponsorInfo(sponsorInfo: any) {
        var req = {
            "sponsorInfo": sponsorInfo
        };

        return this.restService.postData("/petition/sponsorInfo", req);
    }

    public getAllPetitionTypesAndSubTypes() {
        return this.restService.getData("/petition/config/all/types/subtypes");
    }
}
