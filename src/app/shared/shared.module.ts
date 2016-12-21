import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from 'ng2-translate';
import { SpinnerBlockComponent, SpinnerPageComponent } from './spinners/spinners.component';
import { HdTable } from './hd-table';
import { FocusInputDirective } from './directives/focus-input.directive';

// import { NavBarComponent, SidebarComponent, FooterComponent } from './partials/';
// LDksajd
@NgModule({
	imports: [CommonModule, RouterModule, TranslateModule, NgbModule],
	declarations: [
		SpinnerBlockComponent, SpinnerPageComponent, HdTable, /* NavBarComponent, SidebarComponent, FooterComponent, */
		FocusInputDirective,
	],
	exports: [
		CommonModule, TranslateModule,
		SpinnerBlockComponent, SpinnerPageComponent, HdTable, /* NavBarComponent, SidebarComponent, FooterComponent, */
		FocusInputDirective
	]
})
export class SharedModule {}