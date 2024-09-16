import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WebcamModule} from 'ngx-webcam';
import { StaffRoutingModule } from './staff-routing.module';
import { MarkAttendanceComponent } from './components/mark-attendance/mark-attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffDashboardComponent } from './pages/staff-dashboard/staff-dashboard.component';
import { StaffMaterialModule } from './staff-material.module';
import { MyRosterComponent } from './components/my-roster/my-roster.component';
import { FlexLayoutModule } from "@angular/flex-layout";


@NgModule({
  declarations: [MarkAttendanceComponent, StaffDashboardComponent, MyRosterComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    WebcamModule,
    FormsModule,
    ReactiveFormsModule,
    StaffMaterialModule,
    FlexLayoutModule
  ]
})
export class StaffModule { }
