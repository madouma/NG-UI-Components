import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LabelAlign, LabelType } from './label.enums';

@Component({
  selector: 'h2-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent {
  @Input() text = '';
  @Input() type = LabelType.Default;
  @Input() align = LabelAlign.Left;
}
