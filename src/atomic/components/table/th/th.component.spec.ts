import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThComponent } from './th.component';

describe('ThComponent', () => {
  let component: ThComponent;
  let fixture: ComponentFixture<ThComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
