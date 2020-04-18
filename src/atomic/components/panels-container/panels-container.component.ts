import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'h2-panels-container',
  templateUrl: './panels-container.component.html',
  styleUrls: ['./panels-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelsContainerComponent {
  @Input() width = 'none';

  @HostBinding('style.max-width') get maxWidth() {
    return this.width;
  }
}
