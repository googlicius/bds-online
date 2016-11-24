import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '@angular/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthHttp } from './../../shared';

@Injectable()
export class BlocksResolver implements Resolve<any>{
	constructor(public http: AuthHttp){}

	getBlocks(): Observable<any>{
		return this.http.get('/block/get-blocks').map((response: Response) => {
			return response.json();
		});
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any{
		return this.getBlocks();
	}
}