import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {MustMatch} from '../../Validators/mustMatch';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
    public showLoading: boolean;
    editForm: FormGroup;
    userId: string;

    constructor(private authenticationService: AuthenticationService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.userId = this.route.snapshot.paramMap.get('id');
        this.userService.getUserById(this.userId).subscribe(user => {
            this.editForm.patchValue({
                firstName: user.firstName,
                lastName: user.lastName,
                pseudo: user.pseudo,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address,
                role_id: user.role_id.role_id,
                password: '',
                confirmPassword: ''
            });
        });
        this.editForm = this.formBuilder.group({
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

    saveEditUser(): void {
        console.log(this.editForm.value);
    }
}
