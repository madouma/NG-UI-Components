import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelHeaderBarComponent } from './panel-header-bar.component';
import { ExpandCollapseIndicatorComponent } from '../expand-collapse-indicator/expand-collapse-indicator.component';

describe('PanelHeaderBarComponent', () => {
  let component: PanelHeaderBarComponent;
  let fixture: ComponentFixture<PanelHeaderBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PanelHeaderBarComponent, ExpandCollapseIndicatorComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelHeaderBarComponent);
    component = fixture.componentInstance;
    component.toggleButtonTexts = ['Hide Fills', 'Show Fills'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click hide all Surface fills button', async(() => {
    spyOn(component, 'toggleButtonClick');
    const button = fixture.debugElement.nativeElement.querySelector('button.h2-panel-toggle-fills');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.toggleButtonClick).toHaveBeenCalled();
    });
  }));
});
