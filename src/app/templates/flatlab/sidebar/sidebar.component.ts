import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var CommonScripts: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        CommonScripts.initCommonScript();
		CommonScripts.initSidebar();
    }

}
