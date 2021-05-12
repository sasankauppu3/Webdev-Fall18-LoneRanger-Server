import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/UserService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username
  password
  errorlog

  constructor(private router: Router, private userService: UserService) {
    this.errorlog = false;
  }

  login(username, password) {
    this.userService.login(username, password)
      .then((userresp) => {
        if (userresp.status === 'success') {
            this.router.navigate(['home']);
        } else if (userresp.status === 'user does not exists') {
          this.errorlog = true;
        } else {
          this.errorlog = false;
        }});
  }

  ngOnInit() {
  }


}
