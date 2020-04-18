import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnChanges,
  Output, QueryList, SimpleChanges,
  ViewChildren
} from '@angular/core';
import {
  ListPanelIconClicked,
  ListPanelItem,
  ListPanelOrderChanged,
  ListPanelSelected
} from '../list-panel/list-panel.interfaces';
import { ButtonStyle, ButtonType } from '../button/button.enums';
import { DialogContentColumn, DialogContentSelected } from './dialog-content.interfaces';
import { Icon } from '../icon/icon.enum';
import { ListPanelComponent } from '../list-panel/list-panel.component';

@Component({
  selector: 'h2-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogContentComponent implements OnChanges {
  @Input() root: DialogContentColumn;

  @Output() selected = new EventEmitter<DialogContentSelected>();
  @Output() iconClicked = new EventEmitter<ListPanelIconClicked>();
  @Output() visibilityChanged = new EventEmitter<ListPanelItem[]>();
  @Output() orderChanged = new EventEmitter<ListPanelOrderChanged>();

  @ViewChildren(ListPanelComponent) listPanelComponents: QueryList<ListPanelComponent>;

  listWidth = '200px';
  ButtonType = ButtonType;
  ButtonStyle = ButtonStyle;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.root) {
      this.addParentChildrenRelations(this.root);
      this.setVisibility();
    }
  }

  // Add parent and children properties to each list panel item so that later it will be easier to find
  // the ancestors and descendents
  private addParentChildrenRelations(column: DialogContentColumn, parentItem: ListPanelItem = null) {
    if (column && column.groups) {
      for (let group of column.groups) {
        if (group.items) {
          for (let item of group.items) {
            item['parent'] = parentItem;
            item['children'] = this.getItemChildren(item);

            this.addParentChildrenRelations(item['column'], item);
          }
        }
      }
    }
  }

  private getItemChildren(item: ListPanelItem): ListPanelItem[] {
    const column: DialogContentColumn = item['column'];

    if (column && column.groups) {
      // Flatten items
      return [].concat(...column.groups.map(group => group.items || []));
    }

    return [];
  }

  private updateDescendentsVisibility(item: ListPanelItem, visible: boolean, descendents: ListPanelItem[]) {
    const children = <ListPanelItem[]>item['children'];
    let childList = children.filter(c => c.visible !== visible);
    if (children.length > 0 && childList.length === children.length) {
      for (const child of <ListPanelItem[]>item['children']) {
        if (child && child.visible !== visible) {
          child.visible = visible;
          descendents.push(child);
          this.updateDescendentsVisibility(child, visible, descendents);
        }
      }
    }
  }

  private updateAncestorsVisibility(item: ListPanelItem, ancestors: ListPanelItem[]) {
    if (item) {
      let parent: ListPanelItem = item['parent'];
      let siblings: ListPanelItem[] = parent && parent['children'];

      if (siblings) {
        const allSiblingsHidden = siblings.every(sibling => !sibling.visible);
        const parentVisible = allSiblingsHidden ? false : true;

        if (parent.visible !== parentVisible) {
          parent.visible = parentVisible;
          ancestors.push(parent);
        }

        this.updateAncestorsVisibility(parent, ancestors);
      }
    }
  }

  private updateVisibility(item: ListPanelItem, itemMutated = true) {
    let updatedItems: ListPanelItem[] = itemMutated ? [item] : [];

    this.updateDescendentsVisibility(item, item.visible, updatedItems);
    this.updateAncestorsVisibility(item, updatedItems);

    // Trigger change detection
    if (this.listPanelComponents) {
      this.listPanelComponents.forEach(listPanelComponent => listPanelComponent.forceChangeDetection());
    }

    this.visibilityChanged.emit(updatedItems);
  }

  // This is to update the visibility once new data arrives
  private setVisibility() {
    if (this.root && this.root.groups) {
      for (let group of this.root.groups) {
        for (let item of group.items) {
          this.updateVisibility(item, false);
        }
      }
    }
  }

  getColumn(selected: ListPanelSelected) {
    if (selected && selected.item) {
      return selected.item['column'];
    }
    return null;
  }

  onHeaderButtonClick(callback) {
    if (callback) {
      callback();
    }
  }

  onSelect(column: DialogContentColumn, { group, item }: ListPanelSelected) {
    this.selected.emit({ parentId: column.parentId, group, item });
  }

  onIconClick(event: ListPanelIconClicked) {
    this.iconClicked.emit(event);
    event.item.icon = event.icon;
    event.group.items = event.group.items;
    if (event.icon === Icon.ViewDisable) {
      this.updateVisibility(event.item);
    }
  }

  onOrderChange(event: ListPanelOrderChanged) {
    this.orderChanged.emit(event);
  }
}
