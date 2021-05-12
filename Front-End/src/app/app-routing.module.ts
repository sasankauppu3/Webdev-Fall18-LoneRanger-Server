import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RestaurantSearchComponent} from './restaurant-search/restaurant-search.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {RestaurantDetailsComponent} from './restaurant-details/restaurant-details.component';
import {PublicProfileComponent} from './public-profile/public-profile.component';
import {HomeComponent} from './home/home.component';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '*', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: RestaurantSearchComponent},
  {path: 'home/term/:term/location/:loc', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'admin/users', component: AdminComponent},
  {path: 'profile/:pid', component: PublicProfileComponent},
  {path: 'details/id/:id/name/:name/lat/:lat/lng/:lng', component: RestaurantDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
