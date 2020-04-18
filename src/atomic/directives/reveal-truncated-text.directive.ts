import {
  AfterViewInit,
  ComponentFactory,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { RevealTruncatedTextComponent } from '../components/reveal-truncated-text/reveal-truncated-text.component';

@Directive({
  selector: '[h2RevealTruncatedText]'
})
export class RevealTruncatedTextDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input('h2RevealTruncatedText') revealTruncatedText = true;

  private _delay = 0.75; // Seconds

  private _component: RevealTruncatedTextComponent;
  private _componentFactory: ComponentFactory<RevealTruncatedTextComponent> = this._resolver.resolveComponentFactory(
    RevealTruncatedTextComponent
  );
  private _rendererListeners: (() => void)[] = [];
  private _delayTimer = null;

  constructor(
    private _elRef: ElementRef<HTMLElement>,
    private _hostView: ViewContainerRef,
    private _resolver: ComponentFactoryResolver,
    private _renderer: Renderer2,
  ) {}

  ngOnInit() {
    if (!this._component) {
      const component = this._hostView.createComponent(this._componentFactory);
      this._component = component.instance;
      // Remove tooltip component element from DOM when using a directive
      this._renderer.removeChild(this._renderer.parentNode(this._elRef.nativeElement), component.location.nativeElement);
    }
    this._component.setOverlayOrigin(new CdkOverlayOrigin(this._elRef));
  }

  ngAfterViewInit() {
    this.attachListeners();
  }

  ngOnDestroy() {
    this.detachListeners();
  }

  private isElementTextTruncated() {
    const el = this._elRef.nativeElement;
    console.log('Truncated:', el.scrollWidth > el.clientWidth);
    return el.scrollWidth > el.clientWidth;
  }

  private updateComponentText() {
    this._component.content = this._elRef.nativeElement.innerText;
    this._component.markForCheck();
  }

  private hide() {
    if (this._component) {
      this._component.hide();
    }
  }

  private show() {
    if (this._component && this.isElementTextTruncated()) {
      this.updateComponentText();
      this._component.show();
    }
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
          this._elRef.nativeElement, 'mouseenter', () => this.delayEnterLeave(true, this._delay)
        ),
        this._renderer.listen(
          this._elRef.nativeElement, 'mouseleave', () => this.delayEnterLeave(false, -1)
        )
      ]);
    }
  }

  private detachListeners() {
    this._rendererListeners.forEach(unListen => unListen());
    this._rendererListeners = [];
  }
}
