import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { Icon } from '../icon/icon.enum';
import { ButtonType, ButtonStyle } from '../button/button.enums';

@Component({
  selector: 'h2-properties-bar',
  templateUrl: './properties-bar.component.html',
  styleUrls: ['./properties-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesBarComponent implements OnChanges, AfterContentInit {
  @Input() text: string;
  @Input() enableCollapse = false;
  @Input() collapsed = false;
  @Input() enableVisibilitySwitch = false;
  @Input() enableClose = false;
  @Input() visible = true;
  @Input() enableDelete = false;
  @Input() disabled = false;

  @Output() visibilitySwitched = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  @HostBinding('class.h2--hidden') get hiddenClass() {
    return !this.visible;
  }

  // TODO: maybe update this to use a Directive to select allowed components/elements
  @ContentChildren('control') propertiesControls: QueryList<any>;

  Icon = Icon;
  ButtonType = ButtonType;
  ButtonStyle = ButtonStyle;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.visible) {
      this.updateControlsVisibility();
    }
  }

  ngAfterContentInit() {
    this.updateControlsVisibility();
  }

  updateControlsVisibility() {
    if (this.propertiesControls) {
      this.propertiesControls.forEach((control) => {
        if (control.setDisabledState) {
          control.setDisabledState(!this.visible);
        }
      });
    }
  }

  onVisibilityChange(visible: boolean) {
    this.visibilitySwitched.emit(visible);
    this.updateControlsVisibility();
  }

  onDeleteClicked(evt: any) {
    this.onDelete.emit();
    evt.stopPropagation();
  }
}
