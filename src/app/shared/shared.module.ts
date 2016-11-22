import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from 'ng2-translate';
import { SpinnerBlockComponent, SpinnerPageComponent } from './spinners/spinners.component';
import { FocusInputDirective } from './directives/focus-input.directive';

// import { NavBarComponent, SidebarComponent, FooterComponent } from './partials/';

@NgModule({
	imports: [CommonModule, RouterModule, TranslateModule],
	declarations: [
		SpinnerBlockComponent, SpinnerPageComponent, /* NavBarComponent, SidebarComponent, FooterComponent, */
		FocusInputDirective,
	],
	exports: [
		CommonModule, TranslateModule,
		SpinnerBlockComponent, SpinnerPageComponent, /* NavBarComponent, SidebarComponent, FooterComponent, */
		FocusInputDirective
	]
})
export class SharedModule {}