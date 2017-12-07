import {RestService} from '../../../../services/rest.service';
import {Injectable} from '@angular/core';

@Injectable()
export class DemoRequestDetailsService {
    constructor(private restService: RestService) {
    }
    public getDemoRequests() {
        return this.restService.getData('/superuser/misc/demo');
    }
    public savedemoRequest(data: any) {
        return this.restService.putData('/superuser/misc/demo', data);
    }
}
