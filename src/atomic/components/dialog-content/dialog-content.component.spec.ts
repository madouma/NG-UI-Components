import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DialogContentComponent } from './dialog-content.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';

describe('DialogContentComponent', () => {
  let component: DialogContentComponent;
  let fixture: ComponentFixture<DialogContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogContentComponent, ButtonComponent, IconComponent],
      imports: [OverlayModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
