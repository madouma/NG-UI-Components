import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Icon } from '../icon/icon.enum';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ListPanelAction,
  ListPanelConfig,
  ListPanelGroup,
  ListPanelIconClicked,
  ListPanelItem,
  ListPanelOrderChanged,
  ListPanelSelected
} from './list-panel.interfaces';

@Component({
  selector: 'h2-list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPanelComponent {
  @Input() groups: ListPanelGroup[];
  @Input() actions: ListPanelAction[];
  @Input() config: ListPanelConfig = {
    listItemSize: undefined,
    showGroupHeaders: undefined,
    enableGroupCollapse: undefined,
    enableDrag: undefined
  };
  @Input() selected: ListPanelSelected;
  @Input() template: TemplateRef<any>;
  @Input() selectable = true;

  @Output() iconClicked = new EventEmitter<ListPanelIconClicked>();
  @Output() orderChanged = new EventEmitter<ListPanelOrderChanged>();
  @Output() selectedChange = new EventEmitter<ListPanelSelected>();

  Icon = Icon;

  constructor(private _cdf: ChangeDetectorRef) { }

  forceChangeDetection() {
    this._cdf.markForCheck();
  }

  onSelect(group: ListPanelGroup, item: ListPanelItem) {
    if (this.selected && this.selected.item && this.selected.item.id !== item.id) {
      this.selected = { group, item };
      this.selectedChange.emit(this.selected);
    }
  }

  onIconClicked(group: ListPanelGroup, item: ListPanelItem, action: ListPanelAction) {
    if (action.callback) {
      action.callback(group, item).then(() => {
        this.iconClicked.emit({
          group,
          item,
          icon: action.icon
        });
      });
    } else {
      // Add Icon specific functionality that should be built in to the List Panel here
      switch (action.icon) {
        case Icon.ViewDisable:
          // TODO: move this out so that we don't mutate the data for NgRx
          item.visible = !item.visible;
          break;
        case Icon.Delete:
          if (item.data && (item.data.Type === 'InversionCanvasVisualHolder' || item.data.TargetProperties)) {
            break;
          }
          const index = group.items.indexOf(item);
          // TODO: move this out so that we don't mutate the array for NgRx
          group.items.splice(index, 1);
          break;
        case Icon.Link:
          item.data.Checked = !item.data.Checked;
          break;
      }
    }
    this.iconClicked.emit({
      group,
      item,
      icon: action.icon
    });
  }

  onOrderChange(group: ListPanelGroup, cdkDrapDrop: CdkDragDrop<string[]>) {
    // TODO: move this out so that we don't mutate the array for NgRx
    moveItemInArray(
      group.items,
      cdkDrapDrop.previousIndex,
      cdkDrapDrop.currentIndex
    );
    this.orderChanged.emit({
      item: group.items[cdkDrapDrop.currentIndex],
      group,
      previousIndex: cdkDrapDrop.previousIndex,
      currentIndex: cdkDrapDrop.currentIndex
    });
  }

  toggleGroupCollapse(group: ListPanelGroup) {
    if (this.config.enableGroupCollapse) {
      group.collapsed = !group.collapsed;
    }
  }

}
