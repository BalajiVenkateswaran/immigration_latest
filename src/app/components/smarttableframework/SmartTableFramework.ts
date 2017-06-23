import { Component, OnInit,Injector } from '@angular/core';
import {SmartTableFrameworkService} from "./SmartTableFramework-service";
import {i797history} from "../../models/i797history";
import {FormGroup, FormControl} from "@angular/forms";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {CustomFilterRow} from './CustomFilterRow';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../confirmbox/confirm.component';
import { DialogService,DialogComponent} from "ng2-bootstrap-modal";
import { AgGridModule } from "ag-grid-angular/main";
import { GridOptions } from "ag-grid";
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
export interface ConfirmModel {
    title: string;
    message: string;
    editI797:boolean;
    getI797:boolean;
    i797:Object;
    approvedOn:string;
    validFrom:string;
    validTill:string;
    receiptDate:string;
    beforeEdit:Object;
}

@Component({
  selector: 'smart-table',
  templateUrl: './SmartTableFramework.html',
 
})
export class SmartTableFramework extends DialogComponent<ConfirmModel, boolean>implements OnInit {
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
    public subscription;
    public editI797:boolean=false;
    public getI797:boolean=true;
    public i797:any={};
    public beforeEdit:any={};
    public sampletext;
    public  editedValues = new Subject<any[]>();
    public filteredData;
    public filterKeys=[];
    onDateChanged(event: IMyDateModel) {}
    private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm-dd-yyyy',
        showClearDateBtn: false,
    };
    constructor(private smartableframeworkService: SmartTableFrameworkService, public appService: AppService, public dialogService: DialogService) {
        super(dialogService);
        if (this.appService.user) {
            this.user = this.appService.user;
        }
        this.gridOptions = <GridOptions>{};
        this.gridOptions = {
            floatingFilter: false,
            enableFilter: false,
            headerHeight: 50,
            pagination: true,
            paginationPageSize:10,
            suppressDragLeaveHidesColumns: true,
            suppressAutoSize:true,
            suppressMovableColumns: true,
           
            //suppressPaginationPanel: true,
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
                width:70,
               
               
                
            },
            {
                headerComponentFramework: CustomFilterRow,
                headerName: "Status",
                field: "status",
                width: 100,  
                cellStyle: function (params) {
                    if (params.value == 'H1B') {
                        //mark police cells as red
                        return {  backgroundColor: 'red',color:'yellow' };
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
                headerName: "Receipt Date",
                field: "receiptDate",
                width: 100,
               
            },

            ],
            
        }
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
    onPageSizeChanged(newPageSize) {
        this.gridOptions.api.paginationSetPageSize(Number(newPageSize));
    } 
    ngOnDestroy() {
        this.subscription.unsubscribe(); 
    }
    ngOnInit() {
        this.getData();
    }
    getData(){
         this.smartableframeworkService.getI797Details(this.appService.clientId)
            .subscribe((res) => {
                this.userList = res['i797HistoryList'];
                this.gridOptions.rowData = this.userList;
                if(this.userList!=undefined){
                    this.gridOptions.api.setRowData(this.userList);
                    this.gridOptions.api.sizeColumnsToFit();
                }
            
                
            });    
    }
   highlightSBLink(link) {
       this.appService.currentSBLink = link;
   }
   delete(index, x) {
       this.filterWholeArray.splice(index, 1);
   }
   onRowClicked(event){
       this.editedValues.next(event.data);
       
       this.dialogService.addDialog(SmartTableFramework, {
            editI797:true,
            title: 'Edit I-797 Histroy',
            getI797:false,
            i797:event.data,
            approvedOn:event.data.approvedOn,
            validFrom:event.data.validFrom,
            validTill:event.data.validTill,
            receiptDate:event.data.receiptDate,
            beforeEdit:(<any>Object).assign({},event.data),  
        });
   }
   saveI797() {
        this.i797['clientId']=this.appService.clientId;
        if (this.i797['approvedOn'] && this.i797['approvedOn']['formatted']) {
            this.i797['approvedOn'] = this.i797['approvedOn']['formatted'];
        }
        if (this.i797['validFrom'] && this.i797['validFrom']['formatted']) {
            this.i797['validFrom'] = this.i797['validFrom']['formatted'];
        }
        if (this.i797['validTill'] && this.i797['validTill']['formatted']) {
            this.i797['validTill'] = this.i797['validTill']['formatted'];
        }
        if (this.i797['receiptDate'] && this.i797['receiptDate']['formatted']) {
            this.i797['receiptDate'] = this.i797['receiptDate']['formatted'];
        }
        this.smartableframeworkService.saveI797Details(this.i797).subscribe(res=>{console.log(res)});
        this.getData();
        this.result = true;
        this.close();
      
    }
    cancel() {
       
        this.i797=this.beforeEdit;
        this.result = false;
        this.close();
    }
    
}

