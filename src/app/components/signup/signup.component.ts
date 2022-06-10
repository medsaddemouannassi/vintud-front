import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../Validators/mustMatch';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    public showLoading: boolean;
    signupForm: FormGroup;

    constructor(private authenticationService: AuthenticationService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
                firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(17)]],
                lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(17)]],
                pseudo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(17)]],
                email: ['', [Validators.required, Validators.email]],
                phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9_-]{8,8}$')]],
                address: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(55)]],
                role_id: [{role_id: ''}, [Validators.required]],
                password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(27)]],
                confirmPassword: ['']
            },
            {
                validator: MustMatch('password', 'confirmPassword')
            });
    }

    signup(): void {
        this.signupForm.value.role_id = {role_id: this.signupForm.value.role_id};
        this.authenticationService.signup(this.signupForm.value).subscribe(data => {
            console.log(data);
        });
    }
}
