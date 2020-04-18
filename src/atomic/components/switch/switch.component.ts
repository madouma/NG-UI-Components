import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelAlign } from '../label/label.enums';

@Component({
  selector: 'h2-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent implements AfterViewInit, ControlValueAccessor {
  @Input() on = false;
  @Input() wrapper = true;
  @Input() disabled = false;
  @Input() label: string;
  @Input() small = false;

  initialized = false;
  LabelAlign = LabelAlign;

  constructor(private _cdf: ChangeDetectorRef) { }

  ngAfterViewInit() {
    // Run at the end of the event loop
    // This is needed to fix the flicker that occurs on component initialization do to css transitions.
    setTimeout(_ => {
      this.initialized = true;
      this._cdf.markForCheck();
    });
  }

  onChange = (on: boolean) => {};
  onTouched = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled !== undefined) {
      this.disabled = isDisabled;
      this._cdf.markForCheck();
    }
  }

  writeValue(on: boolean) {
    if (on !== undefined) {
      this.on = on;
      this._cdf.markForCheck();
    }
  }
}
