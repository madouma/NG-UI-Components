import { ElementRef } from '@angular/core';
import { InputOnFocusDirective } from './input-on-focus.directive';

describe('InputOnFocusDirective', () => {
  it('should create an instance', () => {
    const el = new ElementRef<any>(document.createElement('div'));
    const directive = new InputOnFocusDirective(el);
    expect(directive).toBeTruthy();
  });
});
