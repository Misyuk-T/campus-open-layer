import { ChangeEvent, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { fetchDataAndOpenModal } from '@src/store/actions/modals.ts';
import { useAppDispatch } from '@src/store/hooks.ts';
import {
  setActiveLocation,
  setActiveLocations
} from '@src/store/reducers/locations.ts';
import { setSelectedMenuItem } from '@src/store/reducers/sideMenu.ts';
import { SearchResult } from '@src/types/global.ts';
import {
  LocationEntityTypeEnum,
  MenuLinkChildrenContent,
  MenuLinkParentContent,
  PopupEntityTypeToPopupType
} from '@src/types/sideMenu.ts';
import { ScrollBar } from '@src/ui/ScrollBar';
import { searchItems } from '@src/utils/helpers.ts';

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useOutsideClick,
  useTheme,
  VStack
} from '@chakra-ui/react';

interface SearchBarProps {
  items: MenuLinkParentContent[];
}

const SearchBar = ({ items }: SearchBarProps) => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<SearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const results = searchItems(items, query);
      setFilteredItems(results);
      setIsDropdownOpen(true);
    } else {
      setFilteredItems([]);
      setIsDropdownOpen(false);
    }
  };

  const handleSelectLocation = (item: MenuLinkChildrenContent | null) => {
    dispatch(setActiveLocation(item));
    const entityData = item?.attributes.entity_data;
    if (entityData && entityData.type === LocationEntityTypeEnum.offCampus) {
      const popupData = entityData.attributes.popup_data;
      if (popupData) {
        const popupType = PopupEntityTypeToPopupType[popupData.type];
        dispatch(fetchDataAndOpenModal(popupType, popupData.id));
      }
    }
  };

  const handleSelectMenuItem = (item: MenuLinkParentContent) => {
    dispatch(setSelectedMenuItem(item));
    dispatch(setActiveLocations(item.attributes.submenu || []));
  };

  const handleClickItem =
    (
      item: MenuLinkChildrenContent | MenuLinkParentContent,
      parent: MenuLinkParentContent | null
    ) =>
    () => {
      const children = item.attributes.submenu;
      if (children) {
        const isSingleChild = children.length === 1;
        handleSelectMenuItem(item as MenuLinkParentContent);
        if (isSingleChild) {
          handleSelectLocation(children[0]);
        }
      } else {
        handleSelectLocation(item as MenuLinkChildrenContent);
        if (parent) {
          handleSelectMenuItem(parent);
        }
      }
      handleDropdownClose();
    };

  useOutsideClick({
    ref: searchRef,
    handler: handleDropdownClose
  });

  return (
    <Box position='relative' width='100%' ref={searchRef}>
      <InputGroup>
        <Input
          placeholder='Search the campus map'
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleDropdownOpen}
          border='none'
          outline='none'
          pl='15px'
          pr='35px'
          height='36px'
          fontSize='12px'
          fontWeight='500'
          bg='white'
          _placeholder={{
            fontSize: '12px',
            color: 'gray.200'
          }}
          _focus={{
            border: 'none',
            outline: 'none',
            boxShadow: 'none'
          }}
        />
        <InputRightElement width='36px' height='36px'>
          <IoIosSearch color={colors.gray[200]} size={20} />
        </InputRightElement>
      </InputGroup>
      {isDropdownOpen && (
        <Box
          position='absolute'
          top='100%'
          left='0'
          width='100%'
          bg='white'
          border='1px solid gray.200'
          zIndex='10'
          mt='1px'
          maxHeight='150px'
          py='10px'
          overflowY='auto'
        >
          <ScrollBar maxHeight='150px'>
            {filteredItems.length > 0 ? (
              <VStack spacing={0} align='stretch'>
                {filteredItems.map(({ item, parent }, index) => (
                  <Button
                    key={index}
                    onClick={handleClickItem(item, parent)}
                    variant='link'
                    w='100%'
                    px='15px'
                    py='4px'
                    color='primary.150'
                    fontSize='12px'
                    fontWeight={500}
                  >
                    <Text
                      textAlign='left'
                      lineHeight='120%'
                      w='100%'
                      whiteSpace='wrap'
                    >
                      {item.attributes.title || ''}
                    </Text>
                  </Button>
                ))}
              </VStack>
            ) : (
              <Text fontSize='12px' textAlign='center' fontWeight='500'>
                No results found
              </Text>
            )}
          </ScrollBar>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
