import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

interface LoginForm {
	username: string;
	password: string;
	rememberMe: boolean;
}

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-3.min.css','./login-3-custom.css'],
	encapsulation: ViewEncapsulation.None,
	providers: [AuthenticationService],
})
export class LoginFormComponent {

	public loginForm: FormGroup; // our model driven form
	public submitted: boolean; // keep track on whether form is submitted
	public events: any[] = []; // use later to display form changes

	private login_error_msg: string;
	private router: Router;

	// form builder simplify form initialization
	constructor(fb: FormBuilder, router: Router, title: Title, private authenticationService: AuthenticationService)
	{
		title.setTitle("Login");

		this.router = router;

		// we will initialize our form model here
		this.loginForm = fb.group({
			username: ['', [<any>Validators.required]],
			password: ['', [<any>Validators.required]],
			rememberMe: [false]
		});
		this.loginForm.patchValue({
			username: 'admin',
		});
	}

	login(model: LoginForm, isValid: boolean){
		this.submitted = true;
		if(isValid){
			this.authenticationService.login(model).subscribe(result => {
				if(result){
					this.router.navigateByUrl('/article');
				}
				else{
					this.login_error_msg = "Username or password is incorrect";
				}
			});
		}
	}
}