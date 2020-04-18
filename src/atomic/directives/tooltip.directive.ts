import {
  AfterViewInit,
  ComponentFactory,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { TooltipPosition, TooltipType } from '../components/tooltip/tooltip.enums';
import { TooltipComponent } from '../components/tooltip/tooltip.component';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[h2Tooltip]'
})
export class TooltipDirective implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input('h2Tooltip') tooltipContent: TemplateRef<any> | string = '';
  @Input('h2TooltipPositions') tooltipPositions: TooltipPosition[] = [
    TooltipPosition.Top, TooltipPosition.Bottom,
  ];
  @Input('h2TooltipType') tooltipType = TooltipType.Info;
  @Input('h2TooltipDelay') tooltipDelay = 0.1; // Seconds

  private _disable = false;
  @Input('h2TooltipDisable')
  get disable() {
    return this._disable;
  }
  set disable(disable) {
    this._disable = disable;
    if (disable) {
      this.detachListeners();
      this.delayEnterLeave(false, -1);
    } else {
      this.attachListeners();
    }
  }

  private _tooltip: TooltipComponent;
  private _tooltipFactory: ComponentFactory<TooltipComponent> = this._resolver.resolveComponentFactory(TooltipComponent);
  private _rendererListeners: (() => void)[] = [];
  private _delayTimer = null;

  constructor(
    private _elRef: ElementRef<HTMLElement>,
    private _hostView: ViewContainerRef,
    private _resolver: ComponentFactoryResolver,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.updatePropertyBindings();

    if (changes.tooltipContent) {
      if (this.isElemInFocus() && this.tooltipContent) {
        this.show();
      }
    }
  }

  ngOnInit() {
    if (!this._tooltip) {
      const tooltipComponent = this._hostView.createComponent(this._tooltipFactory);
      this._tooltip = tooltipComponent.instance;
      // Remove tooltip component element from DOM when using a directive
      this._renderer.removeChild(this._renderer.parentNode(this._elRef.nativeElement), tooltipComponent.location.nativeElement);
      this.updatePropertyBindings();
    }
    this._tooltip.setOverlayOrigin(new CdkOverlayOrigin(this._elRef));
  }

  ngAfterViewInit() {
    if (!this.disable) {
      this.attachListeners();
    }
  }

  ngOnDestroy() {
    this.detachListeners();
  }

  private hide() {
    if (this._tooltip) {
      this._tooltip.hide();
    }
  }

  private show() {
    if (this._tooltip) {
      this._tooltip.show();
    }
  }

  private isElemInFocus() {
    return this._document.activeElement === this._elRef.nativeElement;
  }

  private delayEnterLeave(isEnter: boolean, delay: number = -1) {
    // Clear timer
    if (this._delayTimer !== null) {
      window.clearTimeout(this._delayTimer);
      this._delayTimer = null;
    }

    if (delay > 0) {
      this._delayTimer = window.setTimeout(() => {
        this._delayTimer = null;
        isEnter ? this.show() : this.hide();
      }, delay * 1000);
    } else {
      isEnter ? this.show() : this.hide();
    }
  }

  private attachListeners() {
    if (this._rendererListeners.length === 0) {
      this._rendererListeners.push.apply(this._rendererListeners, [
        this._renderer.listen(
          this._elRef.nativeElement, 'mouseenter', () => this.delayEnterLeave(true, this.tooltipDelay)
        ),
        this._renderer.listen(
          this._elRef.nativeElement, 'mouseleave', () => this.delayEnterLeave(false, -1)
        ),
        this._renderer.listen(
          this._elRef.nativeElement, 'focus', () => this.delayEnterLeave(true, this.tooltipDelay)
        ),
        this._renderer.listen(
          this._elRef.nativeElement, 'blur', () => this.delayEnterLeave(false, -1)
        ),
      ]);
    }
  }

  private detachListeners() {
    this._rendererListeners.forEach(unListen => unListen());
    this._rendererListeners = [];
  }

  private updatePropertyBindings() {
    if (this._tooltip) {
      this._tooltip.content = this.tooltipContent;
      this._tooltip.positions = this.tooltipPositions;
      this._tooltip.type = this.tooltipType;
      this._tooltip.markForCheck();
    }
  }
}
