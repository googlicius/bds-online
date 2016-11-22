import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_LOCAL_CONFIGS } from './../../../app.local-configs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    triggerLogout() {
        localStorage.removeItem(APP_LOCAL_CONFIGS.TOKEN_NAME);
        this.router.navigate(['auth/login']);
    }

}
