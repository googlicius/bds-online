import { Component } from '@angular/core';
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

    constructor(translate: TranslateService)
    {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang(APP_LOCAL_CONFIGS.LANG);

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(APP_LOCAL_CONFIGS.LANG);
    }
}
