import { elementUpdated, expect, fixture, isIE, nextFrame } from '@refinitiv-ui/test-helpers';

import '../lib/test/test-translate.js';

describe('Elf Translate Navigator Test', function () {
  it('If lang is not define navigator language should be applied', async function () {
    // make sure lang is not set from previous tests
    document.documentElement.removeAttribute('lang');

    let el;

    // IE does not support forcing of navigator language
    if (isIE()) {
      el = await fixture('<test-translate></test-translate>');
    } else {
      // Force navigator language
      Object.defineProperty(navigator, 'language', { value: 'ru' });
      el = await fixture('<test-translate></test-translate>');
      expect(el.defaultEl.innerText).to.equal(
        'Региональные настройки: ru',
        'Navigator locale is not taken into account'
      );
    }

    document.documentElement.lang = 'en-US';
    await nextFrame();

    expect(el.defaultEl.innerText).to.equal(
      'This is en-US locale',
      'Document locale should take priority over navigator'
    );

    el.lang = 'en-GB';
    await elementUpdated(el);
    await nextFrame(); // need for IE11
    expect(el.defaultEl.innerText).to.equal(
      'This is en locale',
      'Element locale should take priority over document locale'
    );
  });
});
