import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/share';

@Injectable()
export class SpinnerService{
	public status: Subject<any> = new Subject<any>();
	private _active: boolean = false;
	private _message: string;

	public get message(): string{
		return this._message;
	}

	public set message(val: string){
		this._message = val;
	}

	public get active(): boolean{
		return this._active;
	}

	public set active(val: boolean){
		this._active = val;
		this.status.next({active: val, message: this.message});
	}

	public start(message?: string): void{
		this.message = message;
		this.active = true;
	}

	public stop(): void {
		this.active = false;
		this.message = '';
	}
}