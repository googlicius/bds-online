import { Injectable, Inject } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Attribute, Block } from './interfaces';
import { AuthHttp } from './../../shared/auth-http.service';


Injectable()
export class HttpService
{
    // http://blog.thoughtram.io/angular/2015/09/17/resolve-service-dependencies-in-angular-2.html
    constructor(@Inject(AuthHttp) public http: AuthHttp){}

    saveAttribute(attr: Attribute): Observable<any> {
        return this.http.post('/attribute/save-attribute', attr).map((response: Response) => {
            return response.json();
        });
    }

    deleteAttribute(attr_id): Observable<any> {
        return this.http.post('/attribute/delete-attribute', { attr_id: attr_id }).map((response: Response) => {
            return response.json();
        });
    }

    deleteBlock(block_id): Observable<any> {
        return this.http.post('/block/delete-block', { block_id: block_id }).map((response: Response) => {
            return response.json();
        });
    }

    saveBlock(value): Observable<any> {
        return this.http.post('/block/save-block', value).map((response: Response) => {
            return response.json();
        });
    }
}