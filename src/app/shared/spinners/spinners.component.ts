import { Component, Input,  } from '@angular/core'
import { SpinnerService } from './spinner.service';

// NOTE: Spinner components below also use global style of Metronic theme, so make sure you have component.min.css in the index.html or somewhere

@Component({
	selector: 'app-spinner-block',
	template: `
		<div class="block-spinner-bar">
			<div class="bounce1"></div>
			<div class="bounce2"></div>
			<div class="bounce3"></div>
		</div>
	`,
	styles: [`
		.block-spinner-bar {
			width: 50px;
		}
		.block-spinner-bar > div{
			width: 8px;
			height: 8px;
		}
	`]
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
	styles: [`
		.page-spinner-bar {
			background: #fff;
			padding: 10px 10px;
			width:300px;
			left: 45%;
			background: -moz-linear-gradient(left, rgba(255,255,255,0.11) 0%, rgba(255,255,255,1) 24%, rgba(255,255,255,1) 77%, rgba(255,255,255,0.11) 100%);
			background: -webkit-gradient(left top, right top, color-stop(0%, rgba(255,255,255,0.11)), color-stop(24%, rgba(255,255,255,1)), color-stop(77%, rgba(255,255,255,1)), color-stop(100%, rgba(255,255,255,0.11)));
			background: -webkit-linear-gradient(left, rgba(255,255,255,0.11) 0%, rgba(255,255,255,1) 24%, rgba(255,255,255,1) 77%, rgba(255,255,255,0.11) 100%);
			background: -o-linear-gradient(left, rgba(255,255,255,0.11) 0%, rgba(255,255,255,1) 24%, rgba(255,255,255,1) 77%, rgba(255,255,255,0.11) 100%);
			background: -ms-linear-gradient(left, rgba(255,255,255,0.11) 0%, rgba(255,255,255,1) 24%, rgba(255,255,255,1) 77%, rgba(255,255,255,0.11) 100%);
			background: linear-gradient(to right, rgba(255,255,255,0.11) 0%, rgba(255,255,255,1) 24%, rgba(255,255,255,1) 77%, rgba(255,255,255,0.11) 100%);
			filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff', GradientType=1 );
		}
		h5{
			color: #666;
		}
	`],
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