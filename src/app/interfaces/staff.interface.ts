import { ValidatorFn } from "@angular/forms";

export interface StaffI {
    name: string;
    id: string;
    designation?: string;
    phone?: string;
    password?: string;

}

export interface AttendanceI {
 
    attendanceId: string;
    user: StaffI;
    timestamp: string;
    image: any
}

export interface Type1TableSchemaI {
    label: string;
    isEditable: boolean;
    dataType?: string; // THIS HAS TO BE USED FOR SPACING THE NUMERIC, TEXT COLUMNS DISTINCTLY
    columnId?: string;
    validators?: ValidatorFn[];
    selectionList?: Array<any>;
  }