import { Component, Input } from '@angular/core';
import { DropdownItem } from '../../atomic/components/dropdown/dropdown.interfaces';
import { TextboxSize } from '../../atomic/components/textbox/textbox.enums';
import { DDSize, DDTemplate } from '../../atomic/components/dropdown/dropdown.enums';

@Component({
  selector: 'h2-surface-properties',
  templateUrl: './surface-properties.component.html',
  styleUrls: ['./surface-properties.component.scss']
})
export class SurfacePropertiesComponent {
  @Input() surfaceName = '';

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

  variogramTypeDropdown: DropdownItem[] = [
    { text: 'Linear', value: 'LINEAR' },
    { text: 'Cubic', value: 'CUBIC' },
    { text: 'Gaussian', value: 'GAUSSIAN' },
    { text: 'Sphere', value: 'SPHERE' },
    { text: 'Exponential', value: 'EXPONENTIAL' },
    { text: 'Penta', value: 'PENTA' },
  ];

  lineThickness = 2;
  lineStyle = 3;
  lineColor = '#009688';
  majorAxis = 2000;
  minorAxis = 2000;
  angle = 0;
  variogramType = 'CUBIC';

  TextboxSize = TextboxSize;
  DDTemplate = DDTemplate;
  DDSize = DDSize;
}
