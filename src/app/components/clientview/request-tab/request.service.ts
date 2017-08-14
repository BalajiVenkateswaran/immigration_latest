
import {Injectable} from "@angular/core";
import {RestService} from "../../../services/rest.service";
import {clientviewrequest} from "../../../models/clientviewrequest";
import {Router} from "@angular/router";
@Injectable()
export class ClientRequestService {

  constructor(private restService: RestService) {

  }

  public getClientInvites(userId: string) {
      return this.restService.getData("/client/invite/" + userId);
  }

  public updateClientInviteStatus(updateStatus:any) {
      var req = {
          "updateStatus": updateStatus
      };
      return this.restService.postData("/client/invite/updateStatus", updateStatus);
  }
}
