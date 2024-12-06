import { RefObject } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { OptionType, SearchResult } from '@src/types/global.ts';
import { AnchorParameters } from '@src/types/modals.ts';
import {
  MenuLinkChildrenContent,
  MenuLinkParentContent
} from '@src/types/sideMenu.ts';
import DOMPurify from 'dompurify';

/**
 * Searches items recursively to match the query and collects the matching items with their parent.
 *
 * @param {Array<MenuLinkParentContent | MenuLinkChildrenContent>} items - The items to search through.
 * @param {string} query - The search query.
 * @param {MenuLinkParentContent | null} [parent=null] - The parent item, if any, for nested items.
 * @returns {SearchResult[]} - An array of search results containing items that match the query and their respective parent.
 */
export const searchItems = (
  items: (MenuLinkParentContent | MenuLinkChildrenContent)[],
  query: string,
  parent: MenuLinkParentContent | null = null
): SearchResult[] => {
  const lowerQuery = query.toLowerCase();
  let results: SearchResult[] = [];

  items.forEach((item) => {
    const title = item.attributes.title.toLowerCase();

    if (title.includes(lowerQuery)) {
      results.push({ item, parent });
    }

    if (item.attributes.submenu && item.attributes.submenu.length > 0) {
      const childResults = searchItems(
        item.attributes.submenu,
        query,
        item as MenuLinkParentContent
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

/**
 * Maps an array of anchor parameters to an array of options suitable for dropdowns or selection components.
 *
 * @param {Array<AnchorParameters>} anchorList - The list of anchor objects containing `text` and `anchor_id`.
 * @returns {Array<OptionType>} - The list of options, each with a `label` (derived from `text`) and `value` (derived from `anchor_id`).
 */
export const mapAnchorListToOptions = (
  anchorList: AnchorParameters[]
): OptionType[] => {
  if (!Array.isArray(anchorList)) {
    return [];
  }
  return anchorList.map((anchor) => ({
    label: anchor.text,
    value: `scroll-item-${anchor.anchor_id}`
  }));
};
