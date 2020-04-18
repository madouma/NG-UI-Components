import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonType, ButtonStyle } from '../button/button.enums';

@Component({
  selector: 'h2-panel-header-bar',
  templateUrl: './panel-header-bar.component.html',
  styleUrls: ['./panel-header-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelHeaderBarComponent {
  @Input() text: string;
  @Input() enableCollapse: boolean = false;
  @Input() collapsed: boolean = false;
  @Input() toggleButtonTexts: string[];
  @Input() toggleButtonState: boolean;
  @Output() toggleCollapseAll = new EventEmitter<any>();
  @Output() clickVisibilityButton = new EventEmitter<any>();

  ButtonType = ButtonType;
  ButtonStyle = ButtonStyle;

  public toggleAllBars() {
    this.toggleCollapseAll.emit(!this.collapsed);
  }

  public toggleButtonClick() {
    this.toggleButtonState = !this.toggleButtonState;
    this.clickVisibilityButton.emit();
  }

  public getButtonText() {
    if (!this.toggleButtonTexts || !this.toggleButtonTexts.length) return;
    return this.toggleButtonState ? this.toggleButtonTexts[0] : this.toggleButtonTexts[1];
  }
}
