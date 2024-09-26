import { Injectable } from '@angular/core';
import { AttendanceI, StaffI, TableSchemaI } from '../interfaces/staff.interface';
import { ELEMENT_DATA_STAFF_ROSTER, STAFF_ATTENDANCE, STAFF_DIRECTORY, TABLE_SCHEMA_ROSTER } from './data.json';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
    staff_directory: StaffI[] = STAFF_DIRECTORY;
    staff_attendance: AttendanceI[] = STAFF_ATTENDANCE;
    staff_roster =  ELEMENT_DATA_STAFF_ROSTER;
    column_structure = TABLE_SCHEMA_ROSTER
    loggedIn$ = new Subject<boolean>();

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

  getAllRosterData(): any {
    return this.staff_roster;
  }

  getColumnStructure(): TableSchemaI[]{
    return this.column_structure;
  }

  getStaffDirectory(): Array<any> {
    return this.staff_directory;
  }
}
