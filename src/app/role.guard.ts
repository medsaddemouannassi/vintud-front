import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
    this.authenticationService.isUserLoggedIn();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authorized = this.authenticationService.getRoles().includes(route.data.role);
    if (!authorized) {
      this.router.navigateByUrl('');
    }
    return authorized;
  }
  
}
