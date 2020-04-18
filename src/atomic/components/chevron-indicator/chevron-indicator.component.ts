import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Icon } from '../icon/icon.enum';

@Component({
  selector: 'h2-chevron-indicator',
  templateUrl: './chevron-indicator.component.html',
  styleUrls: ['./chevron-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChevronIndicatorComponent  {
  @Input() down = true;

  Icon = Icon;
}
