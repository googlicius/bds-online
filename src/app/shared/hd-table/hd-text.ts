import { Component, Input, Injectable, OnInit } from '@angular/core';
import { Column } from './interfaces';

@Component({
    selector: 'hd-text',
    template: '{{data[column.display]}}',
})
export class HdText implements OnInit{
    @Input() column: Column;
    @Input() data: any;
    constructor(){

    }

    ngOnInit(){
        // console.log(this.data);
    }
}