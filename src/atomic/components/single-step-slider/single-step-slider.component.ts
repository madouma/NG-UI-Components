import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import * as noUiSlider from 'nouislider';
import { LabelAlign, LabelType } from '../label/label.enums';
import { TextboxSize, TextboxTexAlign, TextboxType } from '../textbox/textbox.enums';

@Component({
  selector: 'h2-single-step-slider',
  templateUrl: './single-step-slider.component.html',
  styleUrls: ['./single-step-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleStepSliderComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() value: number = 0;
  @Input() disabled: boolean;
  @Input() step = 1;
  @Input() min = 1;
  private _max = 4;
  @Input()
  set max(val: number) {
    if (val) {
      this._max = val;
      this.stepLines = new Array(this.max);
    }
  }
  get max() {
    return this._max;
  }

  @Output() valueChanged = new EventEmitter<number>();

  stepLines = [];

  LabelType = LabelType;
  LabelAlign = LabelAlign;
  TextboxType = TextboxType;
  TextboxTextAlign = TextboxTexAlign;
  TextboxSize = TextboxSize;

  error = '';

  @ViewChild('stepSlider') private stepSlider;

  constructor(private _cdf: ChangeDetectorRef) { }
  ngOnInit() {
    this.createSlider();
    this.trackSlider();
  }

  ngOnDestroy() {
    this.destroySlider();
  }

  private createSlider() {
    noUiSlider.create(this.stepSlider.nativeElement, {
      start: this.value,
      step: this.step,
      connect: [true, false],
      range: {
          'min': this.min,
          'max': this.max
      }
    });
  }

  private destroySlider() {
    const slider = this.stepSlider.nativeElement.noUiSlider;

    if (slider) {
      slider.destroy();
    }
  }

  private trackSlider() {
    this.stepSlider.nativeElement.noUiSlider.on('update', (stringValues, handle, values) => {
      this.value = values[0];
      this.valueChanged.emit(this.value);
      this._cdf.markForCheck();
    });
  }

  validateAndUpdateValueViaInput(value) {
    this.error = !value || value > this.max || value < this.min
      ? `Value must be between ${+this.min} and ${this.max}`
      : '';

    if (this.error) { return; }

    this._updateOptions({
      start: value
    });
  }

  private _updateOptions(options: any) {
    const slider = this.stepSlider.nativeElement.noUiSlider;
    slider.updateOptions(options);
  }

  stepPosition(i) {
    return i / (this.stepLines.length - 1) * 100;
  }
}