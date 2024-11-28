import { ReactNode, useEffect, useRef } from 'react';
import { ScrollbarProps, Scrollbars } from 'react-custom-scrollbars-2';
import { smoothScrollTo } from '@src/utils/helpers.ts';

interface CustomScrollBarProps extends ScrollbarProps {
  children: ReactNode;
  maxHeight: string;
  classToScroll?: string;
}

const ScrollBar = ({
  children,
  maxHeight,
  classToScroll,
  ...rest
}: CustomScrollBarProps) => {
  const scrollbarRef = useRef<Scrollbars>(null);

  useEffect(() => {
    if (classToScroll && scrollbarRef.current) {
      const scrollContainer = scrollbarRef.current.container;
      const element = scrollContainer.querySelector(
        `.${classToScroll}`
      ) as HTMLElement;
      if (element) {
        const elementOffsetTop = element.offsetTop;
        smoothScrollTo(elementOffsetTop, 500, scrollbarRef);
      }
    }
  }, [classToScroll]);

  return (
    <Scrollbars
      ref={scrollbarRef}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      hideTracksWhenNotNeeded
      autoHeight
      autoHeightMax={maxHeight}
      {...rest}
    >
      {children}
    </Scrollbars>
  );
};

export default ScrollBar;
