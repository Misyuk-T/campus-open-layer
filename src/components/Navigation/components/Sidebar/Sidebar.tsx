import { useAppSelector } from '@src/store/hooks.ts';
import { SidebarChildrenItem, SidebarItem } from '@src/types/global.ts';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text
} from '@chakra-ui/react';

import { MenuItem } from '../MenuItem';

interface SidebarProps {
  items: SidebarItem[];
  onSelectMenuItem: (tab: SidebarItem) => void;
  onSelectLocation: (tab: SidebarChildrenItem) => void;
}

const Sidebar = ({
  items,
  onSelectLocation,
  onSelectMenuItem
}: SidebarProps) => {
  const { selectedMenuItem } = useAppSelector((state) => state.sideMenu);

  const activeIndex = selectedMenuItem
    ? items.findIndex((item) => item.id === selectedMenuItem.id) + 1
    : -1;

  return (
    <Box
      width='250px'
      color='white'
      bg='gray.700'
      mr='auto'
      flex='1 0 auto'
      zIndex={11}
    >
      <Box py='24px' px='8px'>
        <Text
          fontFamily='primary'
          textAlign='center'
          fontSize='16px'
          fontWeight='bold'
        >
          Interactive Campus Map
        </Text>
      </Box>

      <Accordion index={activeIndex}>
        {/*TODO: Need to remove fake item from here. Its added due resize issue which expand all accordion items when active index === 0*/}
        <AccordionItem visibility='hidden' height='0px'>
          <AccordionButton />
          <AccordionPanel />
        </AccordionItem>
        {items.map((item, index) => {
          return (
            <MenuItem
              key={index}
              onSelectMenuItem={onSelectMenuItem}
              onSelectLocation={onSelectLocation}
              tab={item}
            />
          );
        })}
      </Accordion>
    </Box>
  );
};

export default Sidebar;
