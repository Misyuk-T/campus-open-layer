import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts';
import { setActiveLocation } from '@src/store/reducers/locations.ts';
import { SidebarChildrenItem, SidebarItem } from '@src/types/global';

import {
  Accordion,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Stack,
  Text
} from '@chakra-ui/react';

import { MenuItem } from '../MenuItem';

interface BurgerMenuProps {
  items: SidebarItem[];
  activeLocation: SidebarChildrenItem | null;
  onSelectMenuItem: (tab: SidebarItem) => void;
  onSelectLocation: (tab: SidebarChildrenItem) => void;
}

const BurgerMenu = ({
  items,
  activeLocation,
  onSelectLocation,
  onSelectMenuItem
}: BurgerMenuProps) => {
  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state) => state.modals);

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const isSomeModalOpen = Object.values(modals).some((modal) => modal);
  const shouldRenderSubHeader = activeLocation && isSomeModalOpen;

  const handleMenuItemSelect = (item: SidebarItem) => {
    onSelectMenuItem(item);
    if (item.children && item.children.length === 1) {
      setDrawerOpen(false);
    }
  };

  const handleSelectLocation = (item: SidebarChildrenItem) => {
    onSelectLocation(item);
    setDrawerOpen(false);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    if (!isSomeModalOpen) {
      dispatch(setActiveLocation(null));
    }
  }, [dispatch, isSomeModalOpen]);

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
            {activeLocation.label}
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
          <DrawerBody height='auto' flex='none' px={0} py='8px'>
            <Accordion allowToggle>
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
