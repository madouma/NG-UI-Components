import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VisibilitySwitchComponent } from './visibility-switch.component';
import { IconComponent } from '../icon/icon.component';

describe('VisibilitySwitchComponent', () => {
  let component: VisibilitySwitchComponent;
  let fixture: ComponentFixture<VisibilitySwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VisibilitySwitchComponent, IconComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilitySwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
