import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as noUiSlider from 'nouislider';
import { DHSliderSize } from './dual-handle-slider.enums';
import { LabelAlign, LabelType } from '../label/label.enums';
import { TextboxSize, TextboxTexAlign, TextboxType } from '../textbox/textbox.enums';

@Component({
  selector: 'h2-dual-handle-slider',
  templateUrl: './dual-handle-slider.component.html',
  styleUrls: ['./dual-handle-slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DualHandleSliderComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DualHandleSliderComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @Input() min = 0;
  @Input() max = 100;
  @Input() size = DHSliderSize.Large;
  @Input() separatorMinSize = 0;
  @Input() label: string;
  @Input() units: string;
  @Input() disabled: boolean = false;
  @Output() valueRangeChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild('slider', {static: false}) private _slider;

  LabelType = LabelType;
  LabelAlign = LabelAlign;
  TextboxType = TextboxType;
  TextboxTextAlign = TextboxTexAlign;
  TextboxSize = TextboxSize;

  private values: any;
  leftValue: number = null;
  rightValue: number = null;
  leftError = '';
  rightError = '';

  get leftValuePercent() {
    return this.convertToPercent(this.leftValue - this.min) + '%';
  }

  get rightValuePercent() {
    return (100 - this.convertToPercent(this.rightValue - this.min)) + '%';
  }

  constructor(private _cdf: ChangeDetectorRef) { }

  ngOnInit() {
    this.createSlider();
    this.trackSlider();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.checkNgOnChangeValues(changes.min) || this.checkNgOnChangeValues(changes.max) || this.checkNgOnChangeValues(changes.separatorMinSize) || this.checkNgOnChangeValues(changes.disabled)) {
      this.updateSliderOptions();
    } else {
      return;
    }
  }

  ngOnDestroy() {
    this.destroySlider();
  }

  private checkNgOnChangeValues(prop: any): boolean {
    if (prop) {
      const prevVal = prop.previousValue;
      const curVal = prop.currentValue
      if (prop !== undefined && prevVal !== undefined && curVal !== undefined && prevVal !== curVal) {
        return true;
      }
    }
    return false;
  }


  private createSlider() {
    noUiSlider.create(this._slider.nativeElement, {
      start: [this.leftValue, this.rightValue],
      range: {
        'min': this.min,
        'max': this.max
      },
      margin: this.separatorMinSize,
      behaviour: 'drag',
      connect: true,
    });

    this.removeKeyboardFocusFromHandles();
  }

  private destroySlider() {
    const slider = this._slider.nativeElement.noUiSlider;

    if (slider) {
      slider.destroy();
    }
  }

  private trackSlider() {
    this._slider.nativeElement.noUiSlider.on('update', (stringValues, handle, values) => {
      this.leftValue = values[0];
      this.rightValue = values[1];
      this._cdf.markForCheck();
    });

    this._slider.nativeElement.noUiSlider.on('set', (stringValues, handle, values) => {
      this.leftValue = values[0];
      this.rightValue = values[1];
      this.onChange(this.assembleValue());
    });
  }

  private removeKeyboardFocusFromHandles() {
    const handles = <HTMLElement[]>Array.from(this._slider.nativeElement.querySelectorAll('.noUi-handle'));
    handles.forEach(handle => handle.tabIndex = -1);
  }

  private updateSliderOptions() {
    const slider = this._slider.nativeElement.noUiSlider;

    if (slider) {
      slider.updateOptions({
        range: {
          'min': this.min,
          'max': this.max
        },
        margin: this.separatorMinSize
      });
    }
  }

  private updateSliderValues() {
    const slider = this._slider.nativeElement.noUiSlider;

    if (slider) {
      slider.set([this.leftValue, this.rightValue]);
    }
  }

  private assembleValue() {
    this.values = { min: this.leftValue, max: this.rightValue };
    return this.values;
  }

  private convertToPercent(value) {
    return value / (this.max - this.min) * 100;
  }

  public onMouseUp() {
    this.valueRangeChanged.emit(this.assembleValue());
  }

  validateLeft(left) {
    this.leftError = (left !== 0 && !left) || left < this.min || left > this.rightValue - this.separatorMinSize
      ? `Value must be between ${this.min} and ${+this.rightValue - this.separatorMinSize}`
      : '';
  }

  validateRight(right) {
    this.rightError = (right !== 0 && !right) || right > this.max || right < this.leftValue + this.separatorMinSize
      ? `Value must be between ${+this.leftValue + this.separatorMinSize} and ${this.max}`
      : '';
  }

  // TODO: this is a bit hackish. Find a better way to do this.
  resetInputValues() {
    this.leftValue = null;
    this.rightValue = null;
    this._cdf.detectChanges();
    this.leftValue = this.values.min;
    this.rightValue = this.values.max;
    this._cdf.detectChanges();
  }

  updateValueViaInput(input: HTMLInputElement, name: 'left' | 'right') {
    const valuePropName = `${name}Value`;
    const errorPropName = `${name}Error`;

    if (!this[errorPropName]) {
      this[valuePropName] = +input.value;
      this.updateSliderValues();
    } else {
      this.resetInputValues();
    }

    this[errorPropName] = '';
  }

  onChange = (value: string) => { };
  onTouched = () => { };

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled !== undefined) {
      this.disabled = isDisabled;
      if (this.disabled) {
        this._slider.nativeElement.setAttribute('disabled', this.disabled);
      } else {
        this._slider.nativeElement.removeAttribute('disabled');
      }
      this._cdf.markForCheck();
    }
  }

  writeValue(value: any) {
    if (value && typeof value === 'object') {

      if (value.min === undefined || value.max === undefined) {
        console.error(`value must have a min and max value (i.e. {min:10,max:100}). Received ${value}`);
        return;
      }

      this.values = value;
      this.leftValue = value.min;
      this.rightValue = value.max;

      this.updateSliderValues();
    }
  }
}
