import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DualHandleSliderComponent } from './dual-handle-slider.component';
import { LabelComponent } from '../label/label.component';
import { RemoveCharacterPipe } from '../../pipes/remove-character.pipe';
import { TextboxComponent } from '../textbox/textbox.component';
import { InvokePipe } from '../../pipes/invoke.pipe';

describe('DualHandleSliderComponent', () => {
  let component: DualHandleSliderComponent;
  let fixture: ComponentFixture<DualHandleSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DualHandleSliderComponent, LabelComponent, RemoveCharacterPipe,
        TextboxComponent, InvokePipe
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DualHandleSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
