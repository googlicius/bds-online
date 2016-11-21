import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';

import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		AuthRoutingModule,
		SharedModule
	],
	declarations: [AuthComponent, LoginFormComponent],
})
export class AuthModule { }