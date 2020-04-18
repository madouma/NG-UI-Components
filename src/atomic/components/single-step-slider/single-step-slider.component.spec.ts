import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleStepSliderComponent } from './single-step-slider.component';
import { LabelComponent } from '../label/label.component';

describe('SingleStepSliderComponent', () => {
  let component: SingleStepSliderComponent;
  let fixture: ComponentFixture<SingleStepSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleStepSliderComponent, LabelComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleStepSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
