import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
	selector: '[shared-focus-input]',
})

// NOTES: Need improve, this directive not work if the input not appear at page load, another word, it apear when user trigger an event.
export class FocusInputDirective implements AfterViewInit 
{
	constructor(private elem: ElementRef) {}

	ngAfterViewInit(){
		this.elem.nativeElement.focus();
	}
}