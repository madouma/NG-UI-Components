import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkOverlayOrigin, ConnectionPositionPair } from '@angular/cdk/overlay';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'h2-reveal-truncated-text',
  templateUrl: './reveal-truncated-text.component.html',
  styleUrls: ['./reveal-truncated-text.component.scss'],
  animations: [
    trigger('tooltipAnimation', [
      state('void', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('* => true', animate(100)),
      transition('* => void', animate(100)),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevealTruncatedTextComponent {
  @Input() content: string;
  @Input() visible = false;

  private _offset = 5;

  overlayOrigin: CdkOverlayOrigin;

  positions: ConnectionPositionPair[] = [
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: this._offset
    },
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -this._offset
    }
  ];

  constructor(private _cdf: ChangeDetectorRef) {}

  show() {
    this.visible = true;
    this.markForCheck();
    console.log(this.content);
  }

  hide() {
    this.visible = false;
    this.markForCheck();
  }

  setOverlayOrigin(origin: CdkOverlayOrigin) {
    this.overlayOrigin = origin;
    this.markForCheck();
  }

  markForCheck() {
    this._cdf.markForCheck();
  }
}
