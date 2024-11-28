import { IoTriangle } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@src/store/hooks.ts';
import { openModalByType } from '@src/store/reducers/modals.ts';
import {
  LocationTypeEnum,
  SidebarChildrenItem,
  SidebarItem
} from '@src/types/global.ts';

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
  tab: SidebarItem;
  onSelectMenuItem: (tab: SidebarItem) => void;
  onSelectLocation: (tab: SidebarChildrenItem) => void;
}

const MenuItem = ({
  tab,
  onSelectLocation,
  onSelectMenuItem
}: SidebarTabProps) => {
  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state) => state.modals);
  const { activeLocation } = useAppSelector((state) => state.locations);

  const isOffCampusItem = tab.label.includes('Off Campus');
  const isSomeModalOpen = Object.values(modals).some((modal) => modal);
  const isParent = tab.children && tab.children.length > 0;
  const isSingleChild = isParent && tab.children?.length === 1;
  const firstChild = tab.children?.[0];

  const handleSelectItemMenu = () => {
    onSelectMenuItem(tab);
    if (isSingleChild && firstChild) {
      onSelectLocation(firstChild);
    }
  };

  const handleSelectLocation = (location: SidebarChildrenItem) => () => {
    onSelectLocation(location);
    if (location.type === LocationTypeEnum.offCampus) {
      dispatch(openModalByType(location.location.modal.type));
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
        <Text>{tab.label}</Text>
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
            {tab.children?.map((child, index) => {
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
                    {child.label}
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
