import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRosterComponent } from './staff-roster.component';

describe('StaffRosterComponent', () => {
  let component: StaffRosterComponent;
  let fixture: ComponentFixture<StaffRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffRosterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
