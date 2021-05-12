import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
import {YelpBackendService} from './services/YelpBackendService';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {UserService} from './services/UserService';
import { ProfileComponent } from './profile/profile.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { RestaurantReviewsComponent } from './restaurant-reviews/restaurant-reviews.component';
import {ReviewService} from './services/ReviewService';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    RestaurantSearchComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    RestaurantDetailsComponent,
    RestaurantReviewsComponent,
    PublicProfileComponent,
    HomeComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    YelpBackendService,
    UserService,
    ReviewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
