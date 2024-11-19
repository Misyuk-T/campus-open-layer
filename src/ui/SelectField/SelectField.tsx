'use client';

import { FC } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoChevronDown } from 'react-icons/io5';
import Select, {
  components,
  CSSObjectWithLabel,
  DropdownIndicatorProps,
  OptionProps,
  Props as SelectProps,
  SingleValue
} from 'react-select';
import makeAnimated from 'react-select/animated';
import { AdobeClean } from '@src/styles/theme/fonts.ts';
import { OptionType } from '@src/types/global.ts';

import { useTheme } from '@chakra-ui/react';

const animatedComponents = makeAnimated();

const DropdownIndicator: FC<DropdownIndicatorProps<OptionType, false>> = (
  props
) => {
  return (
    <components.DropdownIndicator {...props}>
      <IoChevronDown width={29} height={29} />
    </components.DropdownIndicator>
  );
};

const IconOption: FC<OptionProps<OptionType, false>> = (props) => {
  const { label, isSelected } = props;
  return (
    <components.Option {...props}>
      {label}
      {isSelected && <AiOutlineCheck width={11} height={11} />}
    </components.Option>
  );
};

interface SelectFieldProps
  extends Omit<SelectProps<OptionType, false>, 'onChange' | 'value'> {
  name: string;
  value: string | null;
  options: OptionType[];
  placeholder?: string;
  onChange: (value: OptionType | null) => void;
  stylesControl?: CSSObjectWithLabel;
  stylesMenu?: CSSObjectWithLabel;
  stylesPlaceholder?: CSSObjectWithLabel;
  stylesMenuList?: CSSObjectWithLabel;
  stylesOption?: CSSObjectWithLabel;
  stylesValueContainer?: CSSObjectWithLabel;
  dropdownIndicatorStyles?: CSSObjectWithLabel;
}

const SelectField: FC<SelectFieldProps> = ({
  value,
  name,
  options,
  placeholder,
  onChange,
  stylesControl = {},
  stylesMenu = {},
  stylesPlaceholder = {},
  stylesOption = {},
  stylesValueContainer = {},
  dropdownIndicatorStyles = {},
  stylesMenuList = {},
  ...rest
}) => {
  const { colors } = useTheme();

  const findItemByValue = (searchedValue: string | null) =>
    options.find((item) => item.value === searchedValue) || null;

  const handleChange = (selectedItem: SingleValue<OptionType>) => {
    onChange(selectedItem);
  };

  return (
    <Select
      {...rest}
      value={findItemByValue(value)}
      name={name}
      components={{
        ...animatedComponents,
        DropdownIndicator,
        Option: IconOption
      }}
      options={options}
      placeholder={placeholder}
      onChange={handleChange}
      blurInputOnSelect
      styles={{
        control: (styles) =>
          ({
            ...styles,
            fontSize: 14,
            color: colors.gray[400],
            backgroundColor: 'white',
            borderRadius: 0,
            borderColor: 'transparent',
            fontWeight: 400,
            boxShadow: 'none',
            height: '36px',
            minHeight: '36px',
            '&:hover': {
              cursor: 'pointer'
            },
            ...stylesControl
          }) as CSSObjectWithLabel,
        indicatorSeparator: (styles) =>
          ({
            ...styles,
            display: 'none'
          }) as CSSObjectWithLabel,
        dropdownIndicator: (styles, state) =>
          ({
            ...styles,
            padding: 0,
            opacity: 1,
            marginRight: '11px',
            color: colors.gray[400],
            transition: 'all .2s ease',
            transform: state.selectProps.menuIsOpen
              ? 'rotate(180deg)'
              : 'rotate(0)',
            ...dropdownIndicatorStyles
          }) as CSSObjectWithLabel,
        option: (styles) =>
          ({
            ...styles,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '14px',
            fontFamily: AdobeClean,
            fontWeight: 400,
            backgroundColor: 'transparent',
            color: colors.gray[300],
            cursor: 'pointer',
            '&:last-child': {
              borderBottom: 'none'
            },
            '&:active': {
              backgroundColor: 'transparent'
            },
            borderRadius: 0,
            border: 'none',
            padding: '10px 12px',
            '&:hover': {
              backgroundColor: colors.gray[50]
            },
            ...stylesOption
          }) as CSSObjectWithLabel,
        placeholder: (styles) =>
          ({
            ...styles,
            position: 'relative',
            top: '2px',
            fontWeight: 400,
            color: colors.gray[300],
            fontFamily: AdobeClean,
            fontStyle: 'italic',
            whiteSpace: 'nowrap',
            ...stylesPlaceholder
          }) as CSSObjectWithLabel,
        menu: (styles) =>
          ({
            ...styles,
            margin: 0,
            borderRadius: 0,
            backgroundColor: colors.white,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            ...stylesMenu
          }) as CSSObjectWithLabel,
        menuList: (styles) =>
          ({
            ...styles,
            padding: 0,
            margin: 0,
            borderRadius: 0,
            backgroundColor: 'white',
            boxSizing: 'border-box',
            ...stylesMenuList
          }) as CSSObjectWithLabel,
        valueContainer: (styles) =>
          ({
            ...styles,
            ...stylesValueContainer
          }) as CSSObjectWithLabel
      }}
    />
  );
};

export default SelectField;
