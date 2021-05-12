import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/UserService';
import {ReviewService} from '../services/ReviewService';
import {ActivatedRoute} from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  user;
  userReviews;
  options;
  followers;
  following;
  isfollowed;
  currentUser;
  loginFlag;
  allUsers;
  constructor(private userService: UserService, private route: ActivatedRoute, private reviewService: ReviewService) {
    this.route.params.subscribe(params => this.loadUser(params['pid']));
    this.isfollowed = false;
  }

  loadUser(uid) {
    this.followers = [];
    this.following = [];
    this.userService.findAllUsers().then(res => {
      this.allUsers = res;
      this.userService.findUserProfile(uid).then(res => {
        this.user = res;
        this.reviewService.findAllReviewsForUser(this.user.username).then(res => {
          this.userReviews = res;
          this.options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
          for (let i = 0; i < this.userReviews.length; i++) {
            this.userReviews[i].cdate = new Date(this.userReviews[i].created).toLocaleDateString("en-US", this.options);
          }
          for (let i = 0; this.user.followers.length > i; i += 1) {
            if (this.user.followers[i] === this.currentUser._id) {
              this.isfollowed = true;
            }
          }
          for (let i = 0; i < this.allUsers.length; i++){
              if (this.user.followers.indexOf(this.allUsers[i]._id) > -1){
                this.followers.push(this.allUsers[i]);
              }
            if (this.user.following.indexOf(this.allUsers[i]._id) > -1){
              this.following.push(this.allUsers[i]);
            }
          }
          console.log(this.user.followers);

        });
      });
    });
  }

  sessionCheck() {
    this.userService.findLoggedUser().then((user) => {
      if (user != null) {
        this.currentUser=user;
        this.loginFlag = true;
      }

    });

  }

  ngOnInit() {
    this.sessionCheck();
  }

  followUser(user) {
    this.userService.followUser(user._id, this.currentUser._id).then(r => {
      this.isfollowed = !this.isfollowed;
      this.loadUser(this.user._id);
    });
  }

  UnfollowUser(user) {
    this.userService.unfollowUser(user._id, this.currentUser._id).then(r => {
      console.log(r)
      this.isfollowed = !this.isfollowed;
      this.loadUser(this.user._id);
    });
  }


}
