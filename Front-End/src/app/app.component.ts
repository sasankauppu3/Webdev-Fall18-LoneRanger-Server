import { Component } from '@angular/core';
import {UserService} from './services/UserService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Webdev-Fall18-LoneRanger-Client';

  user;

  constructor(private userService: UserService, private router: Router) {
  }

  sessionCheck() {
    this.userService.findLoggedUser().then((user) => this.user = user);
  }

  logout() {
    this.userService.logout().then(() => this.router.navigate(['*']))
      .then(() => {
        this.sessionCheck();
        window.location.reload();
      });
  }
}
