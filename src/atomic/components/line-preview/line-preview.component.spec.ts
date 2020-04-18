import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinePreviewComponent } from './line-preview.component';

describe('LinePreviewComponent', () => {
  let component: LinePreviewComponent;
  let fixture: ComponentFixture<LinePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
