import { Component, OnInit, Input } from '@angular/core';
import { SmartTableVisasService } from "./smarttable-visas.service";
import { i797history } from "../../models/i797history";
import { FormGroup, FormControl } from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import { User } from "../../models/user";
import { AppService } from "../../services/app.service";
import { CustomFilterRow } from '../smarttableframework/CustomFilterRow';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService, DialogComponent } from "ng2-bootstrap-modal";
import { IMyOptions, IMyDateModel, IMyDate } from 'mydatepicker';
import { SmartTableFramework } from '../smarttableframework/SmartTableFramework';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
@Component({
    selector: 'app-i-797-history',
    templateUrl: './smarttable-visas.html',

})
export class SmartTableVisas {
    public settings;
    /*   public data: any = {
                                   "i797HistoryId": "2c9fc60d5caecc99015caf9e07090000",
                                   "clientId": "2c9fc60d5c7e1f31015c9adda135003a",
                                   "receiptNumber": "1234777773423",
                                   "receiptDate": "06-28-2017",
                                   "status": "H1B",
                                   "approvedOn": "06-28-2017",
                                   "validFrom": "06-28-2017",
                                   "validTill": "06-28-2017"
                               };*/
    public data: any;
    public subscription;
    public filterValues: any;
    public filteredData;
    public filterKeys = [];
    public filterWholeArray = [];
    constructor(private smartTableVisaService: SmartTableVisasService, public appService: AppService) {
        this.settings = {
            'columnsettings': [
                {
                    //headerComponentFramework: CustomFilterRow,
                    headerName: "Country",
                    field: "country",
                    width: 100,
                },
                {
                    headerComponentFramework: CustomFilterRow,
                    headerName: "Petition Number",
                    field: "petitionNumber",
                    width: 100,
                },
                {
                    headerComponentFramework: CustomFilterRow,
                    headerName: "Visa Number",
                    field: "visaNumber",
                    width: 100,
                },
                {
                    headerComponentFramework: CustomFilterRow,
                    headerName: "Visa Type",
                    field: "visaType",
                    width: 100,
                },
                {
                    headerComponentFramework: CustomFilterRow,
                    headerName: "Issued On",
                    field: "issuedOn",
                    width: 100
                },
                {
                    headerComponentFramework: CustomFilterRow,
                    headerName: "Expires On",
                    field: "expiresOn",
                    width: 100,
                }
            ]
        }
        this.smartTableVisaService.getVisasDetails(this.appService.clientId).subscribe((res) => {
            this.data = res['visas'];
        });

        this.subscription = CustomFilterRow.fillValues.subscribe(res => {
            if (res) {
                this.filterValues = res;
                for (let i = 0; i < this.filterValues.length; i++) {
                    if (this.filterWholeArray.indexOf(this.filterValues[i]) == -1) {
                        this.filterWholeArray.push(this.filterValues[i]);
                        this.filterKeys.push(this.filterValues[i]['filterValue']);
                        this.filterValues.splice(i, 1);
                    }
                }

            }
        });
    }
    delete(index, x) {
       this.filterWholeArray.splice(index, 1);
   }
}
