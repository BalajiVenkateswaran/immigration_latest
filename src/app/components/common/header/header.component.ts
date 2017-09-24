import { User } from '../../../models/user';
import { AppService } from '../../../services/app.service';
import { ConfirmorgComponent } from '../../framework/confirmbox/confirmorg.component';
import {Component, OnInit, DoCheck, ViewChild, AfterViewChecked} from '@angular/core';
import {Router} from "@angular/router";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService,DialogComponent} from "ng2-bootstrap-modal";
import {MenuComponent} from "../menu/menu.component";
import { HeaderService } from './header.service';
import {HeaderComponentService} from "./header.component.service";
export interface ConfirmModel {
    title: string;
    message: string;
    header:boolean;
    usageSummaryPopup: boolean;

}
@Component({
    selector: 'immp-header',
    templateUrl: 'header.component.html',
})
export class HeaderComponent extends DialogComponent<ConfirmModel, boolean> implements AfterViewChecked {
  applicationViewMode;
  private Immigrant;
  private immigrationManager;
  private orgNamevisible;
  private editorg;
  private tab;
  private i;
  public user: User;
  public orgnames: any = {};
  public header:boolean=true;
  public usageSummaryPopup:boolean=false;
  @ViewChild('orgSelect') vc;

  public ngAfterViewChecked():void {
    if(this.vc != undefined){
      this.vc.nativeElement.focus();
    }
  }

  highlightTab(tab) {
      this.headerService.currentTab = tab;
  }
  highlightSBLink(sblink) {
      this.appService.currentSBLink = sblink;
  }
  checkForCurrentTab(tab){
    return this.headerService.currentTab == tab;
  }
  constructor(private router: Router, public appService: AppService, public dialogService: DialogService, public headerService: HeaderService, public headerComponentService: HeaderComponentService) {
    super(dialogService);
    this.headerComponentService.onHeaderPageLoad();
    if(this.headerService.user != null){
      this.user = this.headerService.user;
    }
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
      this.immigrationManager = this.headerService.user.roleName;
  }
  logOut() {
      this.headerService.logOut();
  }
  onUsageSummaryClick(){
    this.headerComponentService.getUsageSummaryDetails(this.user.accountId).subscribe(
      res=>{
        this.headerComponentService.usageSummaryDetails=res;
      }
    )
    this.dialogService.addDialog(HeaderComponent,{
      title:'Account Usage Summary',
      usageSummaryPopup:true,
      header:false
    });
  }

  onLogoClick(){
    if(this.appService.applicationViewMode == 'Immigration'){
      this.appService.moveToPage('petitions');
      this.highlightTab('petitions');
    } else if(this.appService.applicationViewMode == 'Client'){
      this.appService.moveToPage('clientview-petitions');
      this.highlightTab('clientview-petitions');
    }
  }
}
