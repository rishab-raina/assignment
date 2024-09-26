import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import {
  MatTableDataSource,
} from '@angular/material/table';
import { TableSchemaI } from 'src/app/interfaces/staff.interface';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-staff-roster',
  templateUrl: './staff-roster.component.html',
  styleUrls: ['./staff-roster.component.scss'],
})
export class StaffRosterComponent implements OnInit {
  columnStructure: TableSchemaI[] = [];
  tableData; // actual data of table
  displayedColumns!: Array<any>;
  dataSource: any;
  form = this.fb.group({ records: this.fb.array([]) });

  constructor(
    private fb: FormBuilder,
    private assignmentService: AssignmentService
  ) {}

  get records() {
    return this.form.controls['records'] as FormArray;
  }

  set records(val) {
    this.records = val;
  }

  ngOnInit(): void {
    
    this.tableData = this.assignmentService.getAllRosterData();
     this.columnStructure = this.assignmentService.getColumnStructure();

    this.records.clear();
    this.initilizeTable(); //SUBSCRIBE TO FORM --start
    this.form.valueChanges.subscribe((form) => {
      this.assignmentService.staff_roster = this.form.value.records;
      console.log(
        'table form changes',
        this.form,
        this.form.value,
        form,
        this.records,
        this.columnStructure,
        this.records.controls
      );
    }); //SUBSCRIBE TO FORM --end
  }


  //Get the validators from schema 
  columHasValidators(columId: string): ValidatorFn[] {
    const columnDetails = this.columnStructure.find(
      (col) => col?.columnId === columId
    );
    return columnDetails?.validators;
  }

  //INITIALIZE FORM
  initilizeTable(): void {
   
    for (let i = 0; i < this.tableData?.length; i++) {
      let rec = this.tableData[i]; //ADDING VALIDATORS FROM COLUMN SCHEMA-- start
      const group = this.fb.group({});
      const keys = Object.keys(rec); // keys.forEach(colId => {
      for (let j = 0; j < keys?.length; j++) {
        let colId = keys[j];
        let control = new FormControl(rec[colId]);
        const validators = this.columHasValidators(colId);
        console.log(
          ' ~ file: type1-table.component.ts:78 ~ validators:',
          validators
        );
        if (validators) {
          control.addValidators(validators);
          console.log('validatorPub', validators);
        }
        group.addControl(colId, control);
      } // )   //ADDING VALIDATORS FROM COLUMN SCHEMA-- end
      this.records.push(group);
      console.log(
        ' ~ file: type1-table.component.ts:92 ~ this.records:',
        this.records
      );
      
    }
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity(); // )  // INITIALIZE FORM --end  //

    console.log('tableData');
    this.dataSource = new MatTableDataSource(this.tableData);
    this.displayedColumns = this.columnStructure.map((col) => col?.label);
  }

  onAddStaff() {
    const emptyRosterObject =
      this.createEmptyObjectFromSchema(this.columnStructure);
    this.tableData.push(emptyRosterObject);
    this.records.clear();
    this.initilizeTable();
  }

  createEmptyObjectFromSchema(schema) {
    const emptyObject = {};
    schema.forEach((item) => {
      // Using the 'label' as the key and setting initial value based on type
      if (item?.columnId) emptyObject[item?.columnId] = ' '; // Default value for a new object
    });
    return emptyObject;
  }
}
