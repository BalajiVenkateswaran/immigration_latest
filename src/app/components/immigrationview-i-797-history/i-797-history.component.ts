import { Component, OnInit,Injector } from '@angular/core';
import {ImmigrationViewI797HistoryService} from "./i-797-history.service";
import {i797history} from "../../models/i797history";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {CustomFilterRow} from './CustomFilterRow';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
import { AgGridModule } from "ag-grid-angular/main";
import { GridOptions } from "ag-grid";
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-i-797-history',
  templateUrl: './i-797-history.component.html',
  styleUrls: ['./i-797-history.component.sass']
})
export class ImmigrationViewI797HistoryComponent implements OnInit {
    public gridOptions: GridOptions;
    //private delmessage;
    private user: User;
    //public addI797History: FormGroup; // our model driven form
    //public submitted: boolean; // keep track on whether form is submitted
    private message: string;
    private userList;
    public filterValues:any;
    public filterWholeArray = [];
    public deletedFilterClicked: any;
    constructor(private immigrationViewI797HistoryService: ImmigrationViewI797HistoryService, public appService: AppService, private dialogService: DialogService, private injector: Injector) {
        if (this.appService.user) {
            this.user = this.appService.user;
        }
        this.gridOptions = <GridOptions>{};
        this.gridOptions = {
            floatingFilter: false,
            enableFilter: false,
            headerHeight: 70,
            pagination: true,
            paginationPageSize: 8,
            
            columnDefs: [
            {
                headerComponentFramework: CustomFilterRow,
                headerName: "Approved on",
                field: "approvedOn",
                width: 100,
            },
            {
                headerComponentFramework: CustomFilterRow,
                headerName: "Receipt Number",
                field: "receiptNumber",
                width: 100,
               
               
                
            },
            {
                headerComponentFramework: CustomFilterRow,
                headerName: "Status",
                field: "status",
                width: 100,  
                cellStyle: function (params) {
                    if (params.value == 'H1B') {
                        //mark police cells as red
                        return {  backgroundColor: 'red' };
                    } else {
                        return null;
                    }
                }
            },
            {
                headerComponentFramework: CustomFilterRow,
                headerName: "Valid From",
                field: "validFrom",
                width: 100,
               
            },
            {
                headerComponentFramework: CustomFilterRow,
                headerName: "Valid Till",
                field: "validTill",
                width: 100,
               
            },
            {
                headerComponentFramework: CustomFilterRow,
                headerName: "Receipt Number",
                field: "receiptNumber",
                width: 100,
               
            },

            ],
            
        }
        CustomFilterRow.fillValues.subscribe(res => {
            if (res) {
                this.filterValues = res;
                for (let i = 0; i < this.filterValues.length; i++) {

                    if (this.filterWholeArray.indexOf(this.filterValues[i]) == -1) {
                        this.filterWholeArray.push(this.filterValues[i]);
                        this.filterValues.splice(i, 1);
                    }
                 
                }
            }           
        });
    }   
    ngOnInit() {
        this.immigrationViewI797HistoryService.getI797Details(this.appService.clientId)
            .subscribe((res) => {
                this.userList = res['i797HistoryList'];
                this.gridOptions.rowData = this.userList;
                this.gridOptions.api.setRowData(this.userList);

            });
    }

   highlightSBLink(link) {
       this.appService.currentSBLink = link;
   }
   delete(index, x) {
       this.filterWholeArray.splice(index, 1);
   }
   
}
