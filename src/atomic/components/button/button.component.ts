import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonSize, ButtonStyle, ButtonType } from './button.enums';
import { Icon } from '../icon/icon.enum';

@Component({
  selector: 'h2-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() size = ButtonSize.Small;
  @Input() type = ButtonType.B;
  @Input() style = ButtonStyle.Primary;
  @Input() wrapper = true;
  @Input() disabled = false;
  @Input() icon: Icon;
  @Input() text: string;
  @Input() noFloat = false;
  @Input() loading = false;
  @Input() success = false;
  @Input() iconTextSpacer = false;
  @Input() controlBox = true;

  @Output() clicked = new EventEmitter<MouseEvent>();

  Icon = Icon;

  get loadingClass() {
    return this.loading ? 'h2--loading' : '';
  }

  constructor(private _cdf: ChangeDetectorRef) { }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled !== undefined) {
      this.disabled = isDisabled;
      this._cdf.markForCheck();
    }
  }

  onClick(event: MouseEvent) {
    this.clicked.emit(event);
  }
}
