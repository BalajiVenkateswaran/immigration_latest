import {Component, OnInit, DoCheck, ViewChild, AfterViewChecked} from '@angular/core';
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {Immigrationviewservice} from "./header.component.service";

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmorgComponent } from '../confirmbox/confirmorg.component';
import { DialogService } from "ng2-bootstrap-modal";
import {MenuComponent} from "../menu/menu.component";

@Component({
    selector: 'immp-header',
    viewProviders: [Immigrationviewservice],
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements AfterViewChecked{
  applicationViewMode;
  user: User;
  private Immigrant;
  private immigrationManager;
  private orgNamelist;
  private orgNamevisible;
  private editorg;
  private tab;
  //private selectedOrg: any = {};
  private i;
  public orgnames: any = {};
  public delegatedOrg:boolean=false;
  @ViewChild('orgSelect') vc;

  public ngAfterViewChecked():void {
    if(this.vc != undefined){
      this.vc.nativeElement.focus();
    }
  }

  highlightTab(tab) {
      this.appService.currentTab = tab;
  }
  highlightSBLink(sblink) {
      this.appService.currentSBLink = sblink;
  }
  checkForCurrentTab(tab){
    return this.appService.currentTab == tab;
  }
  constructor(private router: Router, public appService: AppService, private dialogService: DialogService, private headerservice: Immigrationviewservice) {
    if(this.appService.user) {
      this.user = this.appService.user;
      }
    if (this.appService.rolemultiple == true) {
        this.headerservice.getUserOrgs(this.appService.selacntId, this.appService.user.userId, this.appService.selroleId).subscribe((res: any) => {
            this.appService.organizations = res.orgs;
            this.orgNamelist = this.appService.organizations;
            if (this.orgNamelist) {
                this.appService.selectedOrg = this.orgNamelist[0].orgName;
                if (this.appService.selectedOrg == undefined) {
                    this.appService.selectedOrg = "";
                }
                this.appService.orgId = this.orgNamelist[0].orgId;
                if (this.orgNamelist[0].orgType == "Delegated") {
                    this.delegatedOrg = true;
                }
                else {
                    this.delegatedOrg = false;
                }
            }
        });
    }
    else {
        this.orgNamelist = this.appService.organizations;
        if (this.orgNamelist) {
            this.appService.selectedOrg = this.orgNamelist[0].orgName;
            if (this.appService.selectedOrg == undefined) {
                this.appService.selectedOrg = "";
            }
            this.appService.orgId = this.orgNamelist[0].orgId;
            if (this.orgNamelist[0].orgType == "Delegated") {
                this.delegatedOrg = true;
            }
            else {
                this.delegatedOrg = false;
            }
        }
    }
  }
  editorgname() {
      //for (this.i = 0; this.i < this.orgNamelist.length; this.i++) {
          this.orgnames=this.orgNamelist;
      //}
      this.appService.orgNamesMenu(this.orgnames);
      this.dialogService.addDialog(ConfirmorgComponent, {
          title: 'Confirmation',
          message: '' + this.orgnames + ''
      });
      this.editorg = true;
      if(this.vc != undefined){
         this.vc.nativeElement.focus();
      }
  }

  onFocusOut(){
    this.editorg = false;
  }
  public slideMenu() {
    this.appService.menuSlider = (this.appService.menuSlider)? false: true;
  }

  ngDoCheck() {

      this.applicationViewMode = this.appService.applicationViewMode;
      this.immigrationManager = this.appService.user.roleName;
      if (this.appService.getorgMenu != undefined) {
          this.appService.selectedOrg = this.appService.getorgMenu.orgName;
          this.appService.orgId = this.appService.getorgMenu.orgId;
          if (this.appService.getorgMenu.orgType == "Delegated") {
              this.delegatedOrg = true;
          }
          else {
              this.delegatedOrg = false;
          }
      }
  }
  logOut() {
      this.appService.destroy();
      this.appService.moveToPage('');
  }
}
