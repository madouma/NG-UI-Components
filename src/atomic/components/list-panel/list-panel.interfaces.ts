import { Icon } from '../icon/icon.enum';
import { ListPanelSizeEnum } from './list-panel.enums';

export interface ListPanelItem {
  text: string;
  visible?: boolean;
  actions?: ListPanelAction[];
  id?: string;
  data?: any;
  icon?: Icon;
}

export interface ListPanelGroup {
  title?: string;
  items: ListPanelItem[];
  collapsed?: boolean;
  enableDrag?: boolean;
}

export interface ListPanelAction {
  icon: Icon;
  tooltip?: string;
  callback?: (g: ListPanelGroup, i: ListPanelItem) => Promise<any>;
}

export interface ListPanelOrderChanged {
  item: ListPanelItem;
  group: ListPanelGroup;
  previousIndex: number;
  currentIndex: number;
}

export interface ListPanelSelected {
  group: ListPanelGroup;
  item: ListPanelItem;
}

export interface ListPanelIconClicked {
  group: ListPanelGroup;
  item: ListPanelItem;
  icon: Icon;
}

export interface ListPanelConfig {
  listItemSize: ListPanelSizeEnum;
  showGroupHeaders: boolean;
  enableGroupCollapse: boolean;
  enableDrag: boolean;
}

export interface ListPanelObject {
  group: ListPanelGroup;
  icon: Icon;
  item: ListPanelItem;
}
