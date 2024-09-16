import { Component, OnInit } from '@angular/core';
import { AttendanceI } from 'src/app/interfaces/staff.interface';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-staff-attendance',
  templateUrl: './staff-attendance.component.html',
  styleUrls: ['./staff-attendance.component.scss']
})
export class StaffAttendanceComponent implements OnInit{
  

  attendanceList: Array<AttendanceI> = [];

  constructor(private assignmentService: AssignmentService){

  }

  ngOnInit(): void {
    this.attendanceList = this.assignmentService.getAllStaffAttendance();
    console.log('attendance', this.attendanceList);
  }

}
