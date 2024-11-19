import {
  SearchResult,
  SidebarChildrenItem,
  SidebarItem
} from '@src/types/global.ts';

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
