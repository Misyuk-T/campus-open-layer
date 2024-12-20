import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts';
import { setActiveLocation } from '@src/store/reducers/locations.ts';
import {
  MenuLinkChildrenContent,
  MenuLinkParentContent
} from '@src/types/sideMenu.ts';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Stack,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';

import { MenuItem } from '../MenuItem';

interface BurgerMenuProps {
  items: MenuLinkParentContent[];
  onSelectMenuItem: (tab: MenuLinkParentContent) => void;
  onSelectLocation: (tab: MenuLinkChildrenContent) => void;
  activeLocation: MenuLinkChildrenContent | null;
}

const BurgerMenu = ({
  items,
  activeLocation,
  onSelectLocation,
  onSelectMenuItem
}: BurgerMenuProps) => {
  const dispatch = useAppDispatch();
  const { openModal } = useAppSelector((state) => state.modals);
  const { selectedMenuItem } = useAppSelector((state) => state.sideMenu);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const openModalId = openModal.id || '';
  const openModalType = openModal.type || '';
  const isSomeModalOpen = !!openModalId && !!openModalType;
  const shouldRenderSubHeader = activeLocation && isSomeModalOpen;

  const activeIndex = selectedMenuItem
    ? items.findIndex((item) => item.id === selectedMenuItem.id) + 1
    : -1;

  const handleMenuItemSelect = (item: MenuLinkParentContent) => {
    onSelectMenuItem(item);
    const isSingleChildren =
      item.attributes.submenu && item.attributes.submenu.length === 1;
    if (isSingleChildren) {
      setDrawerOpen(false);
    }
  };

  const handleSelectLocation = (item: MenuLinkChildrenContent) => {
    onSelectLocation(item);
    setDrawerOpen(false);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    if (!isSomeModalOpen && isMobile) {
      dispatch(setActiveLocation(null));
    }
  }, [dispatch, isSomeModalOpen, isMobile]);

  return (
    <>
      <Stack w='100%' gap='3px' bg='black'>
        <Flex
          position='relative'
          alignItems='center'
          justifyContent='center'
          w='100%'
          gap='20px'
          minHeight='40px'
          bg='gray.600'
        >
          <IconButton
            position='absolute'
            aria-label={isDrawerOpen ? 'Close Menu' : 'Open Menu'}
            icon={isDrawerOpen ? <MdClose /> : <GiHamburgerMenu />}
            onClick={handleDrawerToggle}
            colorScheme='white'
            color='white'
            variant='outline'
            border='none'
            left={0}
            top={0}
            width='40px'
            height='40px'
            sx={{
              '& svg': {
                width: '20px',
                height: '20px'
              }
            }}
          />
          <Text textStyle='h5' as='h5' px='40px' color='whiteOpacity.90'>
            Interactive Campus Map
          </Text>
        </Flex>

        {shouldRenderSubHeader && (
          <Button
            position='absolute'
            py='10px'
            bg='gray.600'
            fontSize='12px'
            fontWeight='bold'
            color='white'
            border='none'
            width='100%'
            size='lg'
            top='42px'
            left={0}
            zIndex={11}
            _before={{
              content: '""',
              position: 'absolute',
              top: '-3px',
              left: '0',
              width: '100%',
              height: '3px',
              bg: 'gray.750'
            }}
          >
            {activeLocation?.attributes.title}
          </Button>
        )}
      </Stack>

      <Drawer
        isOpen={isDrawerOpen}
        placement='left'
        isFullHeight={false}
        size='full'
        onClose={handleDrawerToggle}
      >
        <DrawerOverlay />
        <DrawerContent
          mt='40px'
          bg='gray.700'
          bottom='initial !important'
          height='auto'
          p={0}
        >
          <DrawerBody height='auto' flex='none' px={0}>
            <Accordion index={activeIndex}>
              {/*TODO: Need to remove fake item from here. Its added due open/close drawer issue which expand all accordion items when active index === 0*/}
              <AccordionItem visibility='hidden' height='0px'>
                <AccordionButton />
                <AccordionPanel />
              </AccordionItem>
              {items.map((item, index) => (
                <MenuItem
                  key={index}
                  tab={item}
                  onSelectMenuItem={handleMenuItemSelect}
                  onSelectLocation={handleSelectLocation}
                />
              ))}
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BurgerMenu;
