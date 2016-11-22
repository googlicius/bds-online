import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'angular2-modal';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { AuthModule } from './auth/';
import { SharedModule } from './shared/';
import { BdsOnlineManageRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';
import { AuthHttp } from './shared/auth-http.service';
import { APP_LOCAL_CONFIGS } from './app.local-configs';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ModalModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
            deps: [Http]
        }),
        BootstrapModalModule,
        BdsOnlineManageRoutingModule,
        AuthModule,
        SharedModule,
        NgbModule.forRoot(),
    ],
    providers: [
        AUTH_PROVIDERS,
        AuthHttp,
        provideAuth({
            tokenName: APP_LOCAL_CONFIGS.TOKEN_NAME,
            globalHeaders: [{ 'Content-Type': 'application/x-www-form-urlencoded' }],
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
