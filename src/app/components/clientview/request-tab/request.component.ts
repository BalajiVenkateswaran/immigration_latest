import {Component, OnInit} from '@angular/core';
import {ClientRequestService} from './request.service';
import {RequestButtonComponent} from './RequestButton';
import {HeaderService} from '../../common/header/header.service';
import {AppService} from '../../../services/app.service';

@Component({
    selector: 'ih-clientview-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.sass'],
  providers: [ClientRequestService],
  entryComponents: [RequestButtonComponent]
})

export class ClientViewRequestComponent implements OnInit {
    clientRequests: any;
    private statusNull: any;
    private statusAcc: any;
    private statusDec: any;
    private updateStatus: any = {};
    public settings: any = {
      'isDeleteEnable': false,
      'pagination': false,
      'isAddButtonEnable': false,
      'rowHeight': 60, // configuring the row height
      'columnsettings': [
        {
          headerName: 'SL No',
          field: 'id',
          width: 10, // configuring the column width of grid manually
        },
        {
          headerName: 'Request Type',
          field: 'requestType',
          width: 20, // configuring the column width of grid manually
        },
        {
          headerName: 'Message',
          field: 'message',
          width: 80 // configuring the column width of grid manually
        },
        {
          headerName: 'Request',
          cellRendererFramework: RequestButtonComponent,
          width: 30, // configuring the column width of grid manually
        }
      ]
    };
    public data: any;
    public requestSubscription;
    public declineSubscription;
    public checked = false;
    public status;
    constructor(public headerService: HeaderService, private clientviewrequestservice: ClientRequestService, public appService: AppService) {}

    statusClick(clientRequest) {
        if (this.checked) {
        }
    }
    ngOnInit() {
        let columnArray = [];
        columnArray.push(this.settings);
        this.headerService.showSideBarMenu(null, 'clientview/requests');
        this.clientviewrequestservice.getClientInvites(this.headerService.user.userId)
            .subscribe((res) => {
                this.clientRequests = res['clientInvite'];

                for (let i = 0; i < this.clientRequests.length; i++) {
                    this.clientRequests[i]['id'] = i + 1;
                    if (this.clientRequests[i].status == null) {
                        this.statusNull = true;
                    }
                    if (this.clientRequests[i].status === 'Accept') {
                        this.statusAcc = true;
                    }
                    if (this.clientRequests[i].status === 'Decline') {
                        this.statusDec = true;
                    }
                }
                this.data = this.clientRequests;
            });
    }

}
