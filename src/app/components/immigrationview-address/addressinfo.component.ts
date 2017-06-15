import {Component, OnInit, OnChanges, SimpleChange, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy} from '@angular/core';
import {UiFieldService} from "../../services/uifield.service";
import {addressinfo} from "../../models/addressinfo";
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../../models/user";
import {AppService} from "../../services/app.service";
import {Addressinfoservice} from "./addressinfo.service";
import {IMyOptions, IMyDateModel, IMyDate} from 'mydatepicker';
export interface formControl {
    name: string;
    value: FormControl;
}

@Component({
  selector: 'app-addressinfo',
  templateUrl: './addressinfo.component.html',
  styleUrls: ['./addressinfo.component.sass']
})
export class ImmigrationViewAddressinfoComponent implements OnInit {

    private addressinfoList: any;
    private entityId : string;
    public editUser: FormGroup; // our model driven form
    private fieldsList: addressinfo[];
    private formControlValues: any = {};
    isEdit: boolean[] = [true];
    private message: string;
    private saveEditUser: any;
    public cancelUserEdit: boolean = false;
    private user: User;
    public WorkaddressinfoList: any = { address: {}};
    private ResidenceaddressinfoList: any = {address: {}};
    private MailingaddressinfoList: any = {address: {}};
    private ForiegnaddressinfoList: any = {address: {}};
    workedit: any;
    residenceedit: any;
    mailingedit: any;
    foreignedit: any;
    private ClientDetailsforaddress;
    public WorkaddressinfoListspare: any = { address: {} };
    private ResidenceaddressinfoListspare: any = { address: {} };
    private MailingaddressinfoListspare: any = { address: {} };
    private ForiegnaddressinfoListspare: any = { address: {} };
    private workResidingSince: string;
    private resiResidingSince: string;
    private myDatePickerOptions: IMyOptions = {
            // other options...
            dateFormat: 'mm-dd-yyyy',
            showClearDateBtn: false,
        };
    constructor(private uiFieldService: UiFieldService,
        private formBuilder: FormBuilder, public appService: AppService, private addressinfoservice: Addressinfoservice) {
        if (this.appService.user) {
            this.user = appService.user;

        }
        this.addressinfoservice.getClientAddress(this.appService.clientId)
            .subscribe((res) => {
                console.log("clientaddress%o", res);
                this.addressinfoList = res['clientAddress'];
                this.addressType();
                this.ClientDetailsforaddress = res['clientAddress'];

            });
    }
    ngOnInit() {

        this.workedit = true;
        this.residenceedit = true;
        this.mailingedit = true;
        this.foreignedit = true;
    }
    highlightSBLink(link) {
        this.appService.currentSBLink = link;
    }
    addressType() {
        for (var key in this.addressinfoList) {
            if (this.addressinfoList[key].addressType == "WORK") {
                this.WorkaddressinfoList = this.addressinfoList[key];
            }
            if (this.addressinfoList[key].addressType == "RESIDENCE") {
                this.ResidenceaddressinfoList = this.addressinfoList[key];
            }
            if (this.addressinfoList[key].addressType == "MAILING") {
                this.MailingaddressinfoList = this.addressinfoList[key];
            }
            if (this.addressinfoList[key].addressType == "FOREIGN") {
                this.ForiegnaddressinfoList = this.addressinfoList[key];
            }
        }

    }

       onDateChanged(event: IMyDateModel) {


          }

    addressedit(addresstype) {

        this.addressinfoservice.getClientAddress(this.appService.clientId)
           .subscribe((res) => {
               console.log("clientaddress%o", res);
               this.addressinfoList = res['clientAddress'];
               this.ClientDetailsforaddress = res['clientAddress'];
            });
        if (addresstype=="WORK") {
            this.workedit = !this.workedit;
            this.workResidingSince = this.WorkaddressinfoList['residingSince'];
        }
        if (addresstype =="RESIDENCE") {
            this.residenceedit = !this.residenceedit;
            this.resiResidingSince = this.ResidenceaddressinfoList['residingSince'];
        }
        if (addresstype == "MAILING") {
            this.mailingedit = !this.mailingedit;
        }
        if (addresstype == "FOREIGN") {
            this.foreignedit = !this.foreignedit;
        }
    }

    cancelEdit(addresstype) {
        //this.addressinfoList = this.ClientDetailsforaddress;

        for (var key in this.ClientDetailsforaddress) {
            if (this.ClientDetailsforaddress[key].addressType == "WORK") {
                this.WorkaddressinfoListspare = this.ClientDetailsforaddress[key];
            }
            if (this.ClientDetailsforaddress[key].addressType == "RESIDENCE") {
                this.ResidenceaddressinfoListspare = this.ClientDetailsforaddress[key];
            }
            if (this.ClientDetailsforaddress[key].addressType == "MAILING") {
                this.MailingaddressinfoListspare = this.ClientDetailsforaddress[key];
            }
            if (this.ClientDetailsforaddress[key].addressType == "FOREIGN") {
                this.ForiegnaddressinfoListspare = this.ClientDetailsforaddress[key];
            }
        }
        if (addresstype == "WORK") {
            this.WorkaddressinfoList = this.WorkaddressinfoListspare
            this.workedit = true;
        }
        if (addresstype == "RESIDENCE") {
            this.ResidenceaddressinfoList = this.ResidenceaddressinfoListspare
            this.residenceedit = true;
        }
        if (addresstype == "MAILING") {
            this.MailingaddressinfoList = this.MailingaddressinfoListspare
            this.mailingedit = true;
        }
        if (addresstype == "FOREIGN") {
            this.ForiegnaddressinfoList = this.ForiegnaddressinfoListspare
            this.foreignedit = true;
        }
    }

    saveClientAdress(addresstype) {
        if (addresstype == "WORK") {
            this.WorkaddressinfoList.addressType = addresstype;
            if (this.WorkaddressinfoList['residingSince'] && this.WorkaddressinfoList['residingSince']['formatted']) {
                        this.WorkaddressinfoList['residingSince'] = this.WorkaddressinfoList['residingSince']['formatted'];
                    }

            this.addressinfoservice.saveClientAddress(this.WorkaddressinfoList, this.appService.clientId)
                .subscribe((res) => {
                    this.workedit = true;
                    if (res['clientAddress']) {
                        this.WorkaddressinfoList = res['clientAddress'];
                    }
                });
        }
        if (addresstype == "RESIDENCE") {
            this.ResidenceaddressinfoList.addressType = addresstype;
               if (this.ResidenceaddressinfoList['residingSince'] && this.ResidenceaddressinfoList['residingSince']['formatted']) {
                                    this.ResidenceaddressinfoList['residingSince'] = this.ResidenceaddressinfoList['residingSince']['formatted'];
                                }

            this.addressinfoservice.saveClientAddress(this.ResidenceaddressinfoList, this.appService.clientId)
                .subscribe((res) => {
                    this.residenceedit = true;
                    if (res['clientAddress']) {
                        this.ResidenceaddressinfoList = res['clientAddress'];
                    }
                });
        }
        if (addresstype == "MAILING") {
            this.MailingaddressinfoList.addressType = addresstype;
            this.addressinfoservice.saveClientAddress(this.MailingaddressinfoList, this.appService.clientId)
                .subscribe((res) => {
                    this.mailingedit = true;
                    if (res['clientAddress']) {
                        this.MailingaddressinfoList = res['clientAddress'];
                    }
                });
        }
        if (addresstype == "FOREIGN") {
            this.ForiegnaddressinfoList.addressType = addresstype;
            this.addressinfoservice.saveClientAddress(this.ForiegnaddressinfoList, this.appService.clientId)
            .subscribe((res) => {
                this.foreignedit = true;
                if (res['clientAddress']) {
                    this.ForiegnaddressinfoList = res['clientAddress'];
                }
            });
        }
    }
}
