import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { SpinnerService } from './../shared';

@Component({
    selector: 'app-bds-article',
    template: `
        <div id="container">
            <app-header></app-header>
            <app-sidebar></app-sidebar>
            <!--main content start-->
            <section id="main-content">
                <section class="wrapper site-min-height">
                    <div class="row">
                        <div class="col-lg-12">
                        <!--breadcrumbs start -->

                        <!--breadcrumbs end -->
                        </div>
                    </div>
                    <router-outlet></router-outlet>
                </section>
            </section>
            <!--main content end-->
            <app-footer></app-footer>
        </div>
        <app-spinner [message]="'Loading...'"></app-spinner>
        <toaster-container></toaster-container>
    `,
    providers: [SpinnerService, ToasterService]
})
export class BdsComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
