import { ValidatorFn } from "@angular/forms";

export interface StaffI {
    name: string;
    id: string;
    designation?: string;
    phone?: string;
    password?: string;
    role?: string;

}

export interface AttendanceI {
 
    attendanceId: string;
    user: StaffI;
    timestamp: string;
    image: any
}

export interface TableSchemaI {
    label: string;
    isEditable: boolean;
    dataType?: string; 
    columnId?: string;
    validators?: ValidatorFn[];
    selectionList?: Array<any>;
  }