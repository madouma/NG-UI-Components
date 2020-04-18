import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { Icon } from '../icon/icon.enum';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'h2-visibility-switch',
  templateUrl: './visibility-switch.component.html',
  styleUrls: ['./visibility-switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VisibilitySwitchComponent),
      multi: true
    }
  ],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1, display: 'block' })),
      state('out', style({ opacity: 0, display: 'none' })),
      transition('in <=> out', animate(100)),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisibilitySwitchComponent implements ControlValueAccessor {
  @Input() on = true;
  @Input() disabled = false;
  @Input() pokeyEye: boolean = false;

  Icon = Icon;

  constructor(private _cdf: ChangeDetectorRef) { }

  onChange = (on: boolean) => { };
  onTouched = () => { };

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) { }

  writeValue(on: boolean) {
    if (on !== undefined) {
      this.on = on;
      this._cdf.markForCheck();
    }
  }

  onIconClick() {
    this.on = !this.on;
    this.onChange(this.on);
    this._cdf.detectChanges();
  }
}
