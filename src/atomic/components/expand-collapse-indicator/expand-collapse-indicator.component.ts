import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'h2-expand-collapse-indicator',
  templateUrl: './expand-collapse-indicator.component.html',
  styleUrls: ['./expand-collapse-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpandCollapseIndicatorComponent {
  @Input() collapsed: boolean;

  @HostBinding('class.h2--collapsed') get collapsedClass() {
    return this.collapsed;
  }
}
