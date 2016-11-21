import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpinnerBlockComponent, SpinnerPageComponent } from './spinners/spinners.component';
import { FocusInputDirective } from './directives/focus-input.directive';

// import { NavBarComponent, SidebarComponent, FooterComponent } from './partials/';

@NgModule({
	imports: [CommonModule, RouterModule],
	declarations: [
		SpinnerBlockComponent, SpinnerPageComponent, /* NavBarComponent, SidebarComponent, FooterComponent, */
		FocusInputDirective,
	],
	exports: [
		SpinnerBlockComponent, SpinnerPageComponent, /* NavBarComponent, SidebarComponent, FooterComponent, */
		FocusInputDirective
	]
})
export class SharedModule {}