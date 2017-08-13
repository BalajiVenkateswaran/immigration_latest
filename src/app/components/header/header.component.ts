import {Component, OnInit, DoCheck, ViewChild, AfterViewChecked} from '@angular/core';
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {HeaderService} from "./header.service";

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmorgComponent } from '../framework/confirmbox/confirmorg.component';
import { DialogService } from "ng2-bootstrap-modal";
import {MenuComponent} from "../menu/menu.component";

@Component({
    selector: 'immp-header',
    templateUrl: 'header.component.html',
})
export class HeaderComponent implements AfterViewChecked{
  applicationViewMode;
  user: User;
  private Immigrant;
  private immigrationManager;
  private orgNamevisible;
  private editorg;
  private tab;
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
  constructor(private router: Router, public appService: AppService, private dialogService: DialogService, public headerService: HeaderService) {
    if(this.appService.user) {
      this.user = this.appService.user;
    }
    this.headerService.onHeaderPageLoad();
  }
    
  editorgname() {
      this.dialogService.addDialog(ConfirmorgComponent, {
          title: 'Confirmation',
          message: '' + this.headerService.organizations + ''
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
  }
  logOut() {
      this.appService.destroy();
      this.appService.moveToPage('');
  }
}
