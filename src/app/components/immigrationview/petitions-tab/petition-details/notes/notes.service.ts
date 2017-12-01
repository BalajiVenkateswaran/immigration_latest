import { RestService } from '../../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class NotesService {

    constructor(private restService: RestService) {
    }

    public getPetitionDetails(petitionId: string) {
        return this.restService.getData('/petition/details/' + petitionId);
    }

    public savePetitionDetails(petitionDetails: any, userId: string) {
        let req = {
            'petitionInfo': petitionDetails,
            'userId': userId
        };

        return this.restService.postData('/petition/petitionInfo', req);
    }

}
