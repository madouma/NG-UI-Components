import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { DatePickerComponent } from './date-picker.component';
import { TextboxComponent, LabelComponent, TooltipComponent, IconComponent, SpinnerComponent } from '..';
import { InvokePipe } from 'src/atomic/pipes/invoke.pipe';
import { OverlayModule } from '@angular/cdk/overlay';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerComponent, TextboxComponent, LabelComponent, TooltipComponent,
        IconComponent, SpinnerComponent, InvokePipe],
      imports: [
        OverlayModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
