import escapeStringRegexp from 'escape-string-regexp';

import type { DataItem } from '@refinitiv-ui/utils/collection.js';

import type { ItemData, ItemText } from '../../item';
import type { ComboBox } from '../index';
import type { ComboBoxFilter } from './types';

/**
 * Default filter used by combo box
 * @param el ComboBox instance to filter
 * @returns Filter accepting an item
 */
export const createDefaultFilter = <T extends DataItem = ItemData>(el: ComboBox<T>): ComboBoxFilter<T> => {
  // reference query string for validating queryRegExp cache state
  let query = '';
  // cache RegExp
  let queryRegExp: RegExp | undefined;

  // Get current RegExp, or renew if out of date
  // this is fetched on demand by filter/renderer
  // only created once per query
  const getRegularExpressionOfQuery = (): RegExp => {
    if (el.query !== query || !queryRegExp) {
      query = el.query || '';
      queryRegExp = new RegExp(escapeStringRegexp(query), 'i');
    }
    return queryRegExp;
  };

  // return scoped custom filter
  return (item): boolean => {
    const regex = getRegularExpressionOfQuery();
    const result = regex.test((item as unknown as ItemText).label);
    return result;
  };
};
