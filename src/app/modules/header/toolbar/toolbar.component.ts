import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private router: Router){}
  logout() {
    console.log('Logged out');
    // navigate to the login page on logging out
    localStorage.clear();
    this.router.navigate(['./authentication']);
  }
}
