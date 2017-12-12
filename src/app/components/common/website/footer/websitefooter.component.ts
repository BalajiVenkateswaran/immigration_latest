import {AppService} from '../../../../services/app.service';
import {Component} from '@angular/core';

@Component({
  selector: 'ih-website-footer',
  templateUrl: './websitefooter.component.html'
})
export class WebsiteFooterComponent {
  constructor(public appService: AppService) {
  }
}
