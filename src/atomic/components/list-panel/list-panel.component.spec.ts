import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListPanelComponent } from './list-panel.component';
import { ChevronIndicatorComponent } from '../chevron-indicator/chevron-indicator.component';
import { IconComponent } from '../icon/icon.component';
import { CollapsibleComponent } from '../collapsible/collapsible.component';
import { KebabCasePipe } from 'src/atomic/pipes/kebab-case.pipe';

describe('ListPanelComponent', () => {
  let component: ListPanelComponent;
  let fixture: ComponentFixture<ListPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListPanelComponent, ChevronIndicatorComponent, IconComponent,
        CollapsibleComponent, KebabCasePipe
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
