import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setActiveLocation } from '@src/store/reducers/locations.ts';
import { closeModals } from '@src/store/reducers/modals';
import {
  Popup1Data,
  Popup2Data,
  Popup3Data,
  Popup4Data,
  PopupType
} from '@src/types/modals';
import { Drawer, Loader } from '@src/ui';
import { mapAnchorListToOptions } from '@src/utils/helpers.ts';

import { Box } from '@chakra-ui/react';

import {
  ImageAndText,
  ImageAndVideo,
  ImageSlider,
  VideoContent
} from './components';

const GlobalDialogs = () => {
  const dispatch = useAppDispatch();
  const { openModal, data, isLoading } = useAppSelector(
    (state) => state.modals
  );

  const openModalId = openModal.id || '';
  const openModalType = openModal.type || ('' as PopupType);
  const isSomeModalOpen = !!openModalId && !!openModalType;

  const modalType = data[openModalType];
  const modalData = modalType && modalType[openModalId];
  const drawerTitle = modalData?.attributes.field_title || '';
  const drawerDescription = modalData?.attributes?.field_subtitle || '';

  const anchorList = modalData?.attributes?.anchor_list;
  const options = anchorList ? mapAnchorListToOptions(anchorList) : [];
  const isVideoPopup = openModalType === PopupType.VIDEO_POPUP;
  const withScroll =
    isVideoPopup && modalData
      ? 'field_video_orientation' in modalData.attributes &&
        !modalData.attributes?.field_video_orientation
      : true;

  let content;

  const onClose = () => {
    dispatch(closeModals());
    dispatch(setActiveLocation(null));
  };

  if (isLoading && !modalData) {
    content = <Loader absolute />;
  } else {
    switch (openModal.type) {
      case PopupType.POPUP_WITH_IMAGE_AND_VIDEOS:
        content = <ImageAndVideo data={modalData as Popup1Data} />;
        break;
      case PopupType.SINGLE_TEXT_POPUP:
        content = <ImageAndText data={modalData as Popup2Data} />;
        break;
      case PopupType.VIDEO_POPUP:
        content = <VideoContent data={modalData as Popup3Data} />;
        break;
      case PopupType.IMAGE_SLIDER_POPUP:
        content = <ImageSlider data={modalData as Popup4Data} />;
        break;
      default:
        content = <Box p='50px'>Try again...</Box>;
    }
  }

  return (
    <Drawer
      isOpen={isSomeModalOpen}
      onClose={onClose}
      title={drawerTitle}
      description={drawerDescription}
      options={options}
      withScroll={withScroll}
    >
      {content}
    </Drawer>
  );
};

export default GlobalDialogs;
