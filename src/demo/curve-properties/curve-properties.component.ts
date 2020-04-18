import { Component, Input } from '@angular/core';
import { DropdownItem } from '../../atomic/components/dropdown/dropdown.interfaces';
import { TextboxSize } from '../../atomic/components/textbox/textbox.enums';
import { DDSize, DDTemplate } from '../../atomic/components/dropdown/dropdown.enums';

@Component({
  selector: 'h2-curve-properties',
  templateUrl: './curve-properties.component.html',
  styleUrls: ['./curve-properties.component.scss']
})
export class CurvePropertiesComponent {
  @Input() curveName = '';

  lineThicknessDropdown: DropdownItem[] = [
    { value: { thickness: 1 } },
    { value: { thickness: 2 } },
    { value: { thickness: 3 } },
    { value: { thickness: 4 } },
    { value: { thickness: 5 } }
  ];

  lineStyleDropdown: DropdownItem[] = [
    { text: 'Style 1', value: { style: 1 } },
    { text: 'Style 2', value: { style: 2 } },
    { text: 'Style 3', value: { style: 3 } },
    { text: 'Style 4', value: { style: 4 } },
    { text: 'Style 5', value: { style: 5 } }
  ];

  smoothingMethodDropdown: DropdownItem[] = [
    { text: 'Block', value: 'Block' },
    { text: 'Triangle', value: 'Triangle' },
    { text: 'Gaussian', value: 'Gaussian' },
    { text: 'FFT', value: 'FFT' }
  ];

  rawLog = {
    lineThickness: 1,
    lineStyle: 1,
    lineColor: '#FFE082',
    visible: true
  };
  squaredLog = {
    lineThickness: 2,
    lineStyle: 2,
    lineColor: '#BA68C8',
    visible: false
  };
  convolvedLog = {
    lineThickness: 3,
    lineStyle: 3,
    lineColor: '#FF7043',
    visible: true
  };
  timeScaleMin = 0;
  timeScaleMax = 2000;
  bedTolerance = 0.25;
  smoothingMethod = 'Triangle';
  stepSize = 1;
  valueTolerance = 0.1;
  windowLength = 8;

  TextboxSize = TextboxSize;
  DDTemplate = DDTemplate;
  DDSize = DDSize;
}
