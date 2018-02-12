import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { LoginService } from '../../components/root/login/login.service';

export enum MethodRequest {
    GET, POST
}

interface Request {
    method : MethodRequest;
    url : string;
    params : string;
}

@Injectable()
export class HttpService {

    private _online : boolean = true;
    private _backOnlineEventListener : () => void = null;

    private ipServer : string = 'http://smartfreeze-back.azurewebsites.net';

    constructor(private http : HttpClient, private login : LoginService) { /**/ }

    public request(method : MethodRequest, url : string, params : any) : Observable<any> {
        return Observable.create((observer) => {

            let finalUrl : string = '';
            let httpOptions = {
                headers : {},
                params : {}
            };

            if (url.startsWith('/')) {
                finalUrl = this.ipServer + url;

                httpOptions = {
                    headers: new HttpHeaders({'Content-Type': ['application/json']}),
                    params: {'Context': '' + this.login.getApplicationContext()}
                };
            } else {
                finalUrl = url;
            }

            // Concat all params
            httpOptions.params = Object.assign({}, httpOptions.params, params);

            if (method === MethodRequest.GET) {
                this.http.get(finalUrl, httpOptions).subscribe(
                    data => {
                        console.log('[HTTP] sucess request GET on : ' + finalUrl);
                        console.log(data);
                        this.online = true;
                        observer.next(data);
                    },
                    err => {
                        console.error('[HTTP] error request GET on : ' + finalUrl);
                        console.error(err);
                        this.online = false;
                        observer.error(err);
                    }
                );
            } else if (method === MethodRequest.POST) {
                let body = JSON.stringify(httpOptions.params);
                this.http.post(finalUrl, body, {headers: httpOptions.headers}).subscribe(
                    data => {
                        console.log('[HTTP] sucess request POST on : ' + finalUrl);
                        console.log(data);
                        this.online = true;
                        observer.next(data);
                    },
                    err => {
                        console.error('[HTTP] error request POST on : ' + finalUrl);
                        console.error(err);
                        this.online = false;
                        observer.error(err);
                    }
                );
            }
        });
    }

    public isOnline() : boolean {
        return this._online;
    }

    private get online() : boolean {
        return this._online;
    }

    private set online(online : boolean) {
        if (this._online !== online) {
            this._online = online;

            if (online && this._backOnlineEventListener !== null) {
                this._backOnlineEventListener();
            }
        }
    }

    public set backOnlineEventListener(cb : (() => void)) {
        //this._backOnlineEventListener.push(cb);
        this._backOnlineEventListener = cb;
    }

    public pingServer() : void {
        this.request(MethodRequest.GET, '/api/Ping', {}).subscribe();
    }
}