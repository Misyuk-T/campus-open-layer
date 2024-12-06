import { FiMove } from 'react-icons/fi';
import { LiaPlusSolid } from 'react-icons/lia';
import { fetchDataAndOpenModal } from '@src/store/actions/modals.ts';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setActiveLocation } from '@src/store/reducers/locations';
import { labelPositionType } from '@src/types/global.ts';
import {
  MenuLinkChildrenContent,
  PopupEntityTypeToPopupType
} from '@src/types/sideMenu.ts';
import { AnimatePresence, motion } from 'framer-motion';

import { Button, Flex, IconButton, Text } from '@chakra-ui/react';

// Type error after fix https://github.com/chakra-ui/chakra-ui/issues/4561
// @ts-expect-error - framer-motion types are not up-to-date.
const MotionButton = motion(Button);
// @ts-expect-error - framer-motion types are not up-to-date.
const MotionText = motion(Text);

interface BuildingOverlayProps {
  childrenItem: MenuLinkChildrenContent;
  labelPosition?: labelPositionType;
}

const BuildingOverlay = ({
  childrenItem,
  labelPosition = 'right'
}: BuildingOverlayProps) => {
  const dispatch = useAppDispatch();
  const { activeLocation } = useAppSelector((state) => state.locations);

  const isRightPlacement = labelPosition === 'right';
  const isOpen = activeLocation?.id === childrenItem.id;

  const toggleOverlay = () => {
    dispatch(
      setActiveLocation(activeLocation === childrenItem ? null : childrenItem)
    );
  };

  const handleClick = () => {
    dispatch(setActiveLocation(childrenItem));
    const popupData = childrenItem.attributes.entity_data.attributes.popup_data;
    if (popupData) {
      const popupType = PopupEntityTypeToPopupType[popupData.type];
      dispatch(fetchDataAndOpenModal(popupType, popupData.id));
    }
  };

  return (
    <Flex alignItems='center' position='relative'>
      <IconButton
        aria-label='Toggle Building Info'
        variant='filled'
        colorScheme='blue'
        onClick={toggleOverlay}
        size='xl'
        position='relative'
        overflow='hidden'
        zIndex='5'
        icon={
          <Flex alignItems='center' justifyContent='center'>
            <motion.div
              style={{ position: 'absolute' }}
              animate={{
                rotate: isOpen ? 45 : 0,
                opacity: isOpen ? 0 : 1
              }}
              transition={{ duration: 0.15 }}
            >
              <LiaPlusSolid
                strokeWidth='1.4px'
                style={{
                  transform: 'scale(1.3)'
                }}
              />
            </motion.div>
            <motion.div
              style={{ position: 'absolute' }}
              initial={{ rotate: 0, opacity: 0 }}
              animate={{
                rotate: isOpen ? 0 : -45,
                opacity: isOpen ? 1 : 0
              }}
              transition={{ duration: 0.15 }}
            >
              <FiMove
                style={{
                  transform: 'rotate(45deg) scale(1.3)'
                }}
              />
            </motion.div>
          </Flex>
        }
      />

      <AnimatePresence>
        <MotionButton
          visibility={isOpen ? 'visible' : 'hidden'}
          color='white'
          colorScheme='blue'
          fontWeight='semibold'
          size='lg'
          minWidth='none'
          px='17px'
          position='absolute'
          left={isRightPlacement ? '100%' : 'auto'}
          right={isRightPlacement ? 'auto' : '100%'}
          ml={isRightPlacement ? '-1px' : 0}
          mr={isRightPlacement ? 0 : '-1px'}
          initial={{
            width: 0,
            opacity: 0
          }}
          animate={{
            width: 'auto',
            opacity: 1
          }}
          transition={{ duration: 0.2 }}
          pointerEvents={isOpen ? 'auto' : 'none'}
          onClick={handleClick}
        >
          <MotionText
            visibility={isOpen ? 'visible' : 'hidden'}
            color={isOpen ? 'white' : 'transparent'}
            initial={{ opacity: 0, visibility: 'hidden' }}
            animate={{ opacity: 1, visibility: 'visible' }}
            transition={{
              duration: isOpen ? 0.2 : 0
            }}
          >
            {childrenItem.attributes.title}
          </MotionText>
        </MotionButton>
      </AnimatePresence>
    </Flex>
  );
};

export default BuildingOverlay;
