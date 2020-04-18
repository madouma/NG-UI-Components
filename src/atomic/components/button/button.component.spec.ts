import { InlineSVGModule } from 'ng-inline-svg';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from './button.component';
import { SpinnerComponent } from '../spinner/spinner.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent, IconComponent, SpinnerComponent],
      imports: [InlineSVGModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
