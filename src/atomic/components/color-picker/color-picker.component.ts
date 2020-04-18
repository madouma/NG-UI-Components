import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { ButtonStyle, ButtonType } from '../button/button.enums';
import { CPickerSize } from './color-picker.enums';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Icon } from '../icon/icon.enum';
import { LabelAlign } from '../label/label.enums';

@Component({
  selector: 'h2-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerComponent implements ControlValueAccessor {
  @Input() selectedColor: string;
  @Input() size = CPickerSize.XSmall;
  @Input() disabled = false;
  @Input() showOpacitySlider = true;
  @Input() opacity = 100; // Valid range [0 - 100]
  @Input() showIcon = true;
  @Input() label: string;

  @Output() opacityChange = new EventEmitter<number>();

  @ViewChild('popover') popover: ElementRef;

  ButtonType = ButtonType;
  ButtonStyle = ButtonStyle;
  Icon = Icon;
  LabelAlign = LabelAlign;

  open = false;
  colorPalette: string[][] = [
    [
      '#000000', '#FFFFFF', '#FF0000', '#FF00FF', '#8A2BE2', '#0000FF',
      '#00C2FF', '#008000', '#00FF00', '#FFFF00', '#FF7700'
    ],
    [
      '#EF9A9A', '#F48FB1', '#CE93D8', '#B39DDB', '#9FA8DA', '#90CAF9',
      '#81D4FA', '#80DEEA', '#80CBC4', '#A5D6A7', '#C5E1A5', '#E6EE9C',
      '#FFF59D', '#FFE082', '#FFCC80', '#FFAB91', '#BCAAA4', '#F3F3F3',
      '#B0BEC5',
    ],
    [
      '#E57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB', '#64B5F6',
      '#4FC3F7', '#4DD0E1', '#4DB6AC', '#81C784', '#AED581', '#DCE775',
      '#FFF59D', '#FFD54F', '#FFB74D', '#FF8A65', '#A1887F', '#E0E0E0',
      '#90A4AE',
    ],
    [
      '#EF5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5',
      '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157',
      '#FFEE58', '#FFCA28', '#FF9800', '#FF7043', '#8D6E63', '#BDBDBD',
      '#78909C',
    ],
    [
      '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
      '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
      '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E',
      '#607D8B',
    ],
    [
      '#E53935', '#D81B60', '#8E24AA', '#5E35B1', '#3949AB', '#1E88E5',
      '#039BE5', '#00ACC1', '#00897B', '#43A047', '#7CB342', '#C0CA33',
      '#FDD835', '#FFB300', '#FB8C00', '#F4511E', '#6D4C41', '#757575',
      '#546E7A',
    ],
    [
      '#D32F2F', '#C2185B', '#7B1FA2', '#512DA8', '#303F9F', '#1976D2',
      '#0288D1', '#0097A7', '#00796B', '#388E3C', '#689F38', '#AFB42B',
      '#FBC02D', '#FFA000', '#F57C00', '#E64A19', '#5D4037', '#4E4E4E',
      '#455A64',
    ],
    [
      '#C62828', '#AD1457', '#6A1B9A', '#4527A0', '#283593', '#1565C0',
      '#0277BD', '#00838F', '#00695C', '#2E7D32', '#558B2F', '#9E9D24',
      '#F9A825', '#FF8F00', '#EF6C00', '#D84315', '#4E342E', '#373737',
      '#37474F',
    ],
    [
      '#B71C1C', '#880E4F', '#4A148C', '#311B92', '#1A237E', '#0D47A1',
      '#01579B', '#006064', '#004D40', '#1B5E20', '#33691E', '#827717',
      '#F57F17', '#FF6F00', '#E65100', '#BF360C', '#3E2723', '#272727',
      '#263238',
    ]
  ];

  constructor(private _cdf: ChangeDetectorRef) { }

  onChange = (selectedColor: string) => {};
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

  writeValue(selectedColor: string) {
    if (selectedColor !== undefined) {
      this.selectedColor = selectedColor;
      this._cdf.markForCheck();
    }
  }

  // This necessary for automation testing
  getUniqueColorClass(prefix, color: string) {
    if (!color) {
      return '';
    }
    return prefix + color.replace('#', '');
  }

  onSelectColor(color: string) {
    if (color !== this.selectedColor) {
      this.selectedColor = color;
      this.onChange(color);
    }
    this.open = false;
  }

  onOpacityChange(opacity: number) {
    this.opacity = opacity;
    this.opacityChange.emit(opacity);
    this._cdf.markForCheck();
  }
}
