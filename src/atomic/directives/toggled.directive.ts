import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

/**
 * Add h2-toggled class when clicked and remove it on mouse out.
 * Used for styling togglable buttons
 */
@Directive({
  selector: '[h2Toggled]'
})
export class ToggledDirective {
  @HostBinding('class.h2--toggled') toggled = false;

  constructor(private elRef: ElementRef) { }

  // TODO: optimize both HostListeneres this to reduce change detection
  // (https://blog.thoughtram.io/angular/2017/02/21/using-zones-in-angular-for-better-performance.html)
  @HostListener('click') addClass() {
    this.toggled = true;
  }

  @HostListener('mouseout') removeClass() {
    this.toggled = false;
  }
}
