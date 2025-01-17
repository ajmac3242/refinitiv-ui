import '@refinitiv-ui/elements/select';

import '@refinitiv-ui/elemental-theme/light/ef-select';
import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

import { getData, getMenuEl, getOptions, openedUpdated, snapshotIgnore } from './utils.js';

describe('select/Value', function () {
  describe('Selection by Value Attribute', function () {
    it('Options Selected: Afghanistan', async function () {
      const el = await fixture(`<ef-select opened placeholder="Placeholder">${getOptions()}</ef-select>`);
      el.value = 'AF';
      await openedUpdated(el);
      expect(el.value).to.equal('AF', 'Value getter does not get correct value');
      expect(el.querySelector('ef-item[selected]').value).to.equal('AF', 'Item is not selected from value');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.value = 'UNKNOWN';
      await elementUpdated(el);
      expect(el.value).to.equal('', 'Unknown value should reset');
      expect(el.querySelector('ef-item[selected]')).to.equal(null, 'Selected item is not reset');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.value = 'AL';
      await elementUpdated(el);
      expect(el.value).to.equal('AL', 'Value is not reflected from selected attribute');
      expect(el.querySelector('ef-item[selected]').value).to.equal('AL', 'Item is not selected from value');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.value = 'AL';
      await elementUpdated(el);
      expect(el.value).to.equal('AL', 'Same value should do nothing');
      el.value = '';
      await elementUpdated(el);
      expect(el.value).to.equal('', 'Value is not reflected from selected attribute');
      expect(el.querySelector('ef-item[selected]')).to.equal(null, 'Selected item is not reset');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });

    it('Data Selected: Afghanistan', async function () {
      const el = await fixture('<ef-select opened placeholder="Placeholder"></ef-select>');
      el.value = 'AF';
      el.data = getData();
      await openedUpdated(el);
      expect(el.value).to.equal('AF', 'Value getter does not get correct value');
      expect(getMenuEl(el).querySelector('ef-item[selected]').value).to.equal(
        'AF',
        'Item is not selected from value'
      );
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.value = 'AL';
      await elementUpdated(el);
      expect(el.value).to.equal('AL', 'Value is not reflected from selected attribute');
      expect(getMenuEl(el).querySelector('ef-item[selected]').value).to.equal(
        'AL',
        'Item is not selected from value'
      );
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
      el.value = '';
      await elementUpdated(el);
      expect(el.value).to.equal('', 'Value is not reflected from selected attribute');
      expect(getMenuEl(el).querySelector('ef-item[selected]')).to.equal(null, 'Selected item is not reset');
      expect(el).shadowDom.to.equalSnapshot(snapshotIgnore);
    });
  });
});
