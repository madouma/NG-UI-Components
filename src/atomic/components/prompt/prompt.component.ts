import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '../icon/icon.enum';
import { ButtonStyle, ButtonType } from '../button/button.enums';
import { DialogType } from '../dialog/dialog.enums';
import { PromptAction } from './prompt.enums';

@Component({
  selector: 'h2-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromptComponent {
  @Input() title: string;
  @Input() primaryCopy: string;
  @Input() secondaryCopy: string;
  @Input() primaryBtnLabel: string;
  @Input() secondaryBtnLabel: string;
  @Input() type = DialogType.Caution;
  @Input() showPrompt = false;

  @Output() action = new EventEmitter<PromptAction>();
  @Output() closed = new EventEmitter<PromptAction>();

  Icon = Icon;
  ButtonType = ButtonType;
  ButtonStyle = ButtonStyle;

  get buttonType() {
    switch (this.type) {
      case DialogType.Hazard:
        return ButtonType.Hazard;
      case DialogType.Caution:
        return ButtonType.Caution;
      case DialogType.Success:
        return ButtonType.Success;
      case DialogType.Info:
        return ButtonType.Info;
    }
    return ButtonType.A;
  }

  onPrimaryBtnClicked() {
    this.showPrompt = false;
    this.action.emit(PromptAction.Primary);
  }

  onSecondaryBtnClicked() {
    this.showPrompt = false;
    this.action.emit(PromptAction.Secondary);
  }

  onClosed() {
    this.closed.emit();
  }
}
