import { Component, Input, TemplateRef, HostBinding, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ButtonType, ButtonStyle } from '../button/button.enums';
import { Icon } from '../icon/icon.enum';

@Component({
  selector: 'h2-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetComponent {
  @Input() itemTemplate: TemplateRef<void> | string;
  @Input() height = 'auto';
  @Input() borderlessBody: boolean;
  @Input() enableCollapse = true;
  @Input() enableClose = true;
  @Input() collapsed = false;
  @Output() closed = new EventEmitter();

  ButtonType = ButtonType;
  ButtonStyle = ButtonStyle;
  Icon = Icon;

  @HostBinding('style.height') get updateHeight() {
    return this.height;
  }
}
