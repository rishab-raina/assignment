import { Component, EventEmitter, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Type1TableSchemaI } from 'src/app/interfaces/staff.interface';
import { AssignmentService } from 'src/app/services/assignment.service';
import { ELEMENT_DATA_staff_type, TABLE_SCHEMA_Roster } from 'src/app/services/data.service';


// export interface Type1TableSchemaI {
//   label: string;
//   isEditable: boolean;
//   dataType?: string; // THIS HAS TO BE USED FOR SPACING THE NUMERIC, TEXT COLUMNS DISTINCTLY
//   columnId?: string;
//   validators?: ValidatorFn[];

// }
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// export const TABLE_SCHEMA_Roster = [
//   {label: 'Roll', isEditable: false, dataType: 'number', columnId: 'Roll'}, 
//   {label: 'Student Name', isEditable: false, dataType: 'text', columnId: 'Name' },
//   {label: 'Total', isEditable: false, dataType: 'number', columnId: 'Total' }, 
//   {label: 'Remarks', isEditable: true, dataType: 'text', columnId: 'Remarks', validators: [Validators.required, Validators.min(1)]}
// ]

// export const ELEMENT_DATA_REMARKS: any[] = [
//   // { Roll: '#', Name: ' ', Marks:'(10) ', readonly: true   },
//   { Roll: 1, Name: 'Hydrogen', Total: 1, Remarks: 'n' },
//   { Roll: 2, Name: 'Helium', Total: 4, Remarks: 'm'  },
//   { Roll: 3, Name: 'Lithium', Total: 6,Remarks: 'l'   },
//   { Roll: 4, Name: 'Beryllium', Total: 9,Remarks: 'k'   },
//   { Roll: 5, Name: 'Boron', Total: 10,Remarks: 'j'   },
//   { Roll: 6, Name: 'Carbon', Total: 12,Remarks: 'i'   },
//   { Roll: 7, Name: 'Nitrogen', Total: 14,Remarks: 'h'   },
//   { Roll: 8, Name: 'Oxygen', Marks: 15,Total: 18, Remarks: 'g'  },
//   { Roll: 9, Name: 'Fluorine', Total: 18, Remarks: 'f' },
//   { Roll: 10, Name: 'Neon', Total: 20,Remarks: 'e'  },
//   { Roll: 11, Name: 'Sodium', Total: 22,Remarks: 'd'   },
//   { Roll: 12, Name: 'Magnesium', Total: 24,Remarks: 'c'  },
//   { Roll: 13, Name: 'Aluminum', Total: 26, Remarks: 'b'  },
//   { Roll: 14, Name: 'Silicon', Total: 28, Remarks: 'a' }
// ];

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-staff-roster',
  templateUrl: './staff-roster.component.html',
  styleUrls: ['./staff-roster.component.scss']
})
export class StaffRosterComponent { 
  @Input() 
  columnStructure: Type1TableSchemaI[] = TABLE_SCHEMA_Roster; 
  
  @Input() tableData = ELEMENT_DATA_staff_type; // actual data of table 
  @Input() totalMarks: any; // actual data of table 
  @Output() tableFormChanged = new EventEmitter<FormGroup>()
   @Input()
  subHeader!: Array<string>; 
   @Input() historyData: Array<any> = []; 
   displayedColumns!: Array<any>; 
   dataSource: any;
   form = this.fb.group({  records: this.fb.array([]) });
  
   constructor(private fb: FormBuilder, private renderer: Renderer2, private assignmentService: AssignmentService) { }
   get records() {  return this.form.controls["records"] as FormArray; }
   set records(val) {  this.records = val }
   ngOnInit(): void {  
    this.records.clear()  
    this.initilizeTable()  //SUBSCRIBE TO FORM --start  
    this.form.valueChanges.subscribe(   form => {   
      this.assignmentService.staff_roster = this.form.value.records;
       console.log("table form changes", this.form, this.form.value, form, this.records, this.columnStructure, this.records.controls)  
         this.tableFormChanged.emit(this.form)   }  )  //SUBSCRIBE TO FORM --end
   }

   ngOnChanges(changes: SimpleChanges): void {  
    this.records.clear()  
    this.initilizeTable()
    console.log("check onCChanges", changes) }
   columHasValidators(columId: string): ValidatorFn[] {
      const columnDetails = this.columnStructure.find(col => col?.columnId === columId)  
      return columnDetails?.validators }
   initilizeTable(): void {  //INITIALIZE FORM --start  // this.tableData?.forEach(rec => {
    for (let i = 0; i < this.tableData?.length; i++) {   
      let rec = this.tableData[i]   //ADDING VALIDATORS FROM COLUMN SCHEMA-- start 
        const group = this.fb.group({});   const keys = Object.keys(rec)   // keys.forEach(colId => { 
          for (let j = 0; j < keys?.length; j++) { 
               let colId = keys[j] 
                  let control = new FormControl(rec[colId])
                      const validators = this.columHasValidators(colId)   
                       console.log(" ~ file: type1-table.component.ts:78 ~ validators:", validators) 
                          if (validators) {     control.addValidators(validators) 
                               console.log("validatorPub", validators)  
                                }    group.addControl(colId, control)
     }   // )   //ADDING VALIDATORS FROM COLUMN SCHEMA-- end
     this.records.push(group)   
     console.log(" ~ file: type1-table.component.ts:92 ~ this.records:", this.records);   
     this.populateData();  
    }  this.form.markAllAsTouched() 
     this.form.updateValueAndValidity()  // )  // INITIALIZE FORM --end  // 
    this.tableFormChanged.emit(this.form)
    console.log("tableData",) 
     this.dataSource = new MatTableDataSource(this.tableData);  this.displayedColumns = this.columnStructure.map(col => col?.label)
   }
   populateData() { 
     console.log(" ~ file: type1-table.component.ts:108 ~ populateData ~ this.historyData:", 
      this.historyData)
    if (this.historyData?.length > 0) { 
        for (let i = 0; i < this.records.value.length; i++) {  
            this.records?.controls[i]?.get('Marks').patchValue(this.historyData[i].value)   } 
              console.log(" ~ file: type1-table.component.ts:111 ~ populateData ~ this.records:", this.records)  
               this.tableFormChanged.emit(this.form)  } }}