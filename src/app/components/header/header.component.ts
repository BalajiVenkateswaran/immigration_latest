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
  private selectedOrg: any = {};
  private i;
  public orgnames: any = {};

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

    this.orgNamelist = this.appService.organizations;

    if (this.orgNamelist) {
        this.orgNamevisible = true;
        this.selectedOrg = this.orgNamelist[0];
        this.appService.orgId = this.selectedOrg.orgId;

    }
    else {
        this.orgNamevisible = false;
    }
    this.editorg = false;

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
          this.selectedOrg = this.appService.getorgMenu;
          this.appService.orgId = this.selectedOrg.orgId;
      }


  }
  logOut() {
      this.appService.destroy();
    this.appService.moveToPage('');
    //  this.router.navigate(['login'], { skipLocationChange: false });

  }
}
