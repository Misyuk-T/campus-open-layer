import { ChangeEvent, useRef, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useAppDispatch } from '@src/store/hooks.ts';
import {
  setActiveLocation,
  setActiveLocations
} from '@src/store/reducers/locations.ts';
import { setSelectedMenuItem } from '@src/store/reducers/sideMenu.ts';
import {
  SearchResult,
  SidebarChildrenItem,
  SidebarItem
} from '@src/types/global.ts';
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
  items: SidebarItem[];
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

  const handleSelectLocation = (item: SidebarChildrenItem | null) => {
    dispatch(setActiveLocation(item));
  };

  const handleSelectMenuItem = (item: SidebarItem) => {
    dispatch(setSelectedMenuItem(item));
    dispatch(setActiveLocations(item.children || []));
  };

  const handleClickItem =
    (item: SidebarChildrenItem | SidebarItem, parent: SidebarItem | null) =>
    () => {
      if ('children' in item && item.children) {
        const isSingleChild = item.children.length === 1;
        handleSelectMenuItem(item as SidebarItem);
        if (isSingleChild) {
          handleSelectLocation(item.children[0]);
        }
      } else {
        handleSelectLocation(item as SidebarChildrenItem);
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
    <Box position='relative' width='230px' ref={searchRef}>
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
            outline: 'none'
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
                    {item.label}
                  </Text>
                </Button>
              ))}
            </VStack>
          ) : (
            <Box p='10px'>
              <Text>No results found</Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
