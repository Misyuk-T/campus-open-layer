import { IoTriangle } from 'react-icons/io5';
import { fetchDataAndOpenModal } from '@src/store/actions/modals.ts';
import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts';
import {
  MenuLinkChildrenContent,
  MenuLinkParentContent,
  PopupEntityTypeToPopupType
} from '@src/types/sideMenu.ts';
import { OFF_CAMPUS_INDICATOR } from '@src/utils/constants.ts';

import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Text,
  VStack
} from '@chakra-ui/react';

interface SidebarTabProps {
  tab: MenuLinkParentContent;
  onSelectMenuItem: (tab: MenuLinkParentContent) => void;
  onSelectLocation: (tab: MenuLinkChildrenContent) => void;
}

const MenuItem = ({
  tab,
  onSelectLocation,
  onSelectMenuItem
}: SidebarTabProps) => {
  const dispatch = useAppDispatch();
  const { openModal } = useAppSelector((state) => state.modals);
  const { activeLocation } = useAppSelector((state) => state.locations);

  const tabTitle = tab.attributes.title;
  const isOffCampusItem = tabTitle.toLowerCase().includes(OFF_CAMPUS_INDICATOR);

  const isSomeModalOpen = openModal.id !== null;
  const isParent = tab.attributes.submenu && tab.attributes.submenu.length > 0;
  const isSingleChild = isParent && tab.attributes.submenu?.length === 1;
  const firstChild = tab.attributes.submenu?.[0];

  const handleOpenModal = (location: MenuLinkChildrenContent) => {
    const popupData = location.attributes.entity_data.attributes.popup_data;
    if (popupData) {
      const popupType = PopupEntityTypeToPopupType[popupData.type];
      dispatch(fetchDataAndOpenModal(popupType, popupData.id));
    }
  };

  const handleSelectLocation = (location: MenuLinkChildrenContent) => () => {
    const isCoordinatesExist = location.attributes.location;
    onSelectLocation(location);
    if (isOffCampusItem && !isCoordinatesExist) {
      handleOpenModal(location);
    }
  };

  const handleSelectItemMenu = () => {
    onSelectMenuItem(tab);
    if (isSingleChild) {
      handleSelectLocation(firstChild)();
    }
  };

  return (
    <AccordionItem border='none'>
      <AccordionButton
        onClick={handleSelectItemMenu}
        position='relative'
        pl='30px'
        pr={{ base: '30px', md: '5px' }}
        py='11px'
        bg={{ base: 'transparent', md: 'whiteOpacity.10' }}
        mt='3px'
        mb='3px'
        fontSize='12px'
        fontWeight='bold'
        textAlign='left'
        color='gray.150'
        _hover={{ bg: 'primary.150', color: 'white' }}
        _expanded={{
          bg: isOffCampusItem ? 'yellow.100' : 'primary.150',
          color: isOffCampusItem ? 'black' : 'white',
          mb: 0,
          svg: { opacity: isParent ? 1 : 0 }
        }}
      >
        <Text>{tabTitle}</Text>
        <Box
          display={{ base: 'block', sm: 'none' }}
          transform='rotate(180deg)'
          position='absolute'
          right='20px'
        >
          <IoTriangle opacity={0} />
        </Box>
      </AccordionButton>

      {isParent && !isSingleChild && (
        <AccordionPanel bg='gray.25' p={0}>
          <VStack gap={0} py='8px'>
            {tab.attributes.submenu?.map((child, index) => {
              const isActive = activeLocation?.id === child.id;
              const shouldHighlight = isActive && isSomeModalOpen;

              return (
                <Button
                  onClick={handleSelectLocation(child)}
                  key={index}
                  variant='link'
                  w='100%'
                  pl='30px'
                  py='4px'
                  border='none'
                  color={shouldHighlight ? 'gray.750' : 'primary.150'}
                  fontSize='10px'
                  fontWeight={500}
                >
                  <Text
                    textAlign='left'
                    lineHeight='120%'
                    w='100%'
                    whiteSpace='wrap'
                  >
                    {child.attributes.title}
                  </Text>
                </Button>
              );
            })}
          </VStack>
        </AccordionPanel>
      )}
    </AccordionItem>
  );
};

export default MenuItem;
