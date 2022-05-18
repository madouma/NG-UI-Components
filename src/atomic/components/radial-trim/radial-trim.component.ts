import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as noUiSlider from 'nouislider';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'h2-radial-trim',
  templateUrl: './radial-trim.component.html',
  styleUrls: ['./radial-trim.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadialTrimComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.backgroundSize]': 'gridSize'
  }
})
export class RadialTrimComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @Input() min = 0;
  @Input() max = 100;
  @Input() gridInterval = 8;
  @Input() box: string;

  @ViewChild('slider', {static: false}) private _slider;

  innerRadius: number = null;
  outerRadius: number = null;

  get innerRadiusPercent() {
    return this.convertToPercent(this.innerRadius - this.min) + '%';
  }

  get outerRadiusPercent() {
    return this.convertToPercent(this.outerRadius - this.min) + '%';
  }

  get circleFillGradient() {
    return this._sanitizer.bypassSecurityTrustStyle(
      `radial-gradient(
        circle closest-side,
        transparent ${this.innerRadiusPercent},
        rgba(var(--primary-accent-rgb), .2) ${this.innerRadiusPercent},
        rgba(var(--primary-accent-rgb), .2) ${this.outerRadiusPercent},
        transparent ${this.outerRadiusPercent}
      )`
    );
  }

  get outerCircleClipPath() {
    const outerRadiusPercent = parseFloat(this.outerRadiusPercent) / 2 + '%';
    return this._sanitizer.bypassSecurityTrustStyle(`circle(${outerRadiusPercent} at center)`);
  }

  get gridSize() {
    return `${100 / this.gridInterval}% ${100 / this.gridInterval}%`;
  }

  get indicatorLinesStyle() {
    return {
      top: this.convertToPercent(this.max - this.outerRadius) / 2 + '%',
      bottom: (50 + this.convertToPercent(this.innerRadius - this.min) / 2) + '%',
    };
  }

  boxLeft: number = null;
  boxRight: number = null;
  boxTop: number = null;
  boxBottom: number = null;

  get boxClipPath() {
    const leftPercent = this.convertToPercent(this.boxLeft - this.min) + '%';
    const rightPercent = this.convertToPercent(this.max - this.boxRight) + '%';
    const topPercent = this.convertToPercent(this.boxTop - this.min) + '%';
    const bottomPercent = this.convertToPercent(this.max - this.boxBottom) + '%';

    return this._sanitizer.bypassSecurityTrustStyle(
      `inset(${topPercent} ${rightPercent} ${bottomPercent} ${leftPercent})`
    );
  }

  get boxFillGradient() {
    return this._sanitizer.bypassSecurityTrustStyle(
      `radial-gradient(
        circle closest-side,
        transparent ${this.innerRadiusPercent},
        rgba(var(--primary-accent-rgb), .2) ${this.innerRadiusPercent}
      )`
    );
  }

  constructor(
    private _sanitizer: DomSanitizer,
    private _cdf: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.createSlider();
    this.trackSlider();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.min || changes.max) {
      this.updateSliderOptions();
    }

    if (changes.box) {
      this.setBox();
    }
  }

  ngOnDestroy() {
    this.destroySlider();
  }

  private createSlider() {
    noUiSlider.create(this._slider.nativeElement, {
      start: [this.innerRadius, this.outerRadius],
      range: {
        'min': this.min,
        'max': this.max
      },
      orientation: 'vertical',
      direction: 'rtl'
    });
  }

  private destroySlider() {
    const slider = this._slider.nativeElement.noUiSlider;

    if (slider) {
      slider.destroy();
    }
  }

  private trackSlider() {
    this._slider.nativeElement.noUiSlider.on('update', (stringValues, handle, values) => {
      this.innerRadius = values[0];
      this.outerRadius = values[1];
      this._cdf.markForCheck();
    });

    this._slider.nativeElement.noUiSlider.on('set', (stringValues, handle, values) => {
      this.innerRadius = values[0];
      this.outerRadius = values[1];
      this.onChange(this.assembleValue());
    });
  }

  private updateSliderOptions() {
    const slider = this._slider.nativeElement.noUiSlider;

    if (slider) {
      slider.noUiSlider.updateOptions({
        range: {
          'min': this.min,
          'max': this.max
        }
      });
    }
  }

  private updateSliderValues() {
    const slider = this._slider.nativeElement.noUiSlider;

    if (slider) {
      slider.set([this.innerRadius, this.outerRadius]);
    }
  }

  private assembleValue() {
    return `${this.innerRadius},${this.outerRadius}`;
  }

  private setBox() {
    const boxValues = this.box.split(',');
    if (boxValues.length < 4) {
      console.error(`box must be a string of at least 4 numbers separated by commas (i.e. "10,100,40,200"). Received ${this.box}`);
      this.boxLeft = null;
      this.boxRight = null;
      this.boxTop = null;
      this.boxBottom = null;
      return;
    }

    this.boxLeft = +boxValues[0];
    this.boxRight = +boxValues[1];
    this.boxTop = +boxValues[2];
    this.boxBottom = +boxValues[3];
  }

  onChange = (value: string) => {};
  onTouched = () => {};

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled !== undefined) {
      this._cdf.markForCheck();
    }
  }

  writeValue(value: string) {
    if (value) {
      const values = value.split(',');
      if (values.length < 2) {
        console.error(`value must be a string of at least 2 numbers separated by a comma (i.e. "10,100"). Received ${value}`);
        return;
      }

      this.innerRadius = +values[0];
      this.outerRadius = +values[1];

      this.updateSliderValues();
    }
  }

  private convertToPercent(value) {
    return value / (this.max - this.min) * 100;
  }
}
