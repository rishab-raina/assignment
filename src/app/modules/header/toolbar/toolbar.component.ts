import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isLoggedIn = false;
  

  constructor(private router: Router, private assignmentService: AssignmentService){
    
  }
  ngOnInit(): void {
    this.assignmentService.loggedIn$.subscribe({
      next: val => {
        this.isLoggedIn = val;
      }
    })
  }
  logout() {
    console.log('Logged out');
    // navigate to the login page on logging out
    localStorage.clear();
    this.isLoggedIn = false;

    this.router.navigate(['./authentication']);

  }
}
