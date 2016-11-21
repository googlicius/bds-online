import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { APP_LOCAL_CONFIGS } from '../../app.local-configs';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

	constructor(private router: Router) { }

	private _canActive(){
		if (tokenNotExpired(APP_LOCAL_CONFIGS.TOKEN_NAME)) {
			// logged in so return true
			return true;
		}

		// not logged in so redirect to login page
		this.router.navigateByUrl('/auth/login');
		return false;
	}

	canActivate() 
	{
		return this._canActive();
	}

	canActivateChild()
	{
		return this._canActive();
	}
}