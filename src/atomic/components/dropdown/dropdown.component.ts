import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { DDSize, DDTemplate, DDTexAlign } from './dropdown.enums';
import { DropdownItem } from './dropdown.interfaces';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LabelAlign } from '../label/label.enums';
import { Icon } from '../icon/icon.enum';
import { objGet } from '../../common/utils';

@Component({
  selector: 'h2-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() items: DropdownItem[] = [];
  @Input() value: string | number;
  @Input() accessor = 'value'; // object property path (dot notation supported: i.e. value.property2.property3)
  @Input() placeholder = '';
  @Input() preselect = true;
  @Input() size = DDSize.Large;
  @Input() disabled = false;
  @Input() textAlign = DDTexAlign.Left;
  @Input() label: string;
  @Input() borderless = false;
  @ViewChild('textTemplate') textTemplate: TemplateRef<void>;
  @ViewChild('lineThicknessTemplate') lineThicknessTemplate: TemplateRef<void>;
  @ViewChild('lineStyleTemplate') lineStyleTemplate: TemplateRef<void>;
  @ViewChild('markerStyleTemplate') markerStyleTemplate: TemplateRef<void>;
  @ViewChild('commandTemplate') commandTemplate: TemplateRef<void>;
  @ViewChild('colorGradientTemplate') colorGradientTemplate: TemplateRef<void>;
  @Input() itemTemplate: TemplateRef<void> | string = DDTemplate.Text;
  @Input() cmdTmplate = false;
  @Output() iconClicked = new EventEmitter<any>();

  open = false;
  LabelAlign = LabelAlign;
  Icon = Icon;

  constructor(private _cdf: ChangeDetectorRef) { }

  get template() {
    if (typeof this.itemTemplate === 'string') {
      switch (this.itemTemplate) {
        case DDTemplate.Text:
          return this.textTemplate;
        case DDTemplate.LineThickness:
          return this.lineThicknessTemplate;
        case DDTemplate.LineStyle:
          return this.lineStyleTemplate;
        case DDTemplate.MarkerStyle:
          return this.markerStyleTemplate;
        case DDTemplate.Command:
          return this.commandTemplate;
        case DDTemplate.ColorGradient:
          return this.colorGradientTemplate;
      }
    }
    return this.itemTemplate;
  }

  get selected() {
    return this.items.find(item => objGet(item, this.accessor) === this.value && this.preselect);
  }

  onIconClicked(item: any, icon: Icon) {

    // Add Icon specific functionality that should be built in to the List Panel here
    switch (icon) {
      case Icon.ViewDisable:
        // TODO: move this out so that we don't mutate the data for NgRx
        item.checked = !item.checked;
        break;
    }

    this.iconClicked.emit({
      item,
      icon: icon
    });

  }

  onChange = (value: string | number) => { };
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
      this._cdf.markForCheck();
    }
  }

  writeValue(value: string | number) {
    if (value !== undefined) {
      this.value = value;
      this._cdf.markForCheck();
    }
  }

  getButtonClasses(additionalClasses = []) {
    return this.borderless
      ? ['h2-dropdown-control--borderless', this.textAlign, ...additionalClasses]
      : ['h2-dropdown-control', this.size, this.textAlign, ...additionalClasses];
  }

  // This is necessary for automation testing
  getItemUniqueClass(prefix: string, item: DropdownItem | string | number) {
    if (!item && item !== 0) {
      return '';
    }
    const value = typeof item === 'object' ? objGet(item, this.accessor) : item;
    return prefix + value;
  }

  onItemClick(item: DropdownItem) {
    const value = objGet(item, this.accessor);
    this.open = false;

    if (!this.preselect && !item.disabled) {
      this._updateValue(value);
      this.preselect = true;
    }

    if (value !== this.value && !item.disabled) {
      this._updateValue(value);
    }
  }

  private _updateValue(value: any) {
    this.value = value;
    this.onChange(value);
  }
}
