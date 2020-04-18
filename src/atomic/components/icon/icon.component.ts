import { InlineSVGModule } from 'ng-inline-svg';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Icon } from './icon.enum';

@Component({
  selector: 'h2-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-icon]': 'icon'
  }
})
export class IconComponent {
  @Input() icon: Icon;
  @Input() tooltip: string = '';
}
