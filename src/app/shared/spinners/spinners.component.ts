import { Component, Input,  } from '@angular/core'
import { SpinnerService } from './spinner.service';

@Component({
	selector: 'app-spinner-block',
	template: `
		<div class="block-spinner-bar">
			<div class="bounce1"></div>
			<div class="bounce2"></div>
			<div class="bounce3"></div>
		</div>
	`,
	styleUrls: ['./spinner.css','./app-spinner-block.component.css']
})
export class SpinnerBlockComponent {
	
}

@Component({
	selector: 'app-spinner',
	template: `
		<div *ngIf="active" class="page-spinner-bar">
			<div class="bounce1"></div>
			<div class="bounce2"></div>
			<div class="bounce3"></div>
			<h5 *ngIf="_message">{{_message}}</h5>
		</div>
	`,
	styleUrls: ['./spinner.css','./app-spinner.component.css'],
})
export class SpinnerPageComponent {
	@Input() message: string;
	active: boolean = false;
	private _message: string;
	
	constructor(spinnerService: SpinnerService){
		spinnerService.status.subscribe((status: any)=>{
			this.active = status.active;
			this._message = status.message || this.message;
		});
	}
}