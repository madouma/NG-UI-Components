import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ResistivityGradientBuilderComponent } from './resistivity-gradient-builder.component';
import { RemoveCharacterPipe } from 'src/atomic/pipes/remove-character.pipe';
import { TextboxComponent } from '../textbox/textbox.component';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { InvokePipe } from 'src/atomic/pipes/invoke.pipe';
import { OverlayModule } from '@angular/cdk/overlay';

describe('ResistivityGradientBuilderComponent', () => {
  let component: ResistivityGradientBuilderComponent;
  let fixture: ComponentFixture<ResistivityGradientBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResistivityGradientBuilderComponent, RemoveCharacterPipe,
      TextboxComponent, ColorPickerComponent, InvokePipe],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      imports: [OverlayModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResistivityGradientBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
