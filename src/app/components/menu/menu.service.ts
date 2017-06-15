import {Injectable} from "@angular/core";
import {AppService} from "../../services/app.service";

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
