import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import { TooltipPosition, TooltipType } from './tooltip.enums';
import { animate, state, style, transition, trigger } from '@angular/animations';

const TOOLTIP_OFFSET = 10;
const TOOLTIP_POSITIONS: { [key: string]: ConnectionPositionPair } = {
  [TooltipPosition.Top]: {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -TOOLTIP_OFFSET
  },
  [TooltipPosition.Bottom]: {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: TOOLTIP_OFFSET
  },
  [TooltipPosition.Left]: {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -TOOLTIP_OFFSET
  },
  [TooltipPosition.Right]: {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: TOOLTIP_OFFSET
  }
};

@Component({
  selector: 'h2-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
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
export class TooltipComponent {
  @Input() content: TemplateRef<any> | string = '';
  @Input() visible = false;
  @Input() type: TooltipType = TooltipType.Info;

  @Input()
  private _positions = [];
  get positions() {
    return this._positions;
  }
  // noinspection TypeScriptValidateTypes
  set positions(positions: TooltipPosition[]) {
    this._positions = positions.map(p => TOOLTIP_POSITIONS[p]);
  }

  @Output() visibleChange = new EventEmitter<boolean>();

  overlayOrigin: CdkOverlayOrigin;
  // Needs to be a string when used with ngClass
  placement: TooltipPosition = <TooltipPosition>'';

  constructor(private _cdf: ChangeDetectorRef) {}

  get contentIsTemplate() {
    return this.content instanceof TemplateRef;
  }

  show() {
    this.visible = true;
    this.visibleChange.emit(this.visible);
    this.markForCheck();
  }

  hide() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.markForCheck();
  }

  setOverlayOrigin(origin: CdkOverlayOrigin) {
    this.overlayOrigin = origin;
    this.markForCheck();
  }

  onPositionChange(event: ConnectedOverlayPositionChange) {
    for (const key in TOOLTIP_POSITIONS) {
      if (JSON.stringify(event.connectionPair) === JSON.stringify(TOOLTIP_POSITIONS[key])) {
        if (this.placement !== key) {
          this.placement = <TooltipPosition>key;
          this._cdf.detectChanges();
        }
        break;
      }
    }
  }

  markForCheck() {
    this._cdf.markForCheck();
  }
}
