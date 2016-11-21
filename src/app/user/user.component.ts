import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user',
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
    `,
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
