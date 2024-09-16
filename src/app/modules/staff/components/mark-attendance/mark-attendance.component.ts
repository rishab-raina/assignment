import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { AttendanceI, StaffI } from 'src/app/interfaces/staff.interface';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.scss']
})
export class MarkAttendanceComponent implements OnInit {
  user: StaffI;
  constructor(
    private assignmentService: AssignmentService, 
    private router: Router,
    private _snackBar: MatSnackBar
  ){}

  public webcamWidth: number = 300;
  public webcamHeight: number = 400;
   // toggle webcam on/off
   public showWebcam = true;
   public allowCameraSwitch = true;
   public multipleWebcamsAvailable = false;
   public deviceId = '';
   public videoOptions: MediaTrackConstraints = {
     // width: {ideal: 1024},
     // height: {ideal: 576}
   };
   public errors: WebcamInitError[] = [];
 
   // latest snapshot
   public webcamImage: WebcamImage | undefined ;
 
   // webcam snapshot trigger
   private trigger: Subject<void> = new Subject<void>();
   // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
   private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
 
   public ngOnInit(): void {
    const user_id = localStorage.getItem("user_id")
    this.user = this.assignmentService.getUserById(user_id) ;
    console.log('user', this.user)

     WebcamUtil.getAvailableVideoInputs()
       .then((mediaDevices: MediaDeviceInfo[]) => {
         this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
       });

       this.updateWebcamDimensions();
    window.addEventListener('resize', this.updateWebcamDimensions.bind(this));
   }

     // Dynamically update webcam dimensions based on screen size
  updateWebcamDimensions(): void {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      this.webcamWidth = screenWidth - 20;
      this.webcamHeight = (this.webcamWidth / 4) * 3;
    } else {
      this.webcamWidth = 640;
      this.webcamHeight = 480;
    }
  }
 
   public triggerSnapshot(): void {
     this.trigger.next();
   }
 
   public toggleWebcam(): void {
     this.showWebcam = !this.showWebcam;
   }
 
   public handleInitError(error: WebcamInitError): void {
     this.errors.push(error);
   }
 
   public showNextWebcam(directionOrDeviceId: boolean|string): void {
     // true => move forward through devices
     // false => move backwards through devices
     // string => move to device with given deviceId
     this.nextWebcam.next(directionOrDeviceId);
   }
 
   public handleImage(webcamImage: WebcamImage): void {
     console.info('received webcam image', webcamImage);
     this.webcamImage = webcamImage;
   }
 
   public cameraWasSwitched(deviceId: string): void {
     console.log('active device: ' + deviceId);
     this.deviceId = deviceId;
   }
 
   public get triggerObservable(): Observable<void> {
     return this.trigger.asObservable();
   }
 
   public get nextWebcamObservable(): Observable<boolean|string> {
     return this.nextWebcam.asObservable();
   }

   markAttendance(): void{
    
    const attendance: AttendanceI ={
      attendanceId: `atnd-${new Date().getTime()}`,
      user: this.user,
      
      image: this.webcamImage,
      timestamp: `${new Date().toDateString()} ${this.formatAMPM(new Date())}`

    }
    this.assignmentService.addAttendance(attendance);
    const msg = `Attendance Marked Successfully!`
    const action = 'Dismiss'
    this.openSnackBar(msg);

    this.router.navigate(['./staff'])
    
   }

    formatAMPM(date: Date): string {
    let hours = date.getHours();
    let minutes: string | number = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12; // Convert 24-hour time to 12-hour time
    hours = hours ? hours : 12; // The hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero to minutes
    
    return `${hours}:${minutes} ${ampm}`;
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 2000,  // Snackbar will disappear after 2000ms
      verticalPosition: 'bottom', // 'top' or 'bottom'
      horizontalPosition: 'center', // 'start', 'center', 'end', 'left', 'right'
    });
  }
  
}