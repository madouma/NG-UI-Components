import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as noUiSlider from 'nouislider';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'h2-box-trim',
  templateUrl: './box-trim.component.html',
  styleUrls: ['./box-trim.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BoxTrimComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.backgroundSize]': 'gridSize'
  }
})
export class BoxTrimComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  private _boxBeforeDrag = {
    width: <number>null,
    height: <number>null,
    yMultiplier: 1,
    xMultiplier: 1
  };
  private _subscriptions: Subscription[] = [];
  private _changed$ = new Subject();

  @Input() min = 0;
  @Input() max = 100;
  @Input() gridInterval = 8;
  @Input() doughnut: string;

  @ViewChild('horizontalSlider') private _horizontalSlider;
  @ViewChild('verticalSlider') private _verticalSlider;

  // Box values
  left: number = null;
  right: number = null;
  top: number = null;
  bottom: number = null;

  linearGridLines = new Array(6);

  get leftPercent() {
    return this.convertToPercent(this.left - this.min) + '%';
  }

  get rightPercent() {
    return this.convertToPercent(this.max - this.right) + '%';
  }

  get topPercent() {
    return this.convertToPercent(this.top - this.min) + '%';
  }

  get bottomPercent() {
    return this.convertToPercent(this.max - this.bottom) + '%';
  }
  
  get horizontalCenterPercent() {
    return this.convertToPercent((this.right - this.left) / 2 + (this.left - this.min)) + '%';
  }

  get verticalCenterPercent() {
    return this.convertToPercent((this.bottom - this.top) / 2 + (this.top - this.min)) + '%';
  }

  get outlineBoxClipPath() {
    return this._sanitizer.bypassSecurityTrustStyle(
      `inset(${this.topPercent} ${this.rightPercent} ${this.bottomPercent} ${this.leftPercent})`
    );
  }

  get gridSize() {
    return `${100 / this.gridInterval}% ${100 / this.gridInterval}%`;
  }

  doughnutInnerRadius: number = null;
  doughnutOuterRadius: number = null;

  get doughnutBackgroundGradient() {
    const innerRadiusPercent = this.convertToPercent(this.doughnutInnerRadius - this.min) + '%';
    const outerRadiusPercent = this.convertToPercent(this.doughnutOuterRadius - this.min) + '%';

    return this._sanitizer.bypassSecurityTrustStyle(
      `radial-gradient(
        circle closest-side,
        transparent ${innerRadiusPercent}, 
        rgba(var(--primary-accent-rgb), .2) ${innerRadiusPercent},
        rgba(var(--primary-accent-rgb), .2) ${outerRadiusPercent},
        transparent ${outerRadiusPercent}
      )`
    );
  }

  constructor(
    private _elRef: ElementRef<HTMLElement>,
    private _sanitizer: DomSanitizer,
    private _cdf: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.createSliders();
    this.trackSliders();

    this._subscriptions.push(
      this._changed$.pipe(debounceTime(100)).subscribe(() => {
        this.onChange(this.assembleValue());
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.min || changes.max) {
      this.updateSliderOptions();
    }
    if (changes.doughnut) {
      this.setDoughnut();
    }
  }

  getGridMarks(i: number) {
    // 0 = scale default min
    // 200 = scale default max
    return ((i / (this.linearGridLines.length - 1) / .5) * (200 - 0) + 0) - (200 - 0) + 0;
  }

  ngOnDestroy() {
    this.destroySliders();
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  private createSliders() {
    noUiSlider.create(this._horizontalSlider.nativeElement, {
      start: [this.left, this.right],
      range: {
        'min': this.min,
        'max': this.max
      },
    });

    noUiSlider.create(this._verticalSlider.nativeElement, {
      start: [this.top, this.bottom],
      range: {
        'min': this.min,
        'max': this.max
      },
      orientation: 'vertical'
    });
  }

  private destroySliders() {
    const horizontalSlider = this._horizontalSlider.nativeElement.noUiSlider;
    const verticalSlider = this._verticalSlider.nativeElement.noUiSlider;

    if (horizontalSlider && verticalSlider &&
      horizontalSlider.noUiSlider && verticalSlider.noUiSlider) {
      horizontalSlider.noUiSlider.destroy();
      verticalSlider.noUiSlider.destroy();
    }
  }

  private trackSliders() {
    this._horizontalSlider.nativeElement.noUiSlider.on('update', (stringValues, handle, values) => {
      this.left = values[0];
      this.right = values[1];
      this._cdf.markForCheck();
    });

    this._verticalSlider.nativeElement.noUiSlider.on('update', (stringValues, handle, values) => {
      this.top = values[0];
      this.bottom = values[1];
      this._cdf.markForCheck();
    });

    this._horizontalSlider.nativeElement.noUiSlider.on('set', (stringValues, handle, values) => {
      this.left = values[0];
      this.right = values[1];
      this._changed$.next();
    });

    this._verticalSlider.nativeElement.noUiSlider.on('set', (stringValues, handle, values) => {
      this.top = values[0];
      this.bottom = values[1];
      this._changed$.next();
    });
  }

  private updateSliderOptions() {
    const horizontalSlider = this._horizontalSlider.nativeElement.noUiSlider;
    const verticalSlider = this._verticalSlider.nativeElement.noUiSlider;

    if (horizontalSlider && verticalSlider) {
      const range = {
        'min': this.min,
        'max': this.max
      };

      horizontalSlider.noUiSlider.updateOptions({ range });
      verticalSlider.noUiSlider.updateOptions({ range });
    }
  }

  private updateSliderValues() {
    const horizontalSlider = this._horizontalSlider.nativeElement.noUiSlider;
    const verticalSlider = this._verticalSlider.nativeElement.noUiSlider;

    if (horizontalSlider && verticalSlider) {
      horizontalSlider.set([this.left, this.right]);
      verticalSlider.set([this.top, this.bottom]);
    }
  }

  private assembleValue() {
    return `${this.left},${this.right},${this.top},${this.bottom}`;
  }

  private setDoughnut() {
    const radii = this.doughnut.split(',');
    if (radii.length < 2) {
      console.error(`doughnut must be a string of at least 2 numbers separated by commas (i.e. "10,100"). Received ${this.doughnut}`);
      this.doughnutInnerRadius = null;
      this.doughnutOuterRadius = null;
      return;
    }

    this.doughnutInnerRadius = +radii[0];
    this.doughnutOuterRadius = +radii[1];
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
      if (values.length < 4) {
        console.error(`value must be a string of at least 4 numbers separated by commas (i.e. "10,100,40,200"). Received ${value}`);
        return;
      }

      this.left = +values[0];
      this.right = +values[1];
      this.top = +values[2];
      this.bottom = +values[3];

      this.updateSliderValues();
    }
  }

  private convertToPercent(value) {
    return value / (this.max - this.min) * 100;
  }

  clamp(value: number, min: number, max: number) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }

  onDragStarted(event: CdkDragStart) {
    const boundingBox = this._elRef.nativeElement.getBoundingClientRect();
    this._boxBeforeDrag = {
      width: this.right - this.left,
      height: this.bottom - this.top,
      // Not sure why, but dividing the multiplier by 2 seems to be required
      // to make it work correctly
      xMultiplier: (this.max - this.min) / boundingBox.width / 2,
      yMultiplier: (this.max - this.min) / boundingBox.height / 2,
    };
  }

  onDragMoved(event: CdkDragMove) {
    const { width, height, xMultiplier, yMultiplier } = this._boxBeforeDrag;
    const deltaX = event.event['movementX'];
    const deltaY = event.event['movementY'];

    this.left = this.clamp(this.left + deltaX * xMultiplier, this.min, this.max - width),
    this.right = this.clamp(this.right + deltaX * xMultiplier, this.min + width, this.max),
    this.top = this.clamp(this.top + deltaY * yMultiplier, this.min, this.max - height),
    this.bottom = this.clamp(this.bottom + deltaY * yMultiplier, this.min + height, this.max)

    this.updateSliderValues();
  }

  onDragEnded(event: CdkDragEnd) {
    // Reset CDK transform, since we set the transform to none
    event.source['_activeTransform'] = { x: 0, y: 0 };
    event.source['_passiveTransform'] = { x: 0, y: 0 };
  }
}
