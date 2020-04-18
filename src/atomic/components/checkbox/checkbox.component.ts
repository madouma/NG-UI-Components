import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxLabelPos } from './checkbox.enums';
import { LabelAlign } from '../label/label.enums';
import { Icon } from '../icon/icon.enum';

@Component({
  selector: 'h2-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() checked = false;
  @Input() wrapper = true;
  @Input() disabled = false;
  @Input() label: string;
  @Input() labelPosition = CheckboxLabelPos.Right;
  @Input() glow = true;

  Icon = Icon;

  get labelAlign() {
    return this.labelPosition === CheckboxLabelPos.Right ? LabelAlign.Left : LabelAlign.Right;
  }

  constructor(private _cdf: ChangeDetectorRef) { }

  onChange = (checked: boolean) => {};
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

  writeValue(checked: boolean) {
    if (checked !== undefined) {
      this.checked = checked;
      this._cdf.markForCheck();
    }
  }
}
