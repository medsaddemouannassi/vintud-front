import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isUserLogged: boolean;
  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.isUserLogged = this.authenticationService.isUserLoggedIn();
  }

}
