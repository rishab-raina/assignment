import { Component, Input, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-my-roster',
  templateUrl: './my-roster.component.html',
  styleUrls: ['./my-roster.component.scss']
})
export class MyRosterComponent implements OnInit {
  @Input() staffId = localStorage.getItem("user_id");
  staffRoster;
  constructor(private assignmentService: AssignmentService){}
  ngOnInit(): void {
    this.staffRoster = this.assignmentService.getcurrentStaffRoster(this.staffId);
    console.log("staffRoster",this.staffRoster)
  }

}
