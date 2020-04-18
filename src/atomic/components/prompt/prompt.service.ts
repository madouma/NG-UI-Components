import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector } from '@angular/core';
import { first } from 'rxjs/operators';
import { PromptComponent } from './prompt.component';
import { DOCUMENT } from '@angular/common';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import { DialogType } from '../dialog/dialog.enums';
import { PromptData } from './prompt.interfaces';
import { PromptAction } from './prompt.enums';

interface PromptItem {
  componentRef: ComponentRef<PromptComponent>;
  portalHost: DomPortalHost;
}

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  constructor(
    private _factoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _injector: Injector,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  private createPortalHost(): DomPortalHost {
    return new DomPortalHost(
      this._document.body,
      this._factoryResolver,
      this._appRef,
      this._injector
    );
  }

  private createPrompt(): PromptItem {
    const portalHost = this.createPortalHost();
    const promptPortal = new ComponentPortal(PromptComponent);
    const componentRef = portalHost.attach(promptPortal);

    return { componentRef, portalHost };
  }

  private destroyPrompt(promptItem: PromptItem) {
    promptItem.portalHost.detach();
  }

  private open(type: DialogType, data: PromptData) {
    const promptItem = this.createPrompt();
    const prompt = promptItem.componentRef.instance;
    prompt.type = type;
    prompt.title = data.title;
    prompt.primaryBtnLabel = data.primaryBtnLabel;
    prompt.secondaryBtnLabel = data.secondaryBtnLabel;
    prompt.primaryCopy = data.primaryCopy;
    prompt.secondaryCopy = data.secondaryCopy;
    prompt.showPrompt = true;

    prompt.closed.subscribe(() => {
      this.destroyPrompt(promptItem);
    });

    return new Promise<PromptAction>(resolve => {
      prompt.action.subscribe(action => {
        resolve(action);
      });
    });
  }

  hazard(data: PromptData) {
    return this.open(DialogType.Hazard, data);
  }

  success(data: PromptData) {
    return this.open(DialogType.Success, data);
  }

  caution(data: PromptData) {
    return this.open(DialogType.Caution, data);
  }

  info(data: PromptData) {
    return this.open(DialogType.Info, data);
  }
}
