# Assignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.5.

## Development server
clone the repo link and run npm i in cmd  

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
##Login Creds Details
after running the app on local host use below credentials to login

for staff
 username: 'st_101',
 password: 'abc123'
 role: 'staff'

for manager
  username: 'st_102',
  password: 'abc123'
  role: 'manager'


## steps to navigate through the app

   1.log in using staff 
   2.mark the attendance 
   3.click log out , you will be directed to login page

  4.log  in to manager
  5. view attendance list
  6. click Roster tab to view editable roster table zone and shift columns can be edit.
       inline edit available for zone.
       the roster table is json based and can be cofigurable to variable requirements


##App overview module description.
auth module : role based log in page for staff and manager.

staff module :
  landing page : staff dashboard to view current staff roaster with a mark attendence button .
  mark attendence module : to capture ,preview and mark attendance

Manager Module:
      landing page: a tab view for all staff roaster and staff attendance.
         Roaster component : table for all staff roaster.
      Attendance component: list of staff attendance.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
