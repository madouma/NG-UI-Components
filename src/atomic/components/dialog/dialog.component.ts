import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Icon } from '../icon/icon.enum';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ButtonStyle, ButtonType } from '../button/button.enums';
import { DomPortalHost, TemplatePortal } from '@angular/cdk/portal';
import { DialogType } from './dialog.enums';
import { DOCUMENT } from '@angular/common';
import { CdkDrag, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';

@Component({
  selector: 'h2-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('dialogAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(150)
      ]),
      transition(':leave', [
        animate(150, style({ opacity: 0 }))
      ]),
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() headerLabel = '';
  @Input() enableDrag = false;
  @Input() enableResize = false;
  @Input() showCloseIcon = true;
  @Input() showMaximizeIcon = false;
  @Input() showBackdrop = false;
  @Input() dismissOnBackdropClick = false;
  @Input() dismissOnEscPress = true;
  @Input() type = DialogType.Default;

  @Input() width = '830px';
  @Input() minWidth = '450px';
  @Input() height = '430px';
  @Input() minHeight = '200px';

  private _showDialog = false;
  @Input() get showDialog() {
    return this._showDialog;
  }

  set showDialog(open: boolean) {
    this._showDialog = open;
    this.showDialogChange.emit(open);
    this.attachDetachDialog();
  }

  @Output() showDialogChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter();

  @ViewChild('dialogPortal', {static: false}) dialogPortal: TemplatePortal;
  @ViewChild('dialogWrapper', {static: false}) dialogWrapper: ElementRef<HTMLElement>;
  @ViewChild('dialogCdkDrag', {static: false}) dialogCdkDrag: CdkDrag;

  Icon = Icon;
  ButtonType = ButtonType;
  ButtonStyle = ButtonStyle;

  get style() {
    return {
      width: this.width,
      height: this.height,
      minWidth: this.minWidth,
      minHeight: this.minHeight,
      marginLeft: (-parseFloat(this.width) / 2) + 'px'
    };
  }

  private _portalHost: DomPortalHost;
  private _focusedElementBeforeOpen: HTMLElement = null;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit() {
    this._portalHost = new DomPortalHost(
      this._document.body,
      this._componentFactoryResolver,
      this._appRef,
      this._injector
    );

    this.attachDetachDialog();
  }

  ngOnDestroy() {
    if (this._portalHost.hasAttached()) {
      this._portalHost.detach();
    }
  }

  private getTransformXY(element: HTMLElement): { x: number, y: number } {
    const translatePieces = getComputedStyle(element).transform.split(',');
    return {
      x: parseFloat(translatePieces[4]) || 0,
      y: parseFloat(translatePieces[5]) || 0
    };
  }

  private updateFocus() {
    if (this.showDialog) {
      this._focusedElementBeforeOpen = <HTMLElement>this._document.activeElement;
      this.dialogWrapper.nativeElement.focus({ preventScroll: true });
    } else if (this._focusedElementBeforeOpen) {
      this._focusedElementBeforeOpen.focus();
    }
  }

  /**
   * Attach detach dialog from portal depending on _showDialog
   */
  attachDetachDialog() {
    if (this._portalHost) {
      if (this._showDialog) {
        this._portalHost.attachTemplatePortal(this.dialogPortal);
      } else {
        this._portalHost.detach();
      }
    }
  }

  // Maximize the dialog so that all content is visible without scrolling. After maximizing,
  // the dialog height will never be greater than the window height. The dialog will also be
  // repositioned to fit within the viewport.
  // TODO: Find a way to not use the window object directly, otherwise it will throw an error for when using SSR
  maximizeDialog() {
    const dialog: HTMLElement = this.dialogWrapper.nativeElement.querySelector('.h2-dialog');
    const dialogBounding = dialog.getBoundingClientRect();
    const scrollableElements = <HTMLElement[]>Array.from(dialog.querySelectorAll('.h2-scrollbar'));
    let expandByAmount = 0;

    for (const scrollableElement of scrollableElements) {
      const scrollAmount = scrollableElement.scrollHeight - scrollableElement.clientHeight;
      if (expandByAmount < scrollAmount) {
        expandByAmount = scrollAmount;
      }
    }

    const newDialogHeight = dialogBounding.height + expandByAmount > window.innerHeight
      ? window.innerHeight
      : dialog.offsetHeight + expandByAmount;

    dialog.style.transition = 'transform .3s, height .3s';

    if (expandByAmount > 0) {
      dialog.style.height = newDialogHeight + 'px';
    }

    // Reposition dialog if bottom of dialog exceeds window viewport
    if (dialogBounding.top + newDialogHeight > window.innerHeight) {
      const { x, y } = this.getTransformXY(dialog);
      const newY = y - (dialogBounding.top + newDialogHeight - window.innerHeight);
      dialog.style.transform = `translate3d(${x}px, ${newY}px, 0)`;

      if (this.dialogCdkDrag) {
        // We also need to update the x and y values stored by the Drag and Drop CDK
        this.dialogCdkDrag._dragRef['_activeTransform'] = { x, y: newY };
        this.dialogCdkDrag._dragRef['_passiveTransform'] = { x, y: newY };
      }
    }

    setTimeout(() => {
      // Remove the transition once the transition is finished
      dialog.style.transition = '';
    }, 300);
  }

  onCloseClicked() {
    this.showDialog = false;
  }

  onEscPress() {
    if (this.dismissOnEscPress) {
      this.showDialog = false;
    }
  }

  onBackdropClick() {
    if (this.dismissOnBackdropClick) {
      this.showDialog = false;
    }
  }

  onAnimationDone() {
    this.updateFocus();

    if (!this.showDialog) {
      this.closed.emit();
    }
  }

  onDragStarted(event: CdkDragStart) {
    const dialog = event.source.element.nativeElement;
    // Disable transition for when the dialog is being dragged
    dialog.style.transition = '';
  }

  // This logic within this method ensures that drag handle is always within the viewport
  // TODO: Find a way to not use the window object directly, otherwise it will throw an error for when using SSR
  onDragEnded(event: CdkDragEnd) {
    const dialog = event.source.element.nativeElement;
    const dragHandle = event.source._handles.first.element.nativeElement;
    const bounding = dragHandle.getBoundingClientRect();
    // Minimum amount of the drag handle that should be visible
    const minAmountVisibleY = bounding.height;
    const minAmountVisibleX = 50;
    const pastTop = bounding.bottom < minAmountVisibleY;
    const pastBottom = bounding.top > window.innerHeight - minAmountVisibleY;
    const pastLeft = bounding.right < minAmountVisibleX;
    const pastRight = bounding.left > window.innerWidth - minAmountVisibleX;

    // Enable transition for when the dialog shifts back into view
    dialog.style.transition = 'transform .3s';

    if (pastTop || pastBottom || pastLeft || pastRight) {
      // Drag handle is outside of viewport
      const { x, y } = this.getTransformXY(dialog);
      let newX = x;
      let newY = y;

      if (pastTop) {
        newY = y - (bounding.bottom - minAmountVisibleY);
      }
      if (pastBottom) {
        newY = y - (bounding.top + minAmountVisibleY - window.innerHeight);
      }
      if (pastLeft) {
        newX = x - (bounding.right - minAmountVisibleX);
      }
      if (pastRight) {
        newX = x - (bounding.left + minAmountVisibleX - window.innerWidth);
      }

      dialog.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
      // We also need to update the x and y values stored by the Drag and Drop CDK
      event.source._dragRef['_activeTransform'] = { x: newX, y: newY };
      event.source._dragRef['_passiveTransform'] = { x: newX, y: newY };
    }
  }
}
