import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandCollapseIndicatorComponent } from './expand-collapse-indicator.component';

describe('ExpandCollapseIndicatorComponent', () => {
  let component: ExpandCollapseIndicatorComponent;
  let fixture: ComponentFixture<ExpandCollapseIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandCollapseIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandCollapseIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
