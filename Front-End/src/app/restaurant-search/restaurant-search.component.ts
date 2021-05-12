import { Component, OnInit } from '@angular/core';
import { YelpBackendService } from '../services/YelpBackendService';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {UserService} from '../services/UserService';
import {ReviewService} from '../services/ReviewService';

@Component({
  selector: 'app-restaurant-search',
  templateUrl: './restaurant-search.component.html',
  styleUrls: ['./restaurant-search.component.css']
})
export class RestaurantSearchComponent implements OnInit {

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

  constructor(private userService: UserService, private reviewService: ReviewService, private service: YelpBackendService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.errorFlag = false;
    this.loginFlag=false;
    this.term = '';
    this.options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  }


  ngOnInit() {
    // this.searchByLocation("nyc")
    //   this.term = this.activatedRoute.snapshot.queryParams["t"];
    //   this.city = this.activatedRoute.snapshot.queryParams["loc"];
    //   if (this.city !== undefined && this.term !== un)
    // }
    this.sessionCheck();
  }


  sessionCheck() {
    this.userService.findLoggedUser().then((user) => {
      if (user != null) {
        this.user=user;
        this.loginFlag = true;
        this.reviewService.findAllReviewsForList(this.user._id).then(res => {
          this.following = res;
          if (this.following.length > 0) {
            for (let i = 0; i < this.following.length; i++) {
              this.following[i].cdate = new Date(this.following[i].created).toLocaleDateString("en-US", this.options);
            }
          }
        });
      }

    });
  }

  search(term, loc) {
    if (!loc || loc === '') {
      this.errorFlag = true;
      return;
    }
    this.router.navigate(['/home/term/' + term + '/location/' + loc]);
  }

}
