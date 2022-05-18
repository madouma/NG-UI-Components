// tslint:disable:max-line-length
import { Component, ViewChild, OnInit } from '@angular/core';
import { Icon } from '../atomic/components/icon/icon.enum';
import { ButtonSize, ButtonType, ButtonStyle } from '../atomic/components/button/button.enums';
import { TextboxSize, TextboxTexAlign } from '../atomic/components/textbox/textbox.enums';
import { CPickerSize } from '../atomic/components/color-picker/color-picker.enums';
import { DDSize, DDTemplate } from '../atomic/components/dropdown/dropdown.enums';
import { DropdownItem } from '../atomic/components/dropdown/dropdown.interfaces';
import {
  ListPanelAction,
  ListPanelConfig,
  ListPanelGroup
} from '../atomic/components/list-panel/list-panel.interfaces';
import { ListPanelSizeEnum } from '../atomic/components/list-panel/list-panel.enums';
import { TitleCasePipe } from '@angular/common';
import { PromptService } from '../atomic/components/prompt/prompt.service';
import { PromptAction } from '../atomic/components/prompt/prompt.enums';
import { ResistivityGradientBuilderComponent } from '../atomic/components/resistivity-gradient-builder/resistivity-gradient-builder.component';
import {
  GradientMap,
  RangePercentConverter
} from '../atomic/components/resistivity-gradient-builder';
import { CheckboxLabelPos } from '../atomic/components/checkbox/checkbox.enums';
import { MarkerPreviewStyle } from '../atomic/components/marker-preview/marker-preview.enums';

@Component({
  selector: 'demo-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  radialTrimValue = '50,100';
  boxTrimValue = '10,90,10,90';

  titleCasePipe = new TitleCasePipe();
  Icon = Icon;

  ButtonSize = ButtonSize;
  ButtonType = ButtonType;
  ButtonStyle = ButtonStyle;

  TextboxSize = TextboxSize;
  TextboxTextAlign = TextboxTexAlign;
  textboxValue = 'test abc';

  CheckboxLabelPos = CheckboxLabelPos;

  CPickerSize = CPickerSize;

  MarkerStyle = MarkerPreviewStyle;

  DDSize = DDSize;
  DDTemplate = DDTemplate;
  dropdownItems: DropdownItem[] = [
    {
      value: { thickness: 1 },
      text: 'Item 1',
      disabled: false
    },
    {
      value: { thickness: 2 },
      text: 'Item 2',
      disabled: false
    },
    {
      value: { thickness: 3 },
      text: 'Item 3',
      disabled: true
    }
  ];
  dropdownSelectedItem = 2;

  dropdownMarkerItems: DropdownItem[] = [
    { value: { previewStyle: MarkerPreviewStyle.Plus } },
    { value: { previewStyle: MarkerPreviewStyle.Cross } },
    { value: { previewStyle: MarkerPreviewStyle.Triangle } },
    { value: { previewStyle: MarkerPreviewStyle.Diamond } },
    { value: { previewStyle: MarkerPreviewStyle.Square } },
    { value: { previewStyle: MarkerPreviewStyle.Round } },
    { value: { previewStyle: MarkerPreviewStyle.Star } }
  ];
  dropdownSelectedMarkerItem = MarkerPreviewStyle.Round;

  gradientMap = new GradientMap({
    resistivityRange: {
      min: 0.1,
      max: 2000
    },
    // steps: [],
    selectedIndex: 2
  });

  listPanelConfig1: ListPanelConfig = {
    enableGroupCollapse: true,
    showGroupHeaders: true,
    enableDrag: true,
    listItemSize: ListPanelSizeEnum.Small
  };
  listPanelConfig2: ListPanelConfig = {
    enableGroupCollapse: false,
    showGroupHeaders: false,
    enableDrag: false,
    listItemSize: ListPanelSizeEnum.Large
  };
  listPanelActions: ListPanelAction[] = [
    {
      icon: Icon.ViewDisable
    },
    {
      icon: Icon.Delete
    }
  ];
  listPanelGroups: ListPanelGroup[] = [
    {
      title: 'group 1',
      items: [
        {
          text: 'item 1',
          visible: true
        },
        {
          text: 'Veeeeeeerrrry Loooooong Name',
          visible: true
        }
      ]
    },
    {
      title: 'group 2',
      items: [
        {
          text: 'item 3',
          visible: true,
          actions: [
            {
              icon: Icon.Add
            }
          ]
        },
        {
          text: 'item 4',
          visible: false
        }
      ]
    }
  ];

  listPanelControlGroups: ListPanelGroup[] = [
    {
      items: [
        {
          text: 'item 1',
          data: {
            checked: false
          }
        },
        {
          text: 'Veeeeeeerrrry Loooooong Name',
          data: {
            checked: true
          }
        }
      ]
    },
    {
      items: [
        {
          text: 'item 3',
          data: {
            checked: false
          }
        },
        {
          text: 'item 4',
          data: {
            checked: false
          }
        }
      ]
    }
  ];
  loading = false;

  @ViewChild(ResistivityGradientBuilderComponent, {static: false})
  public slider: ResistivityGradientBuilderComponent;

  constructor(private _promptService: PromptService) {
    this.gradientMap.steps = [
      { resistivityPoint: 0.5, hex: '#55b5e5', alpha: 30 },
      { resistivityPoint: 2, hex: '#f3bc41', alpha: 30 },
      { resistivityPoint: 10, hex: '#0aa076', alpha: 30 },
      { resistivityPoint: 115, hex: '#e7452e', alpha: 30 }
    ];
  }

  ngOnInit() {
    this.gradientMap.rangePercentConverter = new RangePercentConverter({
      minValueOfRange: this.gradientMap.resistivityRange.min,
      maxValueOfRange: this.gradientMap.resistivityRange.max
    });
    this.gradientMap.rangePercentConverter.isLog = true;
  }

  log(event) {
    console.log(event);
  }

  toggleTheme() {
    if (document.body.classList.contains('h2-theme-dark')) {
      document.body.classList.remove('h2-theme-dark');
      document.body.classList.add('h2-theme-light');
    } else {
      document.body.classList.remove('h2-theme-light');
      document.body.classList.add('h2-theme-dark');
    }
  }

  showPrompt() {
    this.loading = true;
    this._promptService
      .hazard({
        title: 'Delete Node',
        primaryBtnLabel: 'Delete',
        secondaryBtnLabel: 'Cancel',
        secondaryCopy: 'You have selected to delete 12 node lines.',
        primaryCopy: 'Are you sure you want to delete 12 node lines?'
      })
      .then((action: PromptAction) => {
        console.log(action);
        this.loading = false;
      });
  }
}
