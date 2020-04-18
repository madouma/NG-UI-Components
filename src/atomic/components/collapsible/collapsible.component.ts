import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'h2-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss'],
  animations: [
    trigger('expandCollapseAnimation', [
      state('collapsed', style({ visibility: 'hidden', opacity: '0', height: 0 })),
      state('expanded', style({ visibility: 'visible', opacity: '1', height: '*' })),
      transition('collapsed => expanded', animate('150ms ease-in')),
      transition('expanded => collapsed', animate('150ms ease-out'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollapsibleComponent {
  @Input() collapsed = true;
  @Input() disabled = false;

  @HostBinding('@expandCollapseAnimation') get expandCollapseState() {
    return this.collapsed && !this.disabled ? 'collapsed' : 'expanded';
  }
}
