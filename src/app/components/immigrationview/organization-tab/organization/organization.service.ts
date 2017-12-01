import { RestService } from '../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class OrganizationService {
    constructor(private restService: RestService) {

    }

    public getOrgDetails(orgId: string) {
        return this.restService.getData('/uifields/screen/Org%20Details/entity/' + orgId);
    }

    public saveEditUser(organizations: any) {
        let uiFieldGroups = new Object();

        uiFieldGroups['uiFieldGroups'] = organizations;
        console.log('uiFieldGroups: %o', uiFieldGroups);
        return this.restService.postData('/uifields', uiFieldGroups);
    }

    public getOrganizationDetails(orgId: string) {
        return this.restService.getData('/organization/' + orgId);

    }

    public saveOrgDetails(OrgDetails: any, immigrationOfficerId: string) {
        console.log('immigrationview-client-details|saveClientDetails|clientDetails:%o', OrgDetails);
        let req = {
            'organizationDetails': OrgDetails,
            'userId': immigrationOfficerId
        };

        return this.restService.postData('/organization/details', req);
    }
    public getOrgnizationContacts(orgId: string) {
        return this.restService.getData('/organization/' + orgId);
    }

    public saveSigningDetails(signinDetails: any, signDetailsAddress: any) {

        console.log(signinDetails);
        console.log(signDetailsAddress);

        let req = {
            'contactDetails': {
                 'address': signDetailsAddress,
                 'contactId': signinDetails.contactId,
                 'contactType': signinDetails.contactType,
                 'email': signinDetails.email,
                 'fax': signinDetails.fax,
                 'name': signinDetails.name,
                 'orgId': signinDetails.orgId,
                 'title': signinDetails.title,
                 'tnNo': signinDetails.tnNo
            }
        };

        console.log(req);

        return this.restService.postData('/organization/contact', req);
    }
    public saveAdminstrativeDetails(adminstrativeDetails: any, signDetailsAddress: any) {

        console.log(adminstrativeDetails);
        console.log(signDetailsAddress);


        let req = {
            'contactDetails': {
                'address': signDetailsAddress,
                'contactId': adminstrativeDetails.contactId,
                'contactType': adminstrativeDetails.contactType,
                'email': adminstrativeDetails.email,
                'fax': adminstrativeDetails.fax,
                'name': adminstrativeDetails.name,
                'orgId': adminstrativeDetails.orgId,
                'title': adminstrativeDetails.title,
                'tnNo': adminstrativeDetails.tnNo,

            },
        };


        console.log(req);
        return this.restService.postData('/organization/contact', req);
    }


}
