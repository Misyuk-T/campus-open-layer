import {
  MenuLinkChildrenContent,
  MenuLinkParentContent
} from '@src/types/sideMenu.ts';

export interface OptionType {
  label: string;
  value: string;
}

export interface IconItem {
  icon: string;
  text: string;
  link?: string;
}

export interface SearchResult {
  item: MenuLinkParentContent | MenuLinkChildrenContent;
  parent: MenuLinkParentContent | null;
}

export type labelPositionType = 'left' | 'right';
