import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import {
  setActiveLocation,
  setActiveLocations
} from '@src/store/reducers/locations.ts';
import { setSelectedMenuItem } from '@src/store/reducers/sideMenu.ts';
import {
  MenuLinkChildrenContent,
  MenuLinkParentContent
} from '@src/types/sideMenu.ts';

import { Box } from '@chakra-ui/react';

import { BurgerMenu, Sidebar } from './components';

const Navigation = () => {
  const dispatch = useAppDispatch();
  const { selectedMenuItem, menu, isLoading } = useAppSelector(
    (state) => state.sideMenu
  );
  const { activeLocation } = useAppSelector((state) => state.locations);

  const isMenuDataExist = menu && menu.length > 0;
  const shouldRenderContent = isMenuDataExist && !isLoading;

  const handleSelectLocation = (item: MenuLinkChildrenContent | null) => {
    dispatch(setActiveLocation(item));
  };

  const handleResetLocation = () => {
    dispatch(setActiveLocation(null));
  };

  const handleToggleLocation = (item: MenuLinkChildrenContent | null) => {
    if (activeLocation?.id === item?.id) {
      handleResetLocation();
    } else {
      handleSelectLocation(item);
    }
  };

  const handleSelectMenuItem = (item: MenuLinkParentContent) => {
    dispatch(setSelectedMenuItem(item));
    dispatch(setActiveLocations(item.attributes.submenu || []));
  };

  const handleResetMenuItem = () => {
    dispatch(setSelectedMenuItem(null));
    dispatch(setActiveLocations([]));
    dispatch(setActiveLocation(null));
  };

  const handleToggleMenuItem = (item: MenuLinkParentContent) => {
    if (selectedMenuItem?.id === item.id) {
      handleResetMenuItem();
    } else {
      handleSelectMenuItem(item);
    }
    handleResetLocation();
  };

  return (
    <>
      <Box display={{ base: 'block', md: 'none' }} w='100%' h='100%'>
        {shouldRenderContent && (
          <BurgerMenu
            items={menu}
            onSelectMenuItem={handleToggleMenuItem}
            onSelectLocation={handleToggleLocation}
            activeLocation={activeLocation}
          />
        )}
      </Box>
      <Box
        display={{ base: 'none', md: 'flex' }}
        flex='1 0 auto'
        width='250px'
        color='white'
        bg='gray.700'
        mr='auto'
      >
        {shouldRenderContent && (
          <Sidebar
            items={menu}
            onSelectMenuItem={handleToggleMenuItem}
            onSelectLocation={handleToggleLocation}
          />
        )}
      </Box>
    </>
  );
};

export default Navigation;
