// Component docs https://elf.int.refinitiv.com/elements/tree-select.html
import { Phrasebook } from '../../';
import './shared';
import comboboxTranslations from './combo-box';

const translations = {
  ...comboboxTranslations,

  // used as a toggle control
  FULL_LIST: '完整列表',
  SELECTED: '已選項列表',
  EXPAND_COLLAPSE: '{expansion, select, false {全部展開} true {全部收起}}',
  SELECT_CONTROL: '{selected, select, false {全選} true {取消全選}}',
  // button control
  DONE: '完成',
  // selection/filter feedback
  SELECTED_NUM: '{numSelected, plural, =0 {} =1 {已選 1 項。} other {已選 # 項。}}',
  MATCHES_NUM: '{numMatched, plural, =0 {無匹配結果。} =1 {匹配到 1 條結果。} other {匹配到 # 條結果。}}'
};

Phrasebook.define('zh-Hant', 'ef-tree-select', translations);

export default translations;
