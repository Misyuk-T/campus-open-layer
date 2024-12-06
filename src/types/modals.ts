export enum PopupType {
  POPUP_WITH_IMAGE_AND_VIDEOS = 'campus_map_popup_1',
  SINGLE_TEXT_POPUP = 'campus_map_popup_2',
  VIDEO_POPUP = 'campus_map_popup_3',
  IMAGE_SLIDER_POPUP = 'campus_map_popup_4'
}

interface Thumbnail {
  url: string;
  alt: string;
}

export interface CampusVideo {
  name: string;
  thumbnail: Thumbnail;
  video_url: string;
}

interface Popup1Attributes {
  field_campus_video: CampusVideo[];
  field_headline_icon: Thumbnail | null;
  field_headline_summary: string | null;
  field_headline_title: string | null;
  field_location_description: string | null;
  field_location_image: Thumbnail | null;
  field_subtitle: string | null;
  field_title: string | null;
  anchor_list?: Anchor[] | null;
}

interface SelfLink {
  href: string;
}

interface DataLinks {
  self: SelfLink;
}

export interface Popup1Data {
  type: string;
  id: string;
  links: DataLinks;
  attributes: Popup1Attributes;
}

export interface Anchor {
  text: string;
  anchor_id: string;
}

export interface AnchorParameters {
  text: string;
  anchor_id: string;
}

export interface ParagraphData {
  field_location_description: string | null;
  field_location_image: Thumbnail | null;
  field_title: string | null;
  anchor_parameters: AnchorParameters;
}

interface Popup2Attributes {
  field_location_image: Thumbnail | null;
  field_title: string | null;
  field_subtitle?: string | null;
  anchor_list: Anchor[] | null;
}

interface Popup2Relationships {
  field_paragraph: ParagraphData[];
}

export interface Popup2Data {
  type: string;
  id: string;
  attributes: Popup2Attributes;
  relationships: Popup2Relationships;
}

interface Popup3Attributes {
  field_campus_video: CampusVideo[];
  field_subtitle_long: string | null;
  field_title: string | null;
  field_subtitle?: string | null;
  field_video_orientation: boolean;
  anchor_list?: Anchor[] | null;
}

export interface Popup3Data {
  type: string;
  id: string;
  attributes: Popup3Attributes;
}

interface Popup4Attributes {
  field_title: string | null;
  field_subtitle?: string | null;
  field_location_description: string | null;
  field_capacity: number | null;
  field_image_carousel: Thumbnail[];
  anchor_list?: Anchor[] | null;
}

export interface Popup4Data {
  type: string;
  id: string;
  attributes: Popup4Attributes;
  relationships: {
    field_location_links: {
      field_link_icon: Thumbnail;
      field_location_link: { uri: string; title: string };
    }[];
  };
}

export interface PopupDataTypeMap {
  [PopupType.POPUP_WITH_IMAGE_AND_VIDEOS]: Popup1Data;
  [PopupType.SINGLE_TEXT_POPUP]: Popup2Data;
  [PopupType.VIDEO_POPUP]: Popup3Data;
  [PopupType.IMAGE_SLIDER_POPUP]: Popup4Data;
}

export type ModalDataMap = {
  [K in PopupType]: Record<string, PopupDataTypeMap[K]>;
};

export interface ApiResponseData {
  data: Popup1Data | Popup2Data | Popup3Data | Popup4Data;
}
