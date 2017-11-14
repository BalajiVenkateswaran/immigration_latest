import { User } from '../../../models/user';
import { AppService } from '../../../services/app.service';
import { ConfirmorgComponent } from '../../framework/confirmbox/confirmorg.component';
import {Component, OnInit, ViewChild, AfterViewChecked} from '@angular/core';
import {Router} from '@angular/router';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DialogService, DialogComponent} from 'ng2-bootstrap-modal';
import { HeaderService } from './header.service';
import {HeaderComponentService} from './header.component.service';
import {ApplicationRoles} from '../constants/applicationroles.constants';
export interface ConfirmModel {
    title: string;
    message: string;
    header: boolean;
    usageSummaryPopup: boolean;
}
@Component({
    selector: 'immp-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit, AfterViewChecked {
  public applicationRoles = ApplicationRoles;
  private Immigrant;
  private orgNamevisible;
  private editorg;
  private tab;
  private i;
  public user: User;
  usageSummery = false;
  public orgnames: any = {};
  public header= true;
  public usageSummaryPopup= false;
  @ViewChild('orgSelect') vc;

  public ngAfterViewChecked(): void {
    if (this.vc !== undefined) {
      this.vc.nativeElement.focus();
    }
  }

  highlightTab(tab) {
      this.headerService.currentTab = tab;
  }
  highlightSBLink(sblink) {
      this.appService.currentSBLink = sblink;
  }
  checkForCurrentTab(tab) {
    return this.headerService.currentTab === tab;
  }
  constructor(private router: Router, public appService: AppService, public dialogService: DialogService,
              public headerService: HeaderService, public headerComponentService: HeaderComponentService) {
    super(dialogService);
  }

  ngOnInit() {
    if (this.headerService.user != null) {
      this.user = this.headerService.user;
    }
    let moveToPage = this.headerService.getLandingPagePath(this.user.roleName)
    this.headerComponentService.onHeaderPageLoad(moveToPage);
    this.highlightTab(moveToPage);

   
    
  }

  editorgname() {
      this.dialogService.addDialog(ConfirmorgComponent, {
          title: 'Confirmation',
          message: '' + this.headerService.organizations + ''
      });
      this.editorg = true;
      if (this.vc !== undefined) {
         this.vc.nativeElement.focus();
      }
  }

  onFocusOut() {
    this.editorg = false;
  }
  public slideMenu() {
    this.appService.menuSlider = (this.appService.menuSlider) ? false : true;
  }

  logOut() {
      this.headerService.logOut();
  }
  onUsageSummaryClick() {
      this.usageSummery = true;

    this.headerComponentService.getUsageSummaryDetails(this.user.accountId).subscribe(
      res => {
          this.headerComponentService.usageSummaryDetails = res;

          //to test the grediant progress and this need to remove 
          this.headerComponentService.usageSummaryDetails.usersUsed = 500;
          this.headerComponentService.usageSummaryDetails.orgUsed = 756;
          this.headerComponentService.usageSummaryDetails.clientsUsed = 368;
          this.headerComponentService.usageSummaryDetails.petitionsUsed = 5500;
      }
      )
  }
  onUsageSummaryClose() {
      this.usageSummery = false;
  }
  onLogoClick() {
    let moveToPage = this.headerService.getLandingPagePath(this.headerService.user.roleName);
    this.appService.moveToPage(moveToPage);
    this.highlightTab(moveToPage);
  }
}
