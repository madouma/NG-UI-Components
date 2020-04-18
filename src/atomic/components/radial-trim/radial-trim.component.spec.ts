import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialTrimComponent } from './radial-trim.component';

describe('RadialTrimComponent', () => {
  let component: RadialTrimComponent;
  let fixture: ComponentFixture<RadialTrimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadialTrimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadialTrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
