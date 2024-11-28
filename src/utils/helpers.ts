import { RefObject } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import {
  SearchResult,
  SidebarChildrenItem,
  SidebarItem
} from '@src/types/global.ts';
import DOMPurify from 'dompurify';

/**
 * Searches items recursively to match the query and collects the matching items with their parent.
 *
 * @param {Array<SidebarItem | SidebarChildrenItem>} items - The items to search through.
 * @param {string} query - The search query.
 * @param {SidebarItem | null} [parent=null] - The parent item, if any, for nested items.
 * @returns {SearchResult[]} - An array of search results containing items that match the query and their respective parent.
 */
export const searchItems = (
  items: (SidebarItem | SidebarChildrenItem)[],
  query: string,
  parent: SidebarItem | null = null
): SearchResult[] => {
  const lowerQuery = query.toLowerCase();
  let results: SearchResult[] = [];

  items.forEach((item) => {
    if (item.label.toLowerCase().includes(lowerQuery)) {
      results.push({ item: item, parent: parent });
    }
    if ('children' in item && item.children) {
      const childResults = searchItems(
        item.children,
        query,
        item as SidebarItem
      );
      results = [...results, ...childResults];
    }
  });

  return results;
};

/**
 * Creates a debounced function that will delay the execution of the given callback until after a specified timeout.
 *
 * @param {Function} callback - The function to debounce.
 * @param {number} [timeout=300] - The time to delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
export const debounce = (callback: () => void, timeout: number = 300) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback();
      timer = null;
    }, timeout);
  };
};

/**
 * Smoothly scrolls to a specified vertical position within a `Scrollbars` component.
 *
 * @param {number} targetPosition - The vertical position to scroll to.
 * @param {number} duration - The duration of the scroll animation in milliseconds.
 * @param {RefObject<Scrollbars>} refElement - The reference to the `Scrollbars` component.
 */
export const smoothScrollTo = (
  targetPosition: number,
  duration: number,
  refElement: RefObject<Scrollbars>
) => {
  const startPosition = refElement?.current!.getScrollTop();
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;
  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime!;
    const progress = Math.min(timeElapsed / duration, 1);

    const easing = easeInOutQuad(progress);
    refElement.current!.scrollTop(startPosition + distance * easing);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };
  const easeInOutQuad = (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };
  requestAnimationFrame(animation);
};

/** Creates a markup object with sanitized HTML content.
 * @param {string} htmlContent - The HTML content to sanitize.
 * @param htmlContent
 */

export const createMarkup = (htmlContent: string) => {
  return { __html: DOMPurify.sanitize(htmlContent) };
};
