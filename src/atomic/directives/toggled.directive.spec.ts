import { ToggledDirective } from './toggled.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ToggledDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        ToggledDirective
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });
  it('clicking the element', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const directiveEl = fixture.debugElement.query(By.directive(ToggledDirective));
    expect(directiveEl).not.toBeNull();

    const directiveInstance = directiveEl.injector.get(ToggledDirective);
    expect(directiveInstance.toggled).toBe(false);
    directiveInstance.addClass();
    fixture.detectChanges();
    expect(directiveInstance.toggled).toBe(true);
  });
});

@Component({
  selector: 'my-test-component',
  template: '<div h2Toggled></div>'
})
class TestComponent {}
