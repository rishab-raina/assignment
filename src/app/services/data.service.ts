import { Validators } from "@angular/forms";
import { AttendanceI, StaffI } from "../interfaces/staff.interface";

export const STAFF_DIRECTORY: Array<StaffI> = [
    {
        name: ' Vikas Sahayak',
        id: 'st_101',
        password: 'abc123',
        role: 'Staff'
    },
    {
        name: 'Abhishek Sachiv',
        id: 'st_102',
        password: 'abc123',
        role: 'Manager'
    },
    {
        name: 'Manju Pradhan',
        id: 'st_103',
        password: 'abc123',
        role: 'Staff'
    }
];

export const STAFF_ATTENDANCE: Array<AttendanceI> = [

];

export const ELEMENT_DATA_staff_type: any[] = [
    {
      staff_id: 'st_101',
      name: STAFF_DIRECTORY.find(s=> s.id === 'st_101').name,
      zone: 1,
      staff_type: 'Permanent',
      shift_type: 'Day',
    },
    {
      staff_id: 'st_102',
      name: STAFF_DIRECTORY.find(s=> s.id === 'st_102').name,
      zone: 4,
      staff_type: 'Permanent',
      shift_type: 'Night',
    },
    {
      staff_id: 'st_103',
      name: STAFF_DIRECTORY.find(s=> s.id === 'st_103').name,
      zone: 6,
      staff_type: 'Permanent',
      shift_type: 'Day',
    }
  ];

  export const selectOptions = ['Day', 'Night'];


//JSON BASED IMPLEMENTATION OF TABLE SCHEMA
// ENTIRELY CONFIGURABLE TO MAKE IT GENERIC CAN BE USED IN ANY SETTING
// EDITABLE FIELDS CAN BE CONFIGURABLE
//TYPE OF INPUT (COLUMN TYPE)CAN ALSO BE CONFIGURED
  export const TABLE_SCHEMA_Roster = [
    {
      label: 'Staff Id',
      isEditable: false,
      dataType: 'text',
      columnId: 'staff_id',
    },
    {
      label: 'Staff Name',
      isEditable: false,
      dataType: 'text',
      columnId: 'name',
    },
    { label: 'Zone', isEditable: true, dataType: 'text', columnId: 'zone' },
    {
      label: 'Staff Type',
      isEditable: true,
      dataType: 'text',
      columnId: 'staff_type',
      validators: [Validators.required, Validators.min(1)],
    },
    {
      label: 'Shift Type',
      isEditable: true,
      dataType: 'select',
      columnId: 'shift_type',
      selectionList: selectOptions,
      validators: [Validators.required, Validators.min(1)],
    },
  ];