import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import {User} from "../../models/user";
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-manageaccount-user-details',
  templateUrl: './manageaccount-user-details.component.html',
  styleUrls: ['./manageaccount-user-details.component.sass']
})
export class ManageaccountUserDetailsComponent implements OnInit {
  private user: User;
  public userList:any;
  public orgList:any={};
  public isUserEdit:boolean=true;
  constructor( private appService: AppService,
        private route: ActivatedRoute) {
           if (this.appService.user) {
            this.user = this.appService.user;
            this.orgList=this.appService.organizations;
        }
  }

  ngOnInit() {
    this.route.params.subscribe((res)=>{
      this.userList=res;
    })
  }

}
