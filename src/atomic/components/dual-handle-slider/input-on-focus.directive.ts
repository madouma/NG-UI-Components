import { Directive, HostBinding, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[h2InputOnFocus]'
})
export class InputOnFocusDirective {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFocus = new EventEmitter<TooltipValues>();

  constructor(private el: ElementRef) { }

  @HostListener('focus', ['$event']) styleInputOnFocus() {
    this.el.nativeElement.classList.add('focusOnInput');
    this.onFocus.emit({
      name: this.el.nativeElement.classList.contains('left') ? 'left' : 'right',
      focused: true,
      value: this.el.nativeElement.value
    });
  }

  @HostListener('blur', ['$event']) styleInputOnBlur() {
    this.el.nativeElement.classList.remove('focusOnInput');
    this.onFocus.emit({
      name: this.el.nativeElement.classList.contains('left') ? 'left' : 'right',
      focused: false,
      value: this.el.nativeElement.value
    });
  }

  @HostListener('keydown.enter', ['$event']) onEnter() {
    this.styleInputOnBlur();
    this.el.nativeElement.blur();
  }
}

export interface TooltipValues {
  name: string;
  value: number;
  focused: boolean;
  error?: string;
}
