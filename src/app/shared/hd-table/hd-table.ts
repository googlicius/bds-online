import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { Table, _Table, TableDisplay, Filter, Sorting, Column } from './interfaces';
import { HdTableService } from './hd-table.service';
import { HdText } from './hd-text';

@Component({
	selector: 'hd-table',
	templateUrl: './hd-table.html',
})
export class HdTable implements OnInit, OnDestroy
{
	private sanitizer: DomSanitizer;
	private showFilterRow: boolean = false;
	private subscription: Subscription;
	private first_build: boolean = true;

	protected hdTableService: HdTableService;
	private ngbPaginationConfig: NgbPaginationConfig;

	// Table informations of input
	@Input('table') table: Table;

	// Event pipe will fire when table pipe is true, its mean all operations would be handle on server.
	// @Output('pipe') public pipe:EventEmitter<any> = new EventEmitter();

	// Table informations of only this component
	private _table: _Table = {
		display: {
			data: []
		},
		query: {
			filtering: [],
			sorting: {},
			paging: {
				start: 0,
			}
		},
		curent_page: 1,
	};

	constructor(sanitizer: DomSanitizer, ngbPaginationConfig: NgbPaginationConfig, hdTableService: HdTableService) {
		this.sanitizer = sanitizer;
		this.hdTableService = hdTableService;
		this.ngbPaginationConfig = ngbPaginationConfig;

		this.subscription = hdTableService.returnDataAnnounced$.subscribe((result: TableDisplay) => {
			this.buildTableDisplay({data:result.data, collection_size: result.collection_size});
		});
	}

	ngOnInit(){
		this.initTable();
		this.buildTable();
	}

	ngOnDestroy(){
		// Prevent leak-memory:
		// https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#bidirectional-service
		this.subscription.unsubscribe();
	}

	getUnderscoreTable(){
		return this._table;
	}

	private initTable(): void
	{
		this.table.pipe = this.table.pipe || false;
		this.table.allow_pagination = typeof this.table.allow_pagination == 'undefined' ? true : this.table.allow_pagination;

		this._table.query.paging.number_per_page = this.ngbPaginationConfig.pageSize;
		
		this.table.columns.forEach((column: Column) => {

			if(typeof column.allow_sorting == 'undefined'){
				column.allow_sorting = true;
			}

			if(typeof column.allow_filtering == 'undefined'){
				column.allow_filtering = true;
			}

			if(column.allow_filtering && !this.showFilterRow){
				this.showFilterRow = true;
			}

			// column.component = column.component || HdText;

			column.ui_type = column.ui_type || "text";

			column.placeholder = column.placeholder || "Enter some text";
		});
	}

	/**
	 * Build sorting query
	 * 
	 * @private
	 * @param {Column} column
	 * @returns {void}
	 * 
	 * @memberOf HdTable
	 */
	private triggerBuildTableSortQuery(column: Column): void
	{
		if(!column.allow_sorting)
			return;
		
		if(this._table.query.sorting.name != column.name){
			// Change sorting column and set order by desc
			this._table.query.sorting = {name: column.name, reverse: false};
		}
		else if(!this._table.query.sorting.reverse){
			// Set order this column by asc
			this._table.query.sorting.reverse = true;
		}else{
			// Set sorting to this column is default
			this._table.query.sorting = {};
		}

		this.buildTable();
	}


	/**
	 * Build filtering query
	 * 
	 * @private
	 * @param {Column} column
	 * @param {string} value
	 * @returns {void}
	 * 
	 * @memberOf HdTable
	 */
	private triggerBuildTableFilterQuery(column: Column, value: string):void
	{
		if(!column.allow_filtering)
			return;

		let filter_existing = this._table.query.filtering.filter((col: Filter) => {
			return col.name == column.name;
		});

		if(filter_existing.length == 0){
			let new_filter: Filter = {name: column.name, value: value};
			this._table.query.filtering.push(new_filter);
		}else if(value.length > 0){
			filter_existing[0].value = value;
		}else{
			let index = this._table.query.filtering.indexOf(filter_existing[0]);
			this._table.query.filtering.splice(index,1);
		}

		this.buildTable();
	}

	/**
	 * Build paging query
	 * 
	 * @private
	 * 
	 * @memberOf HdTable
	 */
	private triggerBuildTablePagingQuery(){
		this._table.query.paging.start = (this._table.curent_page - 1) * this._table.query.paging.number_per_page;
		this.buildTable();
	}

	// BUID TABLE
	// Build table depend on filtering, sorting and paging query
	private buildTable(){
		if(this.table.pipe && this.first_build){
			this.buildTableDisplay({data: this.table.data,collection_size: this.table.collection_size});
			this.first_build = false;
		}
		else if(this.table.pipe){
			let query = {
				filtering: JSON.stringify(this._table.query.filtering),
				sorting: JSON.stringify(this._table.query.sorting),
				paging: JSON.stringify(this._table.query.paging)
			};
			this.hdTableService.announceRequestData(query);
		}
		else{
			let sorted_records = this.sorterModel(this.filterModel(this.table.data));
			let data_display = this.pagerModel(sorted_records);
			this.buildTableDisplay({data: data_display,collection_size: sorted_records.length});
		}
	}

	/**
	 * Build displaying data for table
	 * 
	 * @private
	 * @param {TableDisplay} table_display
	 * 
	 * @memberOf HdTable
	 */
	private buildTableDisplay(table_display: TableDisplay){
		this._table.display.data = table_display.data;
		this._table.display.collection_size = table_display.collection_size;
		this._table.display.start = this._table.query.paging.start || 0;
		this._table.display.end = this._table.query.paging.number_per_page > -1 ? (this._table.display.start + this._table.query.paging.number_per_page) : this._table.display.data.length;
	}

	/**
	 * Sorting data (only at client)
	 * 
	 * @private
	 * @param {Array<any>} filteredRecords
	 * @returns {Array<any>}
	 * 
	 * @memberOf HdTable
	 */
	private sorterModel(filteredRecords: Array<any>): Array<any>{
		let sortedRecoreds: Array<any> = [...filteredRecords];
		if(!this._table.query.sorting)
			return sortedRecoreds;
		
		// Sorting array of objects by string property value:
		// http://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
		return sortedRecoreds.sort((prev: any, curr: any) => {
			let sorting_name = this._table.query.sorting.name;
			if (prev[sorting_name] > curr[sorting_name]) 
			{
				return this._table.query.sorting.reverse ? -1 : 1;
			} 
			else if (prev[sorting_name] < curr[sorting_name])
			{
				return !this._table.query.sorting.reverse ? -1 : 1;
			}
			return 0;
		});
	}

	/**
	 * Filtering data (Only at client)
	 * 
	 * @private
	 * @param {Array<any>} data
	 * @returns {Array<Column>}
	 * 
	 * @memberOf HdTable
	 */
	private filterModel(data: Array<any>):Array<Column>{
		let filteredRecords: Array<any> = data;

		this.table.columns.forEach((column: Column) => {
			if(column.allow_filtering){
				filteredRecords = filteredRecords.filter((item: any)=>{
					let filter = this._table.query.filtering.filter((filter: Filter) => {
						return filter.name == column.name;
					});
					return filter[0] ? item[column.name].toLowerCase().match(filter[0].value.toLowerCase()) : item[column.name].match('');
				});
			}
		});
		return filteredRecords;
	}

	/**
	 * Paging data (Only at client)
	 * 
	 * @private
	 * @param {Array<any>} sortedRecoreds
	 * @returns {Array<any>}
	 * 
	 * @memberOf HdTable
	 */
	private pagerModel(sortedRecoreds: Array<any>): Array<any>{
		let start = this._table.query.paging.start || 0;
		let end = this._table.query.paging.number_per_page > -1 ? (start + this._table.query.paging.number_per_page) : sortedRecoreds.length;
		return sortedRecoreds.slice(start, end);
	}

	/**
	 * Check value is defined or not to check on the template when can not call directly typeof function belong to window object
	 * 
	 * @private
	 * @param {*} val
	 * @returns {boolean}
	 * 
	 * @memberOf HdTable
	 */
	private isDefined(val: any):boolean
	{
		return typeof val != 'undefined';
	}

	private sanitize(html:string):SafeHtml
	{
		return this.sanitizer.bypassSecurityTrustHtml(html);
	}

	/**
	 * Get data from column given
	 * 
	 * @private
	 * @param {*} row
	 * @param {string} propertyName
	 * @returns {string}
	 * @example getData(row, column.name_display)
	 * 
	 * @memberOf HdTable
	 */
	private getData(row:any, column: Column): string
	{
		let regex = /\{([^}]+)\}/g, display;

		display = column.display.replace(regex, function(match){
			let propertyName = match.substring(1, match.length-1);
			return propertyName.split('.').reduce((prev:any, curr:string)=>prev[curr], row);
		});

		return display != column.display ? display : column.display.split('.').reduce((prev:any, curr:string)=>prev[curr], row);
	}

	/**
	 * Build classes for each column
	 * 
	 * @private
	 * @param {Column} column
	 * @returns {string}
	 * 
	 * @memberOf HdTable
	 */
	private setColumClasses(column: Column): string
	{
        let classes:string = '';

		classes += column.allow_sorting ? 'sort ' : '';
		classes += this.isDefined(this._table.query.sorting.name) && column.name == this._table.query.sorting.name && !this._table.query.sorting.reverse ? 'ascent ' : '';
		classes += this.isDefined(this._table.query.sorting.name) && column.name == this._table.query.sorting.name && this._table.query.sorting.reverse ? 'descent ' : '';
		classes += column.class_name || '';

		return classes;
    }
}