import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerMaterialModule } from './manager-material.module';
import { ManagerDashboardComponent } from './pages/manager-dashboard/manager-dashboard.component';
import { StaffAttendanceComponent } from './components/staff-attendance/staff-attendance.component';
import { StaffRosterComponent } from './components/staff-roster/staff-roster.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    ManagerDashboardComponent,
    StaffAttendanceComponent,
    StaffRosterComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ManagerMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule
  ]
})
export class ManagerModule { }
