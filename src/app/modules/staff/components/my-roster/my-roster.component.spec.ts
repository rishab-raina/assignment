import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRosterComponent } from './my-roster.component';

describe('MyRosterComponent', () => {
  let component: MyRosterComponent;
  let fixture: ComponentFixture<MyRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRosterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
