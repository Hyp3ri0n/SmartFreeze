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
    private _backOnlineEventListener : ({component : string, cb : () => void})[] = [];

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
                this._backOnlineEventListener.forEach(event => {
                    event.cb();
                });
            } else {
                // TODO : timer send ping if offline
            }
        }
    }

    public set backOnlineEventListener(event : ({component : string, cb : () => void})) {
        let alreadyExists : boolean = false;
        // If an event already exist on
        this._backOnlineEventListener.forEach(listener => {
            if (listener.component === event.component) {
                alreadyExists = true;
                return;
            }
        });
        if (!alreadyExists) {
            this._backOnlineEventListener.push(event);
            console.log('[HTTP] event listener added : ', this._backOnlineEventListener);
        }
    }

    public removeBackOnlineListener(component : string) :void {
        for (let i = 0; i <= this._backOnlineEventListener.length ; i++) {
            if (this._backOnlineEventListener[i].component === component) {
                this._backOnlineEventListener.splice(i, 1);
                console.log('[HTTP] event listener removed : ', this._backOnlineEventListener);
                return;
            }
        }
    }

    public pingServer() : void {
        this.request(MethodRequest.GET, '/api/Ping', {}).subscribe();
    }
}