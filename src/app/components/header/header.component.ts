import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserLogged: boolean;
  user: string;
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isUserLogged = this.authenticationService.isUserLoggedIn();
    this.user = this.authenticationService.getUser();
  }

  logout(): void {
    this.authenticationService.logOut();
    this.isUserLogged = false;
    this.router.navigateByUrl('login');
  }
}
