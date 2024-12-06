import { PopupType } from '@src/types/modals.ts';

export interface Link {
  href: string;
}

export interface Links {
  self: Link;
}

export enum PopupEntityType {
  POPUP_WITH_IMAGE_AND_VIDEOS = `paragraph--${PopupType.POPUP_WITH_IMAGE_AND_VIDEOS}`,
  SINGLE_TEXT_POPUP = `paragraph--${PopupType.SINGLE_TEXT_POPUP}`,
  VIDEO_POPUP = `paragraph--${PopupType.VIDEO_POPUP}`,
  IMAGE_SLIDER_POPUP = `paragraph--${PopupType.IMAGE_SLIDER_POPUP}`
}

export const PopupEntityTypeToPopupType: Record<PopupEntityType, PopupType> = {
  [PopupEntityType.POPUP_WITH_IMAGE_AND_VIDEOS]:
    PopupType.POPUP_WITH_IMAGE_AND_VIDEOS,
  [PopupEntityType.SINGLE_TEXT_POPUP]: PopupType.SINGLE_TEXT_POPUP,
  [PopupEntityType.VIDEO_POPUP]: PopupType.VIDEO_POPUP,
  [PopupEntityType.IMAGE_SLIDER_POPUP]: PopupType.IMAGE_SLIDER_POPUP
};

export interface PopupData {
  type: PopupEntityType;
  id: string;
  link: string;
}

export interface FieldPreviewImage {
  url: string;
  alt: string;
}

export interface EntityDataAttributes {
  status: boolean;
  title: string;
  popup_data?: PopupData;
  field_preview_image?: FieldPreviewImage;
}

export enum LocationEntityTypeEnum {
  onCampus = 'node--location',
  offCampus = 'node--off_campus'
}

interface Location {
  coordinateX: number;
  coordinateY: number;
  label: string;
  parentId: string;
}

export interface EntityData {
  type: LocationEntityTypeEnum;
  id: string;
  title: string;
  links: Links;
  attributes: EntityDataAttributes;
}

export interface ChildrenAttributes {
  enabled: boolean;
  title: string;
  weight: number;
  entity_data: EntityData;
  location: Location;
  submenu: null;
}

export interface MenuLinkChildrenContent {
  id: string;
  links: Links;
  attributes: ChildrenAttributes;
}

export interface ParentAttributes {
  enabled: boolean;
  title: string;
  weight: number;
  submenu: MenuLinkChildrenContent[];
}

export interface MenuLinkParentContent {
  type: string;
  id: string;
  links: Links;
  attributes: ParentAttributes;
}

export interface SideMenuResponseData {
  data: MenuLinkParentContent[];
  links: Links;
}
