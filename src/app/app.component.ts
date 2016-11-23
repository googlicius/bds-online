import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, Event as NavigationEvent  } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { SpinnerService } from './shared';
import { APP_LOCAL_CONFIGS } from './app.local-configs';

@Component({
    selector: 'app-root',
    template: `
        <app-spinner [message]="'Loading....'"></app-spinner>
		<router-outlet></router-outlet>
    `,
    styleUrls: ['./app.component.css'],
    providers: [SpinnerService]
})
export class AppComponent {

    constructor(router: Router, spinnerService: SpinnerService, translate: TranslateService)
    {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang(APP_LOCAL_CONFIGS.LANG);

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(APP_LOCAL_CONFIGS.LANG);

        // Display spinner bar whenever route changes
        router.events.subscribe((event: NavigationEvent) => {
			if(event instanceof NavigationStart){
				spinnerService.start();
			}
			else if( event instanceof NavigationEnd ){
				spinnerService.stop();
			}
		})
    }
}
