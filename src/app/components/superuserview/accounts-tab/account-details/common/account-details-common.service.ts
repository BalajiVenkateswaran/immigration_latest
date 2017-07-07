import {Injectable} from "@angular/core";

@Injectable()
export class AccountDetailsCommonService {

  private _accountId : string;

  get accountId(): string {
      return this._accountId;
  }

  set accountId(_accountId: string) {
      this._accountId = _accountId;
  }



  public destroy(){
    this._accountId = null;
  }
}
