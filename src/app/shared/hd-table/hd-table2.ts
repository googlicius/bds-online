import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { HdTable } from './hd-table';
import { HdTableService } from './hd-table.service';
import { Table } from './interfaces';

@Component({
    selector: 'hd-table2',
    templateUrl: './hd-table2.html'
})
export class HdTable2 extends HdTable {
    // Table informations of input
    @Input('table') table: Table;

    private checked_list: Array<any> = [];

    constructor(sanitizer: DomSanitizer, ngbPaginationConfig: NgbPaginationConfig, hdTableService: HdTableService) {
        super(sanitizer, ngbPaginationConfig, hdTableService);
    }

    /**
     * Get checked_list
     * @private
     */
    protected getCheckedList()
    {
        return this.checked_list;
    }

    /**
     * Set row is check/uncheck by push the row to checked_list or remove it.
     * 
     * @private
     * @param {boolean} checked
     * @param {any} row
     * 
     * @memberOf HdTable2
     */
    private triggerChangeCheckList(checked: boolean, row) {
        let existing_item: Array<any> = this.checked_list.filter((item: any) => {
            return item.id == row.id;
        });

        if (checked) {
            this.checked_list.push(row);
        }
        else {
            let index = this.checked_list.indexOf(existing_item[0]);
            this.checked_list.splice(index, 1);
        }
        this.hdTableService.announceCheckListChange(this.checked_list);
    }


    /**
     * Handle adding all displaying rows to checked_list.
     * 
     * @private
     * @param {boolean} checked
     * 
     * @memberOf HdTable2
     */
    private triggerCheckAll(checked: boolean) {
        if (checked) {
            this.getUnderscoreTable().display.data.forEach((item: any) => {
                let existing_item: Array<any> = this.checked_list.filter((item_2: any) => {
                    return item_2.id == item.id;
                });
                if (existing_item.length == 0) {
                    this.checked_list.push(item);
                }
            });
        } else {
            this.getUnderscoreTable().display.data.forEach((item: any) => {
                let existing_item: Array<any> = this.checked_list.filter((item_2: any) => {
                    return item_2.id == item.id;
                });
                if (existing_item.length > 0) {
                    let index = this.checked_list.indexOf(existing_item[0]);
                    this.checked_list.splice(index, 1);
                }
            });
        }
        this.hdTableService.announceCheckListChange(this.checked_list);
    }

    
    /**
     * Set a row is checked or not whenever the row comming display on table
     * 
     * @private
     * @param {any} row
     * @returns
     * 
     * @memberOf HdTable2
     */
    private setDefaultCheckList(row) {
        let existing_item: Array<any> = this.checked_list.filter((item: any) => {
            return item.id == row.id;
        });
        return existing_item.length > 0 ? true : false;
    }


    /**
     * Set checkbox on header is checked if all rows displaying was cheked.
     * 
     * @private
     * @returns
     * 
     * @memberOf HdTable2
     */
    private setDefaultCheckAll() {
        let isCheckAll = true;
        if (this.getUnderscoreTable().display.data.length == 0) {
            return false;
        }
        this.getUnderscoreTable().display.data.some((item: any) => {
            let existing_item: Array<any> = this.checked_list.filter((item_2: any) => {
                return item_2.id == item.id;
            });
            if (existing_item.length == 0) {
                isCheckAll = false;
                return true;
            }
        });
        return isCheckAll;
    }
}