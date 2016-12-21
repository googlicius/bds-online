import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { HdTable } from './hd-table';
import { HdTable2 } from './hd-table2';
import { HdTable3 } from './hd-table3';
import { HdLink } from './hd-link';
import { HdText } from './hd-text';
import { DclWrapper } from './dcl-wrapper';

@NgModule({
	imports: [
		CommonModule,
		NgbPaginationModule,
	],
	declarations: [
		HdTable,
		HdTable2,
		HdTable3,
		HdLink,
		HdText,
		DclWrapper,
	],
	entryComponents: [HdText],
	exports: [HdTable,HdTable2,HdTable3,HdLink,HdText,DclWrapper]
})
export class HdTableModule { }