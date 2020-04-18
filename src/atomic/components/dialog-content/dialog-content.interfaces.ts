import {
  ListPanelConfig,
  ListPanelGroup, ListPanelItem,
  ListPanelSelected
} from '../list-panel/list-panel.interfaces';
import { TemplateRef } from '@angular/core';
import { Icon } from '../icon/icon.enum';

export interface DialogContentColumn {
  parentId?: string;
  selected?: ListPanelSelected;
  config?: ListPanelConfig;
  contentTemplate?: TemplateRef<any>;
  headerTemplate?: TemplateRef<any>;
  headerConfig?: ColumnHeaderConfig;
  groups?: ListPanelGroup[];
}

export interface DialogContentSelected {
  parentId: string;
  group: ListPanelGroup;
  item: ListPanelItem;
}

export interface ColumnHeaderConfig {
  topTitle?: string;
  bottomTitle?: string;
  topButton?: {
    text?: string;
    icon?: Icon;
    callback?: () => Promise<any>;
  };
  bottomButton?: {
    text?: string;
    icon?: Icon;
    callback?: () => Promise<any>;
  };
}
