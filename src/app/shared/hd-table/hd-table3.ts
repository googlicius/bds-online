import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { HdTable2 } from './hd-table2';
import { HdTableService } from './hd-table.service';
import { Table } from './interfaces';

@Component({
    selector: 'hd-table3',
    templateUrl: './hd-table3.html',
})
export class HdTable3 extends HdTable2{
    @Input('table') table: Table;

    constructor(sanitizer: DomSanitizer, ngbPaginationConfig: NgbPaginationConfig, hdTableService: HdTableService) {
        super(sanitizer, ngbPaginationConfig, hdTableService);
    }

    private setDropDownDisabled(){
        return this.getCheckedList().length == 0 ? true : false;
    }
}