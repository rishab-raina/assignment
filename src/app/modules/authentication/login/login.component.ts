import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StaffI } from 'src/app/interfaces/staff.interface';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  staffDirectory;
  loginForm: FormGroup;
  roles = ['Manager', 'Staff']; // Define roles

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private assignmentService: AssignmentService,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.staffDirectory = this.assignmentService.getStaffDirectory();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Login Successful', formData);

      localStorage.setItem('user_id', formData?.username);
      // Based on role, navigate to different routes
      if (formData.role === 'Manager') {
        // Logic for manager
        console.log('Redirect to Manager Dashboard');
        if (
          this.authenticate(formData.username, formData.password, formData.role)
        ) {
          this.assignmentService.loggedIn$.next(true);
          this.router.navigate(['./manager'], { replaceUrl: true });
        } else {
          const msg = `Invalid Credentials!`;
          const action = 'Dismiss';
          this.openSnackBar(msg);
        }
      } else if (formData.role === 'Staff') {
        // Logic for staff
        console.log('Redirect to Staff Dashboard');
        if (
          this.authenticate(formData.username, formData.password, formData.role)
        ) {
          this.assignmentService.loggedIn$.next(true);
          this.router.navigate(['./staff']);
        } else {
          const msg = `Invalid Credentials!`;
          const action = 'Dismiss';
          this.openSnackBar(msg);
        }
      }
    }
  }

  authenticate(user_id: string, password: string, role: string): StaffI {
    return this.staffDirectory?.find(
      (usr) =>
        usr.id === user_id && password === usr.password && usr.role === role
    );
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 2000, // Snackbar will disappear after 2000ms
      verticalPosition: 'bottom', // 'top' or 'bottom'
      horizontalPosition: 'center', // 'start', 'center', 'end', 'left', 'right'
    });
  }
}
