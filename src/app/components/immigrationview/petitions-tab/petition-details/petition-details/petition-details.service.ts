import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PetitionDetailsService {

    constructor(private restService: RestService) {
    }

    public getPetitionDetails(petitionId: string) {
        return this.restService.getData('/petition/details/' + petitionId);
    }

    public getPetitionStages(accountId: string, petitionTypeId: string) {
        return this.restService.getData('/account/petitionStage/accountId/' + accountId + '/petitionType/' + petitionTypeId);
    }

    public getDelegatedOrgs(accountId: string, petitionId: string) {
        return this.restService.getData('/immigration/orgs/account/' + accountId + '/petition/' + petitionId);
    }

    public getUsersForAccount(accountId: string) {
         return this.restService.getData('/user/immigration/' + accountId);
    }


    public savePetitionDetails(petitionDetails: any, userId: string) {
        let req = {
            'petitionInfo': petitionDetails,
            'userId': userId
        };

        return this.restService.postData('/petition/petitionInfo', req);
    }

    public savePetitionAdditionalDetails(petitionAdditionalDetails: any, userId: string) {
        let req = {
            'petitionAdditionalDetails': petitionAdditionalDetails,
            'userId': userId
        };
        return this.restService.postData('/petition/additionaldetails/', req);
    }


    public saveReceiptInfo(receiptInfo: any, userId: string) {
        let req = {
            'receiptInfo': receiptInfo,
            'userId': userId
        };

        return this.restService.postData('/petition/receiptInfo', req);
    }

    public saveLcaInfo(lcaInfo: any, userId: string) {
        let req = {
            'lcaInfo': lcaInfo,
            'userId': userId
        };

        return this.restService.postData('/petition/LCAInfo', req);
    }

    public saveSponsorInfo(sponsorInfo: any, userId: string) {
        let req = {
            'sponsorInfo': sponsorInfo,
            'userId': userId
        };

        return this.restService.postData('/petition/sponsorInfo', req);
    }

    public getAllPetitionTypesAndSubTypes() {
        return this.restService.getData('/petition/config/all/types/subtypes');
    }

    public saveDelegatedOrgs(orgs: any, petitonId, userId: string) {
        let req = {
            'orgIds': orgs,
            'petitionId': petitonId,
            'userId': userId

        };
        return this.restService.postData('/immigration/orgs/petition', req);
    }
    public sendChecklist(accountId: string, petitionId: string) {
        return this.restService.getData('/immigration/account/' + accountId + '/checklist/send/petition/' + petitionId);
    }
}
