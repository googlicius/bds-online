import { Component } from '@angular/core';
import { SpinnerService } from './shared';

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
    title = 'app works!';
}
