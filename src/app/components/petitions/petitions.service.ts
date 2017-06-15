import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {petition} from "../../models/petitions";
import {RestService} from "../../services/rest.service";

@Injectable()
export class PetitionsService {

  constructor(private restService: RestService) {

  }

  public getPetitions (orgId: string) {
    console.log("PetitionsService|getPetitions|orgId:%o", orgId);
    return this.restService.getData("/petitions/immigration/"+orgId);
  }
  public saveNewPetition(petitionData: petition) {
      return this.restService.postData("/petition", petitionData);

  }

  public getUsersForAccount(accountId: string){
           console.log("PetitionsService|usersForAssignedTo|accountId:%o", accountId);
           return this.restService.getData("/user/immigration/"+accountId);
      }

}
