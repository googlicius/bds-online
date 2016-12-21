import { Type, Component } from '@angular/core';

export interface Table{
	class_name?: string | Array<string>;
	allow_pagination?: boolean
	columns?: Columns;
	data?: Array<any>;
	collection_size?: number;
	identify?:string;
	// Using pipe, if "true": sorting, paging and filtering will be hanlde on server.
	pipe?: boolean;
	not_have_record_msg?: string;
}

export interface Column {
	title?: string;
	placeholder?: string;
	class_name?: string;
	name?: string;
	display?: string;
	allow_sorting?: boolean;
	allow_filtering?: boolean;
	ui_type?: string;
	ui_fields?: any;
	component?: Type<Component>;
}

export interface _Table{
	display?: TableDisplay;
	query?: TableQuery;
	curent_page?: number,
}

export interface TableDisplay{
	data?: Array<any>;
	collection_size?: number;
	start?: number;
	end?: number;
}

export interface TableQuery {
	paging?: {
		start?: number,
		number_per_page?: number,
	};
	filtering?: Filters;
	sorting?: Sorting;
}

export interface Filter{
	name?: string;
	value?: string;
}

export interface Sorting{
	name?: string;
	reverse?: boolean;
}

export type Columns = Column[];
export type Filters = Filter[];