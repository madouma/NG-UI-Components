import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WidgetComponent } from './widget.component';
import { ExpandCollapseIndicatorComponent } from '../expand-collapse-indicator/expand-collapse-indicator.component';
import { ButtonComponent } from '../button/button.component';
import { CollapsibleComponent } from '../collapsible/collapsible.component';
import { IconComponent } from '../icon/icon.component';
import { SpinnerComponent } from '../spinner/spinner.component';

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        InlineSVGModule,
        HttpClientModule
      ],
      declarations: [WidgetComponent, ExpandCollapseIndicatorComponent,
        ButtonComponent, CollapsibleComponent, IconComponent, SpinnerComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
