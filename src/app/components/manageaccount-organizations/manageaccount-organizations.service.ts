import {Injectable} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {manageaccountorganization} from "../../models/manageaccountorganization";

@Injectable()
export class ManageAccountOrganizationsService {

    constructor(private restService: RestService) {

    }

    public getManageAccountOrganizations(accountId: string) {
        //console.log("PetitionsService|getPetitions|orgId:%o", accountId);
        return this.restService.getData("/org/" + accountId);
    }
    public saveNewOrganization(organizationData: manageaccountorganization) {
        var req = {
          "org" : organizationData
        };
        return this.restService.postData("/org", req);
    }

    public updateOrganization(organizationData: manageaccountorganization) {
        var req = {
          "org" : organizationData
        };
        return this.restService.putData("/org", req);
    }

    public deleteOrganization(orgId: string, immigrationOfficerId: string) {

        console.log(orgId);
        return this.restService.deleteData("/org/" + orgId+"/immigrationOfficerId/"+immigrationOfficerId);
    }

}
