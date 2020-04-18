import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TextboxComponent } from './textbox.component';
import { LabelComponent } from '../label/label.component';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { IconComponent } from '../icon/icon.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { InvokePipe } from 'src/atomic/pipes/invoke.pipe';
import { OverlayModule } from '@angular/cdk/overlay';

describe('TextboxComponent', () => {
  let component: TextboxComponent;
  let fixture: ComponentFixture<TextboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextboxComponent, LabelComponent, TooltipComponent,
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
    fixture = TestBed.createComponent(TextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
