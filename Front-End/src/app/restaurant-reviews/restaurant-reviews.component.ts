import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/UserService';
import {ReviewService} from '../services/ReviewService';
import {YelpBackendService} from '../services/YelpBackendService';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-restaurant-reviews',
  templateUrl: './restaurant-reviews.component.html',
  styleUrls: ['./restaurant-reviews.component.css']
})
export class RestaurantReviewsComponent implements OnInit {

  loginFlag;
  reviews = [];
  user;
  restaurantid;
  lat;
  lng;
  restaurantname;
  roleflag;
  verifiedReview = [];
  genericReviews = [];
  showReview;
  options;
  review = '';


  constructor(private userService: UserService, private reviewService: ReviewService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadUrlParams(params['id'], params['name'], params['lat'], params['lng']))
    this.loginFlag=false;
    this.roleflag = false;
    this.showReview = false;
  }

  ngOnInit() {
    this.sessionCheck();

    this.reviewService.findAllReviewsForRestaurant(this.restaurantid).then(res => {
      this.reviews = res
      this.options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      for (let i = 0; i < this.reviews.length; i++) {
        this.reviews[i].cdate = new Date(this.reviews[i].created).toLocaleDateString("en-US", this.options)
        console.log(this.reviews[i].userRole)
        if (this.reviews[i].userRole === 'influencer') {
          this.verifiedReview.push(this.reviews[i]);
        } else {
          this.genericReviews.push(this.reviews[i]);
        }
      }
      console.log(this.verifiedReview)
      console.log(this.genericReviews)
    });

  }

  loadUrlParams(id, name, lat, lng){
    this.restaurantid = id
    this.restaurantname = name
    this.lat = lat
    this.lng = lng
  }
  sessionCheck() {
    this.userService.findLoggedUser().then((user) => {
      if (user != null) {
        this.user=user;
        this.loginFlag = true;
      }
    });
  }

  postReview() {

    let reviewModel = {
      username: this.user.username,
      userID: this.user._id,
      review: this.review,
      restaurantID: this.restaurantid,
      restaurantName: this.restaurantname,
      restaurantLat: this.lat,
      restaurantLon: this.lng,
      userRole: this.user.role
    }

    this.reviewService.createReview(reviewModel).then(() => {
      // $('#reviewModal').modal('hide')
      this.review = '';
      this.reviews = []
      this.ngOnInit();
    }
    );

  }

  showReviewText(){
    this.showReview = true;
  }

}

