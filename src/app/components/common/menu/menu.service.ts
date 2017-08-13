import { AppService } from '../../../services/app.service';
import {Injectable} from "@angular/core";

@Injectable()
export class MenuService  {
  private _sideBarMenu: string;
  constructor(private appService: AppService) {
  }
  get sideBarMenu(): string {
    return this._sideBarMenu;
  }

  set sideBarMenu(pageLink: string) {
      this._sideBarMenu = pageLink;
  }

}
