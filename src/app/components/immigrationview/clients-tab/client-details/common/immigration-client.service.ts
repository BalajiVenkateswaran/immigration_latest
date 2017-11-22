import {Injectable} from '@angular/core';

@Injectable()
export class ImmigrationClientCommonService {
  private _userId: string;
  private _clientId: string;

  public destroy(): void {
    this._userId = null;
    this._clientId = null;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get clientId(): string {
    return this._clientId;
  }

  set clientId(value: string) {
    this._clientId = value;
  }
}
