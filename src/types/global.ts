export type Modals =
  | 'imageAndText'
  | 'videoGallery'
  | 'imageSlider'
  | 'imageAndVideo'
  | 'verticalVideos';

export interface Modal {
  type: Modals;
  id: number;
}

export interface Parent {
  id: string;
  label: string;
}

export interface Location {
  x: number;
  y: number;
  parent: Parent | null;
  modal: Modal;
  preview?: string;
}

export enum LocationTypeEnum {
  onCampus = 'onCampus',
  offCampus = 'offCampus'
}

export type locationType = LocationTypeEnum;

export interface SidebarChildrenItem {
  id: string;
  label: string;
  type: locationType;
  location: Location;
}

export interface SidebarItem {
  id: string;
  label: string;
  children: SidebarChildrenItem[] | null;
}

export interface OptionType {
  label: string;
  value: string;
}

export interface ParagraphData {
  image?: string;
  title?: string;
  text?: string;
  anchorClass?: string;
}

export interface VideoData {
  url: string;
  title?: string;
  poster?: string;
}

export interface IconItem {
  icon: string;
  text: string;
  link?: string;
}

export interface SearchResult {
  item: SidebarItem | SidebarChildrenItem;
  parent: SidebarItem | null;
}

export type labelPositionType = 'left' | 'right';
