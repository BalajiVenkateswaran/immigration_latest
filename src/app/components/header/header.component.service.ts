import {Injectable} from "@angular/core";
import {AppService} from "../../services/app.service";

@Injectable()
export class Immigrationviewservice {
    private immigrationview: string;
    private _menuSlider: boolean;
    constructor(private appService: AppService) {
    }
    get Immigrant(): string {
        return this.immigrationview;
    }

    set Immigrant(immigrantview: string) {
        this.immigrationview = immigrantview;
    }

    get menuSlider(): boolean {
        return this._menuSlider;
    }

    set menuSlider(menuSlider: boolean) {
        this._menuSlider = menuSlider;
    }

}
