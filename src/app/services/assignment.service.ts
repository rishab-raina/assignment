import { Injectable } from '@angular/core';
import { AttendanceI, StaffI } from '../interfaces/staff.interface';
import { ELEMENT_DATA_staff_type, STAFF_ATTENDANCE, STAFF_DIRECTORY } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
    staff_directory: StaffI[] = STAFF_DIRECTORY;
    staff_attendance: AttendanceI[] = STAFF_ATTENDANCE;
    staff_roster =  ELEMENT_DATA_staff_type;
  constructor() { 

  }

  addAttendance(attendance: AttendanceI): void {
    this.staff_attendance.push(attendance)
  }

  getAllStaffAttendance(): Array<AttendanceI> {
    return this.staff_attendance;
  }

  getcurrentStaffRoster(staff_Id: string): any {
   
    const sRoster = this.staff_roster.find(sr => sr.staff_id === staff_Id);
    
    return sRoster;
  }

  getUserById(userId: string): StaffI {
     const user =  STAFF_DIRECTORY?.find(staff => staff?.id === userId);
     console.log('calling sattRoster', userId, user)
     return user
  }
}
