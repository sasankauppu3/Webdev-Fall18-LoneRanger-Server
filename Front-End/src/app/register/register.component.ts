import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/UserService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  usernameExists;

  constructor(private router: Router, private service: UserService) {
    this.usernameExists = false;
  }


  register(username, password, email, role) {
    let user;

    user = {username, password, email, role:'generic'};
    user.approvedFlag = true;
    if (role === 'influencer'){
      user.approvedFlag = false;
    }
    this.service
      .register(user).then((res) => {
          if (res.status === true) {
              this.router.navigate(['profile']);
              this.usernameExists = false;
            } else {
            this.usernameExists = true;
          }});
  }

  ngOnInit() {
  }
}
