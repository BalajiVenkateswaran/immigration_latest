import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppService} from "../../../../services/app.service";

@Component({
  selector: 'immigration-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

  private outlet: any = {
    breadcrumbs: null,
    header: 'header',
    message: null,
    carousel: null,
    menu: 'menu',
    footer: 'footer'
  };
  constructor( private router : Router, public appService : AppService) {
  }

  ngOnInit(): void {
    this.appService.showMenu = false;
    this.router.navigate(['', {outlets: this.outlet}], {skipLocationChange: true});
  }

}
