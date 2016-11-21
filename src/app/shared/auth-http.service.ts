import { Injectable } from '@angular/core';
import { RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';
import { AuthHttp as Http } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { APP_LOCAL_CONFIGS } from '../app.local-configs';
import { urlEncode } from '../shared';

@Injectable()
export class AuthHttp {

	constructor(private http: Http){}

	public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
		return this.http.get(APP_LOCAL_CONFIGS.API_URL + url,options);
	}

	public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		return this.http.post(APP_LOCAL_CONFIGS.API_URL + url,urlEncode(body),options);
	}

	public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		return this.http.put(APP_LOCAL_CONFIGS.API_URL + url,urlEncode(body),options);
	}

	public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
		return this.http.post(APP_LOCAL_CONFIGS.API_URL + url,options);
	}

	public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		return this.http.post(APP_LOCAL_CONFIGS.API_URL + url,urlEncode(body),options);
	}

	public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
		return this.http.post(APP_LOCAL_CONFIGS.API_URL + url,options);
	}

	public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
		return this.http.post(APP_LOCAL_CONFIGS.API_URL + url,options);
	}
}