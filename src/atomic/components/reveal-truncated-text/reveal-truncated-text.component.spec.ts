import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { RevealTruncatedTextComponent } from './reveal-truncated-text.component';

describe('RevealTruncatedTextComponent', () => {
  let component: RevealTruncatedTextComponent;
  let fixture: ComponentFixture<RevealTruncatedTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RevealTruncatedTextComponent],
      imports: [OverlayModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevealTruncatedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
