import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffDashboardComponent } from './pages/staff-dashboard/staff-dashboard.component';
import { MarkAttendanceComponent } from './components/mark-attendance/mark-attendance.component';

const routes: Routes = [
  {path: '',
    component: StaffDashboardComponent
  },
  {
    path: 'mark-attendance',
    component: MarkAttendanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
