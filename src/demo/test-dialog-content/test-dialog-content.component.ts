import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  ColumnHeaderConfig,
  DialogContentColumn
} from '../../atomic/components/dialog-content/dialog-content.interfaces';
import {
  ListPanelConfig,
  ListPanelGroup,
  ListPanelItem
} from '../../atomic/components/list-panel/list-panel.interfaces';
import { ListPanelSizeEnum } from '../../atomic/components/list-panel/list-panel.enums';
import { Icon } from '../../atomic/components/icon/icon.enum';

@Component({
  selector: 'h2-test-dialog-content',
  templateUrl: './test-dialog-content.component.html',
  styleUrls: ['./test-dialog-content.component.scss']
})
export class TestDialogContentComponent implements OnInit {
  dialogContent: DialogContentColumn;

  @ViewChild('curvePropertiesTemplate') curvePropertiesTemplate: TemplateRef<any>;
  @ViewChild('surfacePropertiesTemplate') surfacePropertiesTemplate: TemplateRef<any>;

  ngOnInit() {
    this.dialogContent = <DialogContentColumn>{
      config: <ListPanelConfig>{
        enableDrag: true,
        showGroupHeaders: true,
        listItemSize: ListPanelSizeEnum.Small
      },
      headerConfig: <ColumnHeaderConfig>{
        topTitle: 'Source',
        bottomButton: {
          text: 'some button',
        }
      },
      groups: [
        <ListPanelGroup>{
          title: 'Offset Wells',
          items: [
            <ListPanelItem>{
              text: 'OW 1',
              visible: true,
              actions: [
                {
                  icon: Icon.Add,
                }
              ],
              'column': <DialogContentColumn>{
                config: <ListPanelConfig>{
                  enableDrag: true,
                  showGroupHeaders: false,
                  listItemSize: ListPanelSizeEnum.Small,
                },
                headerConfig: <ColumnHeaderConfig>{
                  bottomTitle: 'Curve',
                  topButton: {
                    text: 'test'
                  }
                },
                groups: [
                  <ListPanelGroup>{
                    items: [
                      <ListPanelItem>{
                        text: 'C 1.1',
                        visible: true,
                        'column': <DialogContentColumn>{
                          contentTemplate: this.curvePropertiesTemplate,
                        },
                        actions: [
                          {
                            icon: Icon.ViewDisable,
                          }
                        ],
                      },
                      <ListPanelItem>{
                        text: 'C 1.3',
                        visible: true
                      }
                    ]
                  }
                ]
              }
            },
            <ListPanelItem>{
              text: 'OW 2',
              visible: true,
              actions: [
                {
                  icon: Icon.ViewDisable,
                }
              ],
              'column': <DialogContentColumn>{
                config: <ListPanelConfig>{
                  enableDrag: false,
                  showGroupHeaders: false,
                  listItemSize: ListPanelSizeEnum.Small
                },
                headerConfig: <ColumnHeaderConfig>{
                  bottomTitle: 'Curve'
                },
                groups: [
                  <ListPanelGroup>{
                    items: [
                      <ListPanelItem>{
                        text: 'C 2.1',
                        visible: true
                      },
                      <ListPanelItem>{
                        text: 'C 2.2',
                        visible: true
                      },
                      <ListPanelItem>{
                        text: 'C 3.3',
                        visible: true
                      }
                    ]
                  }
                ]
              }
            },
            <ListPanelItem>{
              text: 'OW 3',
              visible: true,
              'column': <DialogContentColumn>{
                config: <ListPanelConfig>{
                  enableDrag: false,
                  showGroupHeaders: false,
                  listItemSize: ListPanelSizeEnum.Small
                },
                headerConfig: <ColumnHeaderConfig>{
                  bottomTitle: 'Curve'
                },
                groups: [
                  <ListPanelGroup>{
                    items: [
                      <ListPanelItem>{
                        text: 'C 3.1',
                        visible: true
                      },
                      <ListPanelItem>{
                        text: 'C 3.2',
                        visible: true
                      },
                      <ListPanelItem>{
                        text: 'C 3.3',
                        visible: true
                      }
                    ]
                  }
                ]
              }
            },
          ]
        },
        <ListPanelGroup>{
          title: 'Surfaces',
          visible: true,
          items: [
            <ListPanelItem>{
              text: 'S 1',
              visible: true,
              'column': <DialogContentColumn>{
                contentTemplate: this.surfacePropertiesTemplate,
              }
            },
            <ListPanelItem>{
              text: 'S 3',
              visible: true,
              'column': <DialogContentColumn>{
                contentTemplate: this.surfacePropertiesTemplate,
                itemParams: {
                  name: 'S 3'
                }
              }
            },
            <ListPanelItem>{
              text: 'S 3',
              visible: true,
              'column': <DialogContentColumn>{
                contentTemplate: this.surfacePropertiesTemplate,
                itemParams: {
                  name: 'S 3'
                }
              }
            },
          ]
        },
      ]
    };
  }

}
