import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'h2-opacity-slider',
  templateUrl: './opacity-slider.component.html',
  styleUrls: ['./opacity-slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OpacitySliderComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.h2--vertical]': 'vertical',
    '[style.height]': 'vertical ? length + "px" : "auto"'
  }
})
export class OpacitySliderComponent implements ControlValueAccessor {
  @Input() value = 100;
  @Input() color = '#000000';
  @Input() length = 100;
  @Input() vertical = true;

  get sliderInputStyles() {
    return {
      backgroundImage: `
        linear-gradient(90deg, ${this.color}, ${this.color}00),
        linear-gradient(45deg, #A8A8A8 25%, transparent 25%),
        linear-gradient(135deg, #A8A8A8 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #A8A8A8 75%),
        linear-gradient(135deg, transparent 75%, #A8A8A8 75%)
      `,
      width: this.length + 'px',
    };
  }

  constructor(private _cdf: ChangeDetectorRef) { }

  onChange = (value: number) => {};
  onTouched = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) { }

  writeValue(value: number) {
    if (value !== undefined) {
      this.value = value;
      this._cdf.markForCheck();
    }
  }
}
