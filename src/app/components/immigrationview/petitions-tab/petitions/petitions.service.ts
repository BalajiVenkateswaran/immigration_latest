import { petition } from '../../../../models/petitions';
import { RestService } from '../../../../services/rest.service';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class PetitionsService {

  constructor(private restService: RestService) {

  }

  public saveNewPetition(petitionData: petition) {
      return this.restService.postData("/petition", petitionData);

  }

  public getUsersForAccount(accountId: string){
           return this.restService.getData("/user/immigration/"+accountId);
      }
  public getPetitionsWithQueryParams(orgId:string,queryData){
   
      return this.restService.getData("/petitions/immigration/"+orgId+queryData);
  
  }

}
