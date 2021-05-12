import { Component, OnInit } from '@angular/core';
import { YelpBackendService } from '../services/YelpBackendService';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {UserService} from '../services/UserService';
import {ReviewService} from '../services/ReviewService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  restaurants;
  details;
  term;
  city = 'Bos';
  cityHeader = '';
  errorFlag;
  loginFlag;
  user;
  following = [];
  options;

  constructor(private router: Router, private userService: UserService, private reviewService: ReviewService, private service: YelpBackendService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadUrlParams(params['term'], params['loc']))
    this.errorFlag = false;
    this.loginFlag=false;
    this.term = '';
    this.options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  }
  ngOnInit() {
    this.searchByLocation(this.term, this.city);
  }

  loadUrlParams(term, city) {
    this.term = term;
    this.city = city;
    this.cityHeader = city;
  }

  search(term, loc) {
    if (!loc || loc === '') {
      this.errorFlag = true;
      return;
    }
    this.searchByLocation(term, loc);
    this.router.navigate(['/home/term/' + term + '/location/' + loc]);
  }


  searchByLocation(term, loc) {
    // this.router.navigate(['/home/search'], { queryParams: { t: term } });
    if (!loc || loc === '') {
      this.errorFlag = true;
      return;
    }
    this.term = term;
    this.city = loc;
    if (term === '' || term === undefined) {
      this.service.findAllRestaurants(loc.split(' ').join('+')).then(res => {
        this.restaurants = res;
        this.router.navigate(['/home/term/' + term + '/location/' + loc]);
      }).then(res => {
        this.cityHeader = res[0].location.city}
      );
    } else {
      this.service.findRestaurantByNameAndLocation(term, loc.split(' ').join('+')).then(res => {
        this.router.navigate(['/home/term/' + term + '/location/' + loc]);
        this.restaurants = res
      }).then(res =>
      {
        this.cityHeader = res[0].location.city;
        this.router.navigate(['/home/term/' + term + '/location/' + loc]);
      });
    }
  }


}
