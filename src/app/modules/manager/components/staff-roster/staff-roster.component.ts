import {
  Component,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { Type1TableSchemaI } from 'src/app/interfaces/staff.interface';
import { AssignmentService } from 'src/app/services/assignment.service';
import {
  ELEMENT_DATA_staff_type,
  TABLE_SCHEMA_Roster,
} from 'src/app/services/data.service';

@Component({
  selector: 'app-staff-roster',
  templateUrl: './staff-roster.component.html',
  styleUrls: ['./staff-roster.component.scss'],
})
export class StaffRosterComponent {
  columnStructure: Type1TableSchemaI[] = TABLE_SCHEMA_Roster;

  tableData = ELEMENT_DATA_staff_type; // actual data of table
  totalMarks: any; // actual data of table

  historyData: Array<any> = [];
  displayedColumns!: Array<any>;
  dataSource: any;
  form = this.fb.group({ records: this.fb.array([]) });

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private assignmentService: AssignmentService
  ) {}
  get records() {
    return this.form.controls['records'] as FormArray;
  }
  set records(val) {
    this.records = val;
  }
  ngOnInit(): void {
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

  ngOnChanges(changes: SimpleChanges): void {
    this.records.clear();
    this.initilizeTable();
    console.log('check onCChanges', changes);
  }
  columHasValidators(columId: string): ValidatorFn[] {
    const columnDetails = this.columnStructure.find(
      (col) => col?.columnId === columId
    );
    return columnDetails?.validators;
  }
  initilizeTable(): void {
    //INITIALIZE FORM --start  // this.tableData?.forEach(rec => {
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
      this.populateData();
    }
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity(); // )  // INITIALIZE FORM --end  //
   
    console.log('tableData');
    this.dataSource = new MatTableDataSource(this.tableData);
    this.displayedColumns = this.columnStructure.map((col) => col?.label);
  }
  populateData() {
    console.log(
      ' ~ file: type1-table.component.ts:108 ~ populateData ~ this.historyData:',
      this.historyData
    );
    if (this.historyData?.length > 0) {
      for (let i = 0; i < this.records.value.length; i++) {
        this.records?.controls[i]
          ?.get('Marks')
          .patchValue(this.historyData[i].value);
      }
      console.log(
        ' ~ file: type1-table.component.ts:111 ~ populateData ~ this.records:',
        this.records
      );
      
    }
  }
}
