import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
  Input,
  ElementRef,
  OnInit,
  OnDestroy,
  OnChanges,
  forwardRef,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as noUiSlider from 'nouislider';
import { LabelAlign, LabelType } from '../label/label.enums';
import { TextboxSize, TextboxTexAlign, TextboxType } from '../textbox/textbox.enums';
import { DHSliderSize } from '../dual-handle-slider/dual-handle-slider.enums';

@Component({
  selector: 'h2-single-handle-slider',
  templateUrl: './single-handle-slider.component.html',
  styleUrls: ['./single-handle-slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleHandleSliderComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleHandleSliderComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  @Input() label: string;
  @Input() units: string;
  @Input() disabled: boolean;
  @Input() size = DHSliderSize.Large;
  @Input() initialValue: number;
  @Input() startValue: number = 30;

  @ViewChild('slider') private _slider;
  @ViewChild('textbox') private _textbox: ElementRef<HTMLInputElement>;

  constructor(private _cdf: ChangeDetectorRef) { }

  public LabelType = LabelType;
  public LabelAlign = LabelAlign;
  public TextboxType = TextboxType;
  public TextboxTextAlign = TextboxTexAlign;
  public TextboxSize = TextboxSize;

  public value: number = null;
  public error: string = '';
  valueError = '';
  ngOnInit() {
    if (this.initialValue >= 0) {
      this.initialValue = Number(this.initialValue);
      this.value = this.initialValue;
    }
    this.createSlider();
    this.trackSlider();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.disabled && changes.disabled.currentValue !== changes.disabled.previousValue) {
      this.setDisabledState(changes.disabled.currentValue);
    }
  }


  ngOnDestroy() {
    this.destroySlider();
  }

  private createSlider() {
    noUiSlider.create(this._slider.nativeElement, {
      start: this.startValue >= 0 ? this.startValue : 40,
      behaviour: 'drag',
      connect: [true, false],
      range: {
        'min': 0,
        'max': this.initialValue > 0 ? this.initialValue : 100
      }
    });
    this.removeKeyboardFocusFromHandles();
  }

  private destroySlider() {
    const slider = this._slider.nativeElement.noUiSlider;

    if (slider) {
      slider.destroy();
    }
  }


  onTouched = () => { };
  onChange = (value: number) => { };

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  private trackSlider() {
    this._slider.nativeElement.noUiSlider.on('update', (stringValues, handle, values) => {
      this.value = values[0];
      this._cdf.markForCheck();
    });

    this._slider.nativeElement.noUiSlider.on('set', (stringValues, handle, values) => {
      this.value = values[0];
      this.onChange(this.value);
    });
  }

  private removeKeyboardFocusFromHandles() {
    const handles = <HTMLElement[]>Array.from(this._slider.nativeElement.querySelectorAll('.noUi-handle'));
    handles.forEach(handle => handle.tabIndex = -1);
  }


  private updateSliderValue() {
    const slider = this._slider.nativeElement.noUiSlider;

    if (slider) {
      slider.set(this.value);
    }
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

  updateValueViaInput(input: HTMLInputElement, name: 'value') {
    const valuePropName = `value`;
    const errorPropName = `error`;
    const value = parseFloat(input.value);

    if (!this[errorPropName] && (typeof value) === 'number' && !isNaN(value)) {
      this.value = value;
    } else {
      this.value = this.initialValue >= 0 ? this.initialValue : 100;
    }

    this[errorPropName] = '';
    this.updateSliderValue();
  }

  writeValue(value: number) {
    if (value) {
      this.value = value;
      this.updateSliderValue();
    }
  }

  validate(value) {
    value === '' ? this.error = 'Value must be a number' : '';
  }

}
