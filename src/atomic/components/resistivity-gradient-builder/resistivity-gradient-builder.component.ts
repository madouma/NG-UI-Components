// tslint:disable:max-line-length
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import * as noUiSlider from 'nouislider';

import { GradientMap } from './resistivity-gradient-step';
import { RGBuilderScale } from './resistivity-gradient-builder.enums';
import { TextboxSize, TextboxTexAlign, TextboxType } from '../textbox/textbox.enums';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'h2-resistivity-gradient-builder',
  templateUrl: './resistivity-gradient-builder.component.html',
  styleUrls: ['./resistivity-gradient-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResistivityGradientBuilderComponent implements OnInit {
  @ViewChild('mySlider') private _slider: ElementRef;
  @ViewChild('inputWrapper') private _inputWrapperElRef: ElementRef<HTMLElement>;

  @Input() stepPercent = 5;

  private _map: GradientMap = new GradientMap({});
  @Input()
  set map(value: GradientMap) {
    if (value) {
      this.linearGridLines = value.rangePercentConverter.grid;
    }
    this._map = value;
  }
  get map() {
    return this._map;
  }

  @Input() scale = RGBuilderScale.Logarithmic;
  @Output() mapChanged = new EventEmitter<GradientMap>();

  RGBuilderScale = RGBuilderScale;
  TextboxType = TextboxType;
  TextboxTextAlign = TextboxTexAlign;
  TextboxSize = TextboxSize;

  min = 0;
  max = 100;
  linearGridLines =  new Array(9);
  // TODO: add logarithmic grid lines
  selectedHandleLeft: number = null;
  currentInputValue;
  inputOffset = 0;
  errorMsg = '';

  get sliderInputStyles() {
    return {
      backgroundImage: `
        ${this.computeGradient()},
        linear-gradient(45deg, rgb(255, 255, 255, 0.14) 25%, transparent 25%),
        linear-gradient(135deg, rgb(255, 255, 255, 0.14) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgb(255, 255, 255, 0.14) 75%),
        linear-gradient(135deg, transparent 75%, rgb(255, 255, 255, 0.14) 75%)
      `
    };
  }

  constructor(
    private _cdr: ChangeDetectorRef,
    private _hostElRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit() {
    this.update();
  }

  update() {
    this.currentInputValue = '' + this.map.resistivityPoints[this.map.selectedIndex];
    if (this._slider.nativeElement.noUiSlider) {
      this._slider.nativeElement.noUiSlider.destroy();
    }
    this.create();
    this.track();
  }

  private create() {
    noUiSlider.create(this._slider.nativeElement, {
      start: this.map.resistivityPoints.map(pt => this.map.rangePercentConverter && this.map.rangePercentConverter.toPercent(pt)),
      behaviour: 'unconstrained-tap',
      range: {
        'min': this.min,
        'max': this.max
      }
    });

    this.setHandlesBgColor();
    this.selectedHandleLeft = this.map.rangePercentConverter && this.map.rangePercentConverter.toPercent(this.map.resistivityPoints[this.map.selectedIndex]);

    this.mapChanged.emit(this.map);
    this.select();
  }

  private track() {
    this._slider.nativeElement.noUiSlider.on('start', (_, selected, positions) => {
      this.map.selectedIndex = selected;
      this.selectedHandleLeft = positions[selected];
      this.currentInputValue = this.map.resistivityPoints[this.map.selectedIndex];
      this.mapChanged.emit(this.map);
      this._cdr.markForCheck();
      this.select();
    });

    this._slider.nativeElement.noUiSlider.on('slide', (_, selected, positions) => {
      this.onSlideAndSet(selected, positions);
    });

    this._slider.nativeElement.noUiSlider.on('set', (_, selected, positions) => {
      this.onSlideAndSet(selected, positions);
    });
  }

  private onSlideAndSet(selected, positions) {
    this.map.selectedIndex = selected;
    this.selectedHandleLeft = positions[selected];
    this.currentInputValue = this.map.resistivityPoints[this.map.selectedIndex];
    positions.forEach((p, i) => {
      this.map.steps[i].resistivityPoint = this.map.rangePercentConverter.toRange(p);
    });
    this.mapChanged.emit(this.map);
    this._cdr.markForCheck();
    this.select();
  }

  private setInputOffset() {
    if (this._inputWrapperElRef) {
      const wrapper = this._inputWrapperElRef.nativeElement.getBoundingClientRect();
      const host = this._hostElRef.nativeElement.getBoundingClientRect();

      // +/- 1 because border gets cropped
      if (wrapper.left < host.left) {
        this.inputOffset = host.left - wrapper.left + 1;
      } else if (wrapper.right > host.right) {
        this.inputOffset = host.right - wrapper.right - 1;
      } else {
        this.inputOffset = 0;
      }
    }
  }

  private setHandlesBgColor() {
    const handles = <HTMLElement[]>Array.from(this._slider.nativeElement.querySelectorAll('.noUi-handle'));
    handles.forEach((handle, index) => {
      handle.style.backgroundColor = this.map.colors[index] && this.map.colors[index].hex;
    });
  }

  private hexToRgba(hex, opacity) {
    if (!hex) return '';
    let r, g, b;
    hex = hex.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);

    const result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    return result;
  }

  private computeGradient(): string {
    const steps = this.map.toSortedSteps();
    let gradient = 'linear-gradient(90deg';

    steps.forEach(step => {
      gradient += `,${this.hexToRgba(step && step.hex, step.alpha)} ${this.getPercent(this.map.rangePercentConverter.toPercent(step.resistivityPoint))}%`;
    });

    return gradient + ')';
  }

  private select() {
    // noUi-origin is the handle wrapper
    const handles = Array.from((<HTMLElement>this._slider.nativeElement).getElementsByClassName('noUi-origin'));
    for (const h of handles) {
      h.classList.remove('h2-slider-handle-active');
    }

    if (handles[this.map.selectedIndex]) {
      handles[this.map.selectedIndex].classList.add('h2-slider-handle-active');
    }
  }

  getPercent(position) {
    return (position - this.min) / (this.max - this.min) * 100;
  }

  add() {
    const converter = this.map.rangePercentConverter;
    const resPoints = this.map.toSortedSteps().map(x => x.resistivityPoint);
    let selected = resPoints.indexOf(this.map.steps[this.map.selectedIndex || 0].resistivityPoint);
    let p;

    for (let i = 0; i < resPoints.length; ++i, ++selected) {
      const percentOfRes = converter.toPercent(resPoints[selected]);

      if (selected === resPoints.length - 1) {
        if (percentOfRes + this.stepPercent <= this.max) {
          p = converter.toRange(percentOfRes + this.stepPercent);
          break;
        } else if (this.min + this.stepPercent <= percentOfRes) {
          p = this.min;
          break;
        } else {
          selected = 0;
        }
      }
      if (resPoints[selected] + (this.stepPercent * 2) <= resPoints[selected + 1]) {
        p = converter.toRange(percentOfRes + this.stepPercent);
        break;
      }
      if (i === resPoints.length - 1) {
        return;
      }
    }

    this.map.add(p);
    this.update();
  }

  delete() {
    this.map.delete();
    this.update();
  }

  validate(value) {
    const range = this.map.resistivityRange;
    const resistivity = parseFloat(value);
    this.errorMsg = resistivity < range.min || resistivity > range.max || value === ''
      ? `Resistivity must be between ${range.min} and ${range.max}`
      : '';
  }

  onColorHexChange(hex: string) {
    if (this.map.colors[this.map.selectedIndex]) {
      this.map.colors[this.map.selectedIndex].hex = hex;
    }
    this.mapChanged.emit(this.map);
    this.update();
  }

  onColorAlphaChange(alpha: number) {
    if (this.map.colors[this.map.selectedIndex]) {
      this.map.colors[this.map.selectedIndex].alpha = alpha;
    }
    this.mapChanged.emit(this.map);
    this.update();
  }

  onInputFocus(input: HTMLInputElement) {
    this.setInputOffset();
  }

  onInputBlur(input: HTMLInputElement) {
    this.updateValueViaInput(input.value);
    this.inputOffset = 0;
  }

  // TODO: this is a bit hackish. Find a better way to do this.
  resetInputValue() {
    this.currentInputValue = null;
    this._cdr.detectChanges();
    this.currentInputValue = this.map.resistivityPoints[this.map.selectedIndex];
    this._cdr.detectChanges();
  }

  updateValueViaInput(value) {
    if (!this.errorMsg) {
      this.map.steps[this.map.selectedIndex].resistivityPoint = parseFloat(value);
      this.mapChanged.emit(this.map);
      this.update();
    } else {
      this.resetInputValue();
    }
    this.errorMsg = '';
  }
}
