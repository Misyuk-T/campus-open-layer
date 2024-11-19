import { useEffect } from 'react';
import { items } from '@src/components/Navigation/mocks.ts';
import { getSideMenu } from '@src/store/actions/sideMenu';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import {
  setActiveLocation,
  setActiveLocations
} from '@src/store/reducers/locations.ts';
import { setSelectedMenuItem } from '@src/store/reducers/sideMenu.ts';
import { SidebarChildrenItem, SidebarItem } from '@src/types/global';

import { Box } from '@chakra-ui/react';

import { BurgerMenu, Sidebar } from './components';

const Navigation = () => {
  const dispatch = useAppDispatch();
  const { selectedMenuItem } = useAppSelector((state) => state.sideMenu);
  const { activeLocation } = useAppSelector((state) => state.locations);

  const handleSelectLocation = (item: SidebarChildrenItem | null) => {
    dispatch(setActiveLocation(item));
  };

  const handleResetLocation = () => {
    dispatch(setActiveLocation(null));
  };

  const handleToggleLocation = (item: SidebarChildrenItem | null) => {
    if (activeLocation?.id === item?.id) {
      handleResetLocation();
    } else {
      handleSelectLocation(item);
    }
  };

  const handleSelectMenuItem = (item: SidebarItem) => {
    dispatch(setSelectedMenuItem(item));
    dispatch(setActiveLocations(item.children || []));
  };

  const handleResetMenuItem = () => {
    dispatch(setSelectedMenuItem(null));
    dispatch(setActiveLocations([]));
    dispatch(setActiveLocation(null));
  };

  const handleToggleMenuItem = (item: SidebarItem) => {
    if (selectedMenuItem?.id === item.id) {
      handleResetMenuItem();
    } else {
      handleSelectMenuItem(item);
    }
    handleResetLocation();
  };

  useEffect(() => {
    dispatch(getSideMenu());
  }, [dispatch]);

  return (
    <>
      <Box display={{ base: 'block', md: 'none' }} w='100%' h='100%'>
        <BurgerMenu
          items={items}
          onSelectMenuItem={handleToggleMenuItem}
          onSelectLocation={handleToggleLocation}
          activeLocation={activeLocation}
        />
      </Box>
      <Box display={{ base: 'none', md: 'flex' }} flex='1 0 auto'>
        <Sidebar
          items={items}
          onSelectMenuItem={handleToggleMenuItem}
          onSelectLocation={handleToggleLocation}
        />
      </Box>
    </>
  );
};

export default Navigation;
