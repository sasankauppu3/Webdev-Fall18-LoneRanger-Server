import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/UserService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;
  username = '';
  password = '';
  firstName = '';
  lastName =  '';
  email = '';
  phone = '';
  updateFlag;

  constructor(private userService: UserService) {
    this.updateFlag = false;
  }

  update() {
    const updateduser = {
      'username': this.username,
      'firstName': this.firstName,
      'lastName': this.lastName,
      'email': this.email,
      'phone': this.phone
    };

    this.userService.updateUserProfile(updateduser)
      .then(() => {
        this.updateFlag = true;
      });
  }

  ngOnInit() {
    this.userService.findLoggedUser()
      .then((user) => {
        this.user = user;
        if (user !== null ) {
          this.username = user['username'];
          this.password = user['password'];
          this.firstName = user['firstName'];
          this.lastName = user['lastName'];
          this.email = user['email'];
          this.phone = user['phone'];
        } else {
          console.log('User : null');
        }
      });

  }


}
