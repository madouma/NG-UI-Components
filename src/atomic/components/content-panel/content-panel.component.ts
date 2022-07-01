import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'h2-content-panel',
  templateUrl: './content-panel.component.html',
  styleUrls: ['./content-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.h2--disable]': 'disable'
  }
})
export class ContentPanelComponent {
  @Input() disable = false;

  @Input() width = 'none';

  @HostBinding('style.max-width') get maxWidth() {
    return this.width;
  }
}
