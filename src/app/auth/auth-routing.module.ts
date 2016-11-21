import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from './components/login-form/login-form.component';


const routes = [
	{path: 'auth', children:[
		{path: 'login',component: LoginFormComponent}
	]}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class AuthRoutingModule {}