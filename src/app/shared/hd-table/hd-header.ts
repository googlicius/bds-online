import { Component } from '@angular/core';

@Component({
    selector: 'hd-header',
    template: `
        <thead>
            <tr role="row">
                <th>
                    <input type="checkbox" [checked]="setDefaultCheckAll()" (change)="triggerCheckAll($event.target.checked)">
                </th>
                <th *ngFor="let column of table.columns"
                    [class.sort]="column.allow_sorting"
                    [class.ascent]="isDefined(_table.query.sorting.name) && column.name == _table.query.sorting.name && !_table.query.sorting.reverse"
                    [class.descent]="isDefined(_table.query.sorting.name) && column.name == _table.query.sorting.name && _table.query.sorting.reverse"
                    (click)="triggerBuildTableSortQuery(column)">
                    {{column.title}}
                </th>
            </tr>
        </thead>
    `,
})
export class HdHeader{

    constructor() {
        
    }

}