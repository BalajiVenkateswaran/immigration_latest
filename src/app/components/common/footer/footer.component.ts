import {Component} from '@angular/core';
import {AppService} from "../../../services/app.service";


@Component({
  selector: 'component-footer',
  templateUrl: 'footer.component.html'
})
export class FooterComponent {

  constructor(public appService: AppService) {
  }
}
