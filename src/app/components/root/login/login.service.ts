import { Injectable } from '@angular/core';


export enum ApplicationType {
    AGRICULTURE, REFUGE
}

@Injectable()
export class LoginService {

    public app : ApplicationType = null;

    constructor() { /**/ }

}