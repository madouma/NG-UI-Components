import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PropertiesBarComponent } from './properties-bar.component';
import { VisibilitySwitchComponent } from '../visibility-switch/visibility-switch.component';
import { ButtonComponent } from '../button/button.component';
import { ExpandCollapseIndicatorComponent } from '../expand-collapse-indicator/expand-collapse-indicator.component';
import { CollapsibleComponent } from '../collapsible/collapsible.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PropertiesBarComponent', () => {
  let component: PropertiesBarComponent;
  let fixture: ComponentFixture<PropertiesBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesBarComponent, VisibilitySwitchComponent,
      ButtonComponent, ExpandCollapseIndicatorComponent, CollapsibleComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      imports: [NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
