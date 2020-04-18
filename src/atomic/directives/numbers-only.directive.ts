import { Directive, ElementRef, HostListener, Input } from '@angular/core';

// Code modified from: https://codeburst.io/digit-only-directive-in-angular-3db8a94d80c3
@Directive({
  selector: '[h2NumbersOnly]'
})
export class NumbersOnlyDirective {
  @Input('h2NumbersOnly') disabled: boolean;

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (
      this.disabled ||
      ['Backspace', 'Escape', 'Delete', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'].includes(e.key) ||
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) // Cmd+X (Mac)
    ) {
      return;  // let it happen, don't do anything
    }

    // Ensure that it is a number and stop the keypress
    if (!e.key.match(/[0-9,-.]/)) {
      e.preventDefault();
    }
  }
}
