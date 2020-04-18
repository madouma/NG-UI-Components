import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxTrimComponent } from './box-trim.component';

describe('BoxTrimComponent', () => {
  let component: BoxTrimComponent;
  let fixture: ComponentFixture<BoxTrimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxTrimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxTrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
