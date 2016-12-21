import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { APP_LOCAL_CONFIGS } from '../../app.local-configs';
import { urlEncode } from '../../shared';

@Injectable()
export class AuthenticationService {

	constructor(private http: Http) {}

	login(model): Observable<any> {
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this.http.post(APP_LOCAL_CONFIGS.API_URL + '/auth/login', urlEncode(model),{headers:headers})
			.map((response: Response) => {
				// login successful if there's a jwt token in the response
				let login_result = response.json();
				if (login_result.success) {

					// store username and jwt token in local storage to keep user logged in between page refreshes
					localStorage.setItem(APP_LOCAL_CONFIGS.TOKEN_NAME, login_result.token);

					// return true to indicate successful login
					return true;
				} else {
					// return false to indicate failed login
					return false;
				}
			})
			.catch((error: any) => {
				let errMsg = (error.message) ? error.message :
				error.status ? `${error.status} - ${error.statusText}` : 'Server error';
				return Observable.throw(errMsg);
			});
	}
}