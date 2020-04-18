import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  forwardRef,
  Input, Output,
  PipeTransform,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { TextboxSize, TextboxTexAlign, TextboxType } from './textbox.enums';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelAlign, LabelType } from '../label/label.enums';
import { TooltipType } from '../tooltip/tooltip.enums';
import { Icon } from '../icon/icon.enum';

@Component({
  selector: 'h2-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextboxComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextboxComponent implements ControlValueAccessor {
  @Input() size = TextboxSize.Large;
  @Input() textAlign = TextboxTexAlign.Left;
  @Input() placeholder = '';
  @Input() value = '';
  @Input() label: string;
  @Input() units: string;
  @Input() type = TextboxType.Text;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() tooltip = '';
  @Input() format: [PipeTransform, any]; // [ PipeInstance, ...arguments ]
  @Input() datePicker = false;
  @Input() datePikerMode: string;
  @Input() errorMsg = '';
  @Input() loading = false;
  @Input() success = false;
  @Input() displayAsTooltip = false;
  @Input() min: any;
  @Input() max: any;
  @Input() iconTemplate: TemplateRef<void> | string = '';

  @Output() blur = new EventEmitter<HTMLInputElement>();
  @Output() focus = new EventEmitter<HTMLInputElement>();
  @Output() dateChanged = new EventEmitter<Date>();

  @ViewChild('textbox') textboxInput: ElementRef<HTMLInputElement>;

  LabelType = LabelType;
  LabelAlign = LabelAlign;
  Icon = Icon;

  constructor(private _cdf: ChangeDetectorRef) { }

  get tooltipType() {
    return this.errorMsg ? TooltipType.Hazard : TooltipType.Info;
  }

  get tooltipMsg() {
    return this.errorMsg ? this.errorMsg : this.tooltip;
  }

  get showCheckmark() {
    return this.success && !this.errorMsg;
  }

  get showSpinner() {
    return this.loading && !this.success && !this.errorMsg;
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
      this.disabled = isDisabled;
      this._cdf.markForCheck();
    }
  }

  writeValue(value: string) {
    if (value !== undefined) {
      this.value = value;
      this._cdf.markForCheck();
    }
  }

  formatValue = (value: string) => {
    const pipe = this.format[0];
    const args = this.format.slice(1);
    return pipe.transform(value, ...args);
  }

  blurOut() {
    this.textboxInput.nativeElement.blur();
  }

  onBlur() {
    this.blur.emit(this.textboxInput.nativeElement);
    this.onTouched();
  }

  onFocus() {
    this.focus.emit(this.textboxInput.nativeElement);
  }

  dateModelChanged(date) {
    if (this.datePikerMode === 'range') {
      if (date.from && date.to) {
        this.dateChanged.emit(date);
      }
    } else {
      this.dateChanged.emit(date);
    }
  }

  get template() {
    if (this.iconTemplate) { return this.iconTemplate; }
    if (this.showCheckmark) { return Icon.Checkmark; }
  }
}
