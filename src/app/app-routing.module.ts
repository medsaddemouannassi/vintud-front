import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {SignupComponent} from './components/signup/signup.component';
import {AnnouncementsComponent} from './components/announcements/announcements.component';
import {AuthGuard} from './auth.guard';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {RoleGuard} from './role.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'announcements', component: AnnouncementsComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ca'}},
  {path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ca'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
