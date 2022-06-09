import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  addLoginForm: FormGroup;
  user: any = {};
  accessToken: string;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.addLoginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  login(): void {
    this.authenticationService.login(this.user).subscribe((data) => {
      this.authenticationService.isUserLoggedIn();
      this.authenticationService.getUser();
      this.authenticationService.getRoles();
    });
  }
}
