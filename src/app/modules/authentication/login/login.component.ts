import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffI } from 'src/app/interfaces/staff.interface';
import { STAFF_DIRECTORY } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  roles = ['Manager', 'Staff']; // Define roles

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Login Successful', formData);
      
      localStorage.setItem("user_id", formData?.username);
      // Based on role, navigate to different routes
      if (formData.role === 'Manager') {
        // Logic for manager
        console.log('Redirect to Manager Dashboard');
        if(this.authenticate(formData.username, formData.password))
        this.router.navigate(['./manager'],{replaceUrl: true})
      } else if (formData.role === 'Staff') {
        // Logic for staff
        console.log('Redirect to Staff Dashboard');
        if(this.authenticate(formData.username, formData.password))
        this.router.navigate(['./staff'])       
      }
    }
  }

  authenticate(user_id: string, password: string): StaffI {
  return STAFF_DIRECTORY?.find(usr => usr.id === user_id)
  }

}
