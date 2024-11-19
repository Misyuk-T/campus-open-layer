import { FiMove } from 'react-icons/fi';
import { LiaPlusSolid } from 'react-icons/lia';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setActiveLocation } from '@src/store/reducers/locations';
import { openModalByType } from '@src/store/reducers/modals.ts';
import { SidebarChildrenItem } from '@src/types/global.ts';
import { AnimatePresence, motion } from 'framer-motion';

import { Button, Flex, IconButton } from '@chakra-ui/react';

// @ts-expect-error - framer-motion types are not up-to-date.
// Type error after fix https://github.com/chakra-ui/chakra-ui/issues/4561
const MotionButton = motion(Button);

interface BuildingOverlayProps {
  childrenItem: SidebarChildrenItem;
}

const BuildingOverlay = ({ childrenItem }: BuildingOverlayProps) => {
  const dispatch = useAppDispatch();
  const { activeLocation } = useAppSelector((state) => state.locations);

  const isOpen = activeLocation?.id === childrenItem.id;
  const modalType = childrenItem.location.modal;

  const toggleOverlay = () => {
    dispatch(
      setActiveLocation(activeLocation === childrenItem ? null : childrenItem)
    );
  };

  const handleClick = () => {
    if (modalType) {
      dispatch(setActiveLocation(childrenItem));
      dispatch(openModalByType(modalType.type));
    }
  };

  return (
    <Flex alignItems='center' position='absolute' left='-18px' width='100%'>
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
        {isOpen && (
          <MotionButton
            color='white'
            colorScheme='blue'
            fontWeight='semibold'
            size='lg'
            minWidth='none'
            ml='-1px'
            px='17px'
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            transition={{ duration: 0.15 }}
            exit={{ opacity: 0, visibility: 'hidden' }}
            onClick={handleClick}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, visibility: 'visible' }}
              exit={{ opacity: 0, visibility: 'hidden' }}
              transition={{
                duration: isOpen ? 0.2 : 0,
                delay: isOpen ? 0.2 : 0
              }}
            >
              {childrenItem.label}
            </motion.span>
          </MotionButton>
        )}
      </AnimatePresence>
    </Flex>
  );
};

export default BuildingOverlay;
