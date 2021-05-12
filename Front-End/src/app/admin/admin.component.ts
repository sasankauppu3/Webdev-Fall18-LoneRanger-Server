import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/UserService';
import {ReviewService} from '../services/ReviewService';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users;
  r;

  constructor(private userService: UserService, private reviewService: ReviewService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.findAllUsers().then(res => {
      this.users = res;
    }).catch(e => console.log('Unable to get users'));
  }

  deleteUser(userId) {
    this.r = confirm('Delete user ' + userId + '?');
    if (this.r) {
      this.userService.deleteUser(userId).then(res => this.ngOnInit()).catch(e => alert('Unable to delete User'));
    }
  }

  changeUserRole(userId, currentRole){
    let newRole = ''
    if (currentRole === 'influencer'){
        newRole = 'generic';
    } else {
        newRole = 'influencer';
      }
    this.userService.setUserRole(userId, newRole).then(r => this.ngOnInit());
  }

  approveRequest(userId){
    this.r = confirm('Approve user ' + userId + ' as Influencer?');
    if (this.r) {
      this.userService.approveRequest(userId).then(r => this.ngOnInit()).catch(e => alert('Unable to approve User'));
    }
  }

}
