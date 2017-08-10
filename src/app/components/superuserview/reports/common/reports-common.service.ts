import {Injectable} from "@angular/core";

@Injectable()
export class ReportsCommonService {

  
    private _totalaccounts: any;

 
    get totalAccounts(): any {
        return this._totalaccounts;
    }
    set totalAccounts(_totalaccounts: any) {
        this._totalaccounts = _totalaccounts;
    }

    public destroy() {
        this._totalaccounts = null;
      
    }
}
