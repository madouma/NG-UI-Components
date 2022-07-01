// H2 Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InlineSVGModule } from 'ng-inline-svg';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

// H2 Private Directives
import { ToggledDirective } from './atomic/directives/toggled.directive';
import { NumbersOnlyDirective } from './atomic/directives/numbers-only.directive';

// H2 Public Directives
import { TooltipDirective } from './atomic/directives/tooltip.directive';
import { RevealTruncatedTextDirective } from './atomic/directives/reveal-truncated-text.directive';

// H2 Public Pipes
import { InvokePipe } from './atomic/pipes/invoke.pipe';
import { KebabCasePipe } from './atomic/pipes/kebab-case.pipe';
import { RemoveCharacterPipe } from './atomic/pipes/remove-character.pipe';
import { SafePipe } from './atomic/pipes/safe.pipe';

// H2 Private Components
import { ExpandCollapseIndicatorComponent } from './atomic/components/expand-collapse-indicator/expand-collapse-indicator.component';
import { ChevronIndicatorComponent } from './atomic/components/chevron-indicator/chevron-indicator.component';
import { PopoverComponent } from './atomic/components/popover/popover.component';
import { CollapsibleComponent } from './atomic/components/collapsible/collapsible.component';

// H2 Public Components
import { IconComponent } from './atomic/components/icon/icon.component';
import { ButtonComponent } from './atomic/components/button/button.component';
import { LabelComponent } from './atomic/components/label/label.component';
import { TextboxComponent } from './atomic/components/textbox/textbox.component';
import { SwitchComponent } from './atomic/components/switch/switch.component';
import { VisibilitySwitchComponent } from './atomic/components/visibility-switch/visibility-switch.component';
import { ColorPickerComponent } from './atomic/components/color-picker/color-picker.component';
import { DropdownComponent } from './atomic/components/dropdown/dropdown.component';
import { PropertiesBarComponent } from './atomic/components/properties-bar/properties-bar.component';
import { PanelHeaderBarComponent } from './atomic/components/panel-header-bar/panel-header-bar.component';
import { ListPanelComponent } from './atomic/components/list-panel/list-panel.component';
import { ContentPanelComponent } from './atomic/components/content-panel/content-panel.component';
import { PanelsContainerComponent } from './atomic/components/panels-container/panels-container.component';
import { DialogComponent } from './atomic/components/dialog/dialog.component';
import { DialogContentComponent } from './atomic/components/dialog-content/dialog-content.component';
import { TableComponent } from './atomic/components/table/table.component';
import { ThComponent } from './atomic/components/table/th/th.component';
import { TdComponent } from './atomic/components/table/td/td.component';
import { TrComponent } from './atomic/components/table/tr/tr.component';
import { LinePreviewComponent } from './atomic/components/line-preview/line-preview.component';
import { MarkerPreviewComponent } from './atomic/components/marker-preview/marker-preview.component';
import { TooltipComponent } from './atomic/components/tooltip/tooltip.component';
import { RevealTruncatedTextComponent } from './atomic/components/reveal-truncated-text/reveal-truncated-text.component';
import { PromptComponent } from './atomic/components/prompt/prompt.component';
import { OpacitySliderComponent } from './atomic/components/opacity-slider/opacity-slider.component';
import { ResistivityGradientBuilderComponent } from './atomic/components/resistivity-gradient-builder/resistivity-gradient-builder.component';
import { SpinnerComponent } from './atomic/components/spinner/spinner.component';
import { BoxTrimComponent } from './atomic/components/box-trim/box-trim.component';
import { RadialTrimComponent } from './atomic/components/radial-trim/radial-trim.component';
import { HeaderComponent } from './atomic/components/header/header.component';
import { WidgetComponent } from './atomic/components/widget/widget.component';
import { DualHandleSliderComponent } from './atomic/components/dual-handle-slider/dual-handle-slider.component';
import { CheckboxComponent } from './atomic/components/checkbox/checkbox.component';
import { InputOnFocusDirective } from './atomic/components/dual-handle-slider/input-on-focus.directive';
import { SingleHandleSliderComponent } from './atomic/components/single-handle-slider/single-handle-slider.component';
import { SingleStepSliderComponent } from './atomic/components/single-step-slider/single-step-slider.component';
import { DatePickerComponent } from './atomic/components/date-picker/date-picker.component';
import { FlatpickrModule } from 'angularx-flatpickr';

@NgModule({
  declarations: [
    // H2 Private Directives
    ToggledDirective,
    NumbersOnlyDirective,
    // H2 Public Directives
    TooltipDirective,
    RevealTruncatedTextDirective,
    // H2 Public Pipes
    InvokePipe,
    KebabCasePipe,
    RemoveCharacterPipe,
    SafePipe,
    // H2 Private Components
    ExpandCollapseIndicatorComponent,
    ChevronIndicatorComponent,
    PopoverComponent,
    CollapsibleComponent,
    // H2 Public Components
    IconComponent,
    ButtonComponent,
    LabelComponent,
    TextboxComponent,
    SwitchComponent,
    VisibilitySwitchComponent,
    ColorPickerComponent,
    DropdownComponent,
    LinePreviewComponent,
    MarkerPreviewComponent,
    PropertiesBarComponent,
    PanelHeaderBarComponent,
    ListPanelComponent,
    ContentPanelComponent,
    PanelsContainerComponent,
    DialogComponent,
    DialogContentComponent,
    TableComponent,
    ThComponent,
    TdComponent,
    TrComponent,
    TooltipComponent,
    RevealTruncatedTextComponent,
    PromptComponent,
    OpacitySliderComponent,
    ResistivityGradientBuilderComponent,
    SpinnerComponent,
    BoxTrimComponent,
    RadialTrimComponent,
    HeaderComponent,
    WidgetComponent,
    DualHandleSliderComponent,
    CheckboxComponent,
    InputOnFocusDirective,
    SingleHandleSliderComponent,
    SingleStepSliderComponent,
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    InlineSVGModule.forRoot(),
    DragDropModule,
    PortalModule,
    OverlayModule,
    InlineSVGModule,
    FlatpickrModule.forRoot()
  ],
  entryComponents: [
    TooltipComponent,
    PromptComponent,
    RevealTruncatedTextComponent
  ],
  exports: [
    // Modules
    DragDropModule,
    PortalModule,
    OverlayModule,
    InlineSVGModule,
    FlatpickrModule,
    // H2 Public Directives
    TooltipDirective,
    RevealTruncatedTextDirective,
    // H2 Public Pipes
    SafePipe,
    InvokePipe,
    KebabCasePipe,
    RemoveCharacterPipe,
    // H2 Public Components
    IconComponent,
    ButtonComponent,
    LabelComponent,
    TextboxComponent,
    SwitchComponent,
    VisibilitySwitchComponent,
    ColorPickerComponent,
    DropdownComponent,
    LinePreviewComponent,
    MarkerPreviewComponent,
    PropertiesBarComponent,
    PanelHeaderBarComponent,
    ListPanelComponent,
    ContentPanelComponent,
    PanelsContainerComponent,
    DialogComponent,
    DialogContentComponent,
    TableComponent,
    ThComponent,
    TdComponent,
    TrComponent,
    TooltipComponent,
    RevealTruncatedTextComponent,
    PromptComponent,
    OpacitySliderComponent,
    ResistivityGradientBuilderComponent,
    SpinnerComponent,
    BoxTrimComponent,
    RadialTrimComponent,
    HeaderComponent,
    WidgetComponent,
    DualHandleSliderComponent,
    SingleHandleSliderComponent,
    CheckboxComponent,
    InputOnFocusDirective,
    SingleStepSliderComponent,
    DatePickerComponent
  ]
})

export class H2Module { }
