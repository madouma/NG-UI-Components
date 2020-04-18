import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'h2-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent {
  @Input() open = false;
  @Input() overlayOrigin: CdkOverlayOrigin;
  @Input() offset = 4;

  @Output() openChange = new EventEmitter<boolean>();

  hasBackdrop = true;

  get positions() {
    return [
      {
        // BOTTOM
        originX : 'center',
        originY : 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: this.offset
      },
      {
        // TOP
        originX : 'center',
        originY : 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -this.offset
      }
    ];
  }

  hide() {
    this.open = false;
    this.openChange.emit(this.open);
  }
}
