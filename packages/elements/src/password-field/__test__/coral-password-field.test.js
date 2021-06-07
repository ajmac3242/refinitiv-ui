import { elementUpdated, expect, fixture, isIE, oneEvent } from '@refinitiv-ui/test-helpers';
// import element and theme
import '@refinitiv-ui/elements/password-field';
import '@refinitiv-ui/elemental-theme/light/ef-password-field';
import { fireKeydownEvent } from './helper.js';

describe('PasswordField', () => {
  describe('Should have a correct DOM structure', () => {
    it('DOM structure is correct', async () => {
      const el = await fixture(`
        <ef-password-field
          error
          warning
          transparent
          value="abbr"
          pattern="[a-z]"
          placeholder="Placeholder"
          minlength="5"
          maxlength="10"
        ></ef-password-field>
      `);

      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Has correct DOM structure, when initialised with maxlength value', async () => {
      const el = await fixture('<ef-password-field maxlength="10"></ef-password-field>');

      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Has correct DOM structure, when set maxlength value using element.setAttribute(maxlength)', async () => {
      const el = await fixture('<ef-password-field maxlength="10"></ef-password-field>');

      el.setAttribute('maxlength', '5');
      await elementUpdated(el);

      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Has correct DOM structure, when remove maxlength', async () => {
      const el = await fixture('<ef-password-field maxlength="10"></ef-password-field>');

      el.removeAttribute('maxlength');
      await elementUpdated(el);

      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Has correct DOM structure, when initialised with minlength value', async () => {
      const el = await fixture('<ef-password-field minlength="10"></ef-password-field>');

      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Has correct DOM structure, when set minlength value using element.setAttribute(minlength)', async () => {
      const el = await fixture('<ef-password-field minlength="10"></ef-password-field>');

      el.setAttribute('minlength', '5');
      await elementUpdated(el);

      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Has correct DOM structure, when remove minlength', async () => {
      const el = await fixture('<ef-password-field minlength="10"></ef-password-field>');

      el.removeAttribute('minlength');
      await elementUpdated(el);

      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Has correct DOM structure, when initialised with read only state', async () => {
      const el = await fixture('<ef-password-field readonly></ef-password-field>');

      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Has correct DOM structure, when no read only state initially but added later', async () => {
      const el = await fixture('<ef-password-field></ef-password-field>');

      el.readonly = true;
      await elementUpdated(el);

      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Has correct DOM structure, when removed read only state', async () => {
      const el = await fixture('<ef-password-field readonly></ef-password-field>');

      el.removeAttribute('readonly');
      await elementUpdated(el);

      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Has correct DOM structure, when password revealed', async () => {
      const el = await fixture('<ef-password-field></ef-password-field>');
      const eyeIcon = el.shadowRoot.querySelector('[part=icon]');

      setTimeout(() => {
        eyeIcon.dispatchEvent(new CustomEvent('tap'));
      });

      const event = await oneEvent(eyeIcon, 'tap');

      expect(event).to.exist;
      expect(el).shadowDom.to.equalSnapshot();
    });

    it('Has correct DOM structure, when hides revealed password', async () => {
      const el = await fixture('<ef-password-field></ef-password-field>');
      const eyeIcon = el.shadowRoot.querySelector('[part=icon]');

      setTimeout(() => {
        eyeIcon.dispatchEvent(new CustomEvent('tap'));
      });
      const firstClick = await oneEvent(eyeIcon, 'tap');

      expect(firstClick).to.exist;

      setTimeout(() => {
        eyeIcon.dispatchEvent(new CustomEvent('tap'));
      });
      const secondClick = await oneEvent(eyeIcon, 'tap');

      expect(secondClick).to.exist;

      expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Should have a correct property', () => {
    it('Should have correct property pattern', async () => {
      const el = await fixture('<ef-password-field></ef-password-field>');

      expect(el.pattern).to.equal('');
      expect(el.hasAttribute('pattern')).to.equal(false, 'attribute "pattern" should not exist');
      expect(el.getAttribute('pattern')).to.equal(null, 'attribute "pattern" should equal null');

      el.setAttribute('pattern', 'Pattern');
      await elementUpdated(el);

      expect(el.pattern).to.equal('Pattern');
      expect(el.hasAttribute('pattern')).to.equal(true, 'attribute "pattern" should exist');
      expect(el.getAttribute('pattern')).to.equal('Pattern', 'attribute "pattern" should equal "Pattern"');

      el.pattern = '';
      await elementUpdated(el);
      expect(el.pattern).to.equal('');
      expect(el.hasAttribute('pattern')).to.equal(true, 'property "pattern" should exist');
      expect(el.getAttribute('pattern')).to.equal('Pattern', 'attribute "pattern" should equal "Pattern"');
    });

    it('Should have correct property placeholder', async () => {
      const el = await fixture('<ef-password-field placeholder="Placeholder"></ef-password-field>');

      expect(el.placeholder).to.equal('Placeholder');
      expect(el.hasAttribute('placeholder')).to.equal(true, 'attribute "placeholder" should be exists');
      expect(el.getAttribute('placeholder')).to.equal('Placeholder', 'attribute "placeholder" should equal "Placeholder');

      el.removeAttribute('placeholder');
      await elementUpdated(el);

      expect(el.placeholder).to.equal(null);
      expect(el.hasAttribute('placeholder')).to.equal(false, 'attribute "placeholder" should not be exists');
      expect(el.getAttribute('placeholder')).to.equal(null, 'attribute "placeholder" should equal null');

      el.placeholder = 'New placeholder';
      await elementUpdated(el);
      expect(el.placeholder).to.equal('New placeholder');
      expect(el.hasAttribute('placeholder')).to.equal(false, 'property "placeholder" should not reflected');
      expect(el.getAttribute('placeholder')).to.equal(null, 'property "placeholder" should not reflected');
    });

    it('Should have correct property error', async () => {
      const el = await fixture('<ef-password-field></ef-password-field>');

      expect(el.error).to.equal(false);
      expect(el.getAttribute('error')).to.equal(null, 'attribute "error" should equal null');
      expect(el.hasAttribute('error')).to.equal(false, 'attribute "error" should not be exists');

      el.setAttribute('error', '');
      await elementUpdated(el);

      expect(el.error).to.equal(true);
      expect(el.hasAttribute('error')).to.equal(true, 'attribute "error" should be exists');
      expect(el.getAttribute('error')).to.equal('', 'attribute "error" should equal ""');

      el.error = false;
      await elementUpdated(el);
      expect(el.error).to.equal(false);
      expect(el.getAttribute('error')).to.equal(null, 'property "error" should reflected');
      expect(el.hasAttribute('error')).to.equal(false, 'property "error" should reflected');

    });

    it('Should have correct property warning', async () => {
      const el = await fixture('<ef-password-field></ef-password-field>');

      expect(el.warning).to.equal(false);
      expect(el.getAttribute('warning')).to.equal(null, 'attribute "warning" should equal null');
      expect(el.hasAttribute('warning')).to.equal(false, 'attribute "warning" should not be exists');

      el.setAttribute('warning', '');
      await elementUpdated(el);

      expect(el.warning).to.equal(true);
      expect(el.hasAttribute('warning')).to.equal(true, 'attribute "warning" should be exists');
      expect(el.getAttribute('warning')).to.equal('', 'attribute "warning" should equal ""');

      el.warning = false;
      await elementUpdated(el);
      expect(el.warning).to.equal(false);
      expect(el.getAttribute('warning')).to.equal(null, 'property "warning" should reflected');
      expect(el.hasAttribute('warning')).to.equal(false, 'property "warning" should reflected');

    });

    it('Should have correct property value', async () => {
      const el = await fixture('<ef-password-field value="Value"></ef-password-field>');

      expect(el.value).to.equal('Value');
      expect(el.hasAttribute('value')).to.equal(true, 'attribute "value" should be exists');
      expect(el.getAttribute('value')).to.equal('Value', 'attribute "value" should equal "Value');

      el.removeAttribute('value');
      await elementUpdated(el);

      expect(el.value).to.equal('');
      expect(el.hasAttribute('value')).to.equal(false, 'attribute "value" should not be exists');
      expect(el.getAttribute('value')).to.equal(null, 'attribute "value" should equal null');

      el.value = 'New value';
      await elementUpdated(el);
      expect(el.value).to.equal('New value');
      expect(el.hasAttribute('value')).to.equal(false, 'property "value" should not reflected');
      expect(el.getAttribute('value')).to.equal(null, 'property "value" should not reflected');
    });

    it('Should have correct property maxlength', async () => {
      const el = await fixture('<ef-password-field maxlength="5"></ef-password-field>');

      expect(el.maxLength).to.equal(5);
      expect(el.hasAttribute('maxlength')).to.equal(true, 'attribute "maxlength" should exist');
      expect(el.getAttribute('maxlength')).to.equal('5', 'attribute "maxlength" should equal "5');

      el.removeAttribute('maxlength');
      await elementUpdated(el);

      expect(el.maxLength).to.equal(null);
      expect(el.hasAttribute('maxlength')).to.equal(false, 'attribute "maxlength" should not exist');
      expect(el.getAttribute('maxlength')).to.equal(null, 'attribute "maxlength" should equal null');

      el.maxLength = 10;
      await elementUpdated(el);
      expect(el.maxLength).to.equal(10);
      expect(el.hasAttribute('maxlength')).to.equal(true, 'property "maxlength" should be reflected');
      expect(el.getAttribute('maxlength')).to.equal('10', 'property "maxlength" should be reflected');
    });

    it('Should have correct property minlength', async () => {
      const el = await fixture('<ef-password-field minlength="5"></ef-password-field>');

      expect(el.minLength).to.equal(5);
      expect(el.hasAttribute('minlength')).to.equal(true, 'attribute "minlength" should exist');
      expect(el.getAttribute('minlength')).to.equal('5', 'attribute "minlength" should equal "5');

      el.removeAttribute('minlength');
      await elementUpdated(el);

      expect(el.minLength).to.equal(null);
      expect(el.hasAttribute('minlength')).to.equal(false, 'attribute "minlength" should not exist');
      expect(el.getAttribute('minlength')).to.equal(null, 'attribute "minlength" should equal null');

      el.minLength = 10;
      await elementUpdated(el);
      expect(el.minLength).to.equal(10);
      expect(el.hasAttribute('minlength')).to.equal(true, 'property "minlength" should be reflected');
      expect(el.getAttribute('minlength')).to.equal('10', 'property "minlength" should be reflected');
    });
  });

  describe('Functional Tests', () => {
    it('Error-changed from true to false for pattern', async () => {
      const el = await fixture('<ef-password-field pattern="[a-z]" value="1"></ef-password-field>');

      expect(el.error).to.equal(true);
      setTimeout(() => {
        el.value = 'a';
      });

      const { detail } = await oneEvent(el, 'error-changed');

      expect(detail.value).to.equal(false);
      expect(el.error).to.equal(false);
    });

    it('Error-changed from false to true for pattern', async () => {
      const el = await fixture('<ef-password-field></ef-password-field>');

      el.value = '1';
      await elementUpdated(el);
      expect(el.error).to.equal(false);

      setTimeout(() => {
        el.pattern = '[a-z]';
      });

      const { detail } = await oneEvent(el, 'error-changed');

      expect(el.error).to.equal(true);
      expect(detail.value).to.equal(true);
    });

    it('set error state when input value does not match pattern expression', async () => {
      const el = await fixture('<ef-password-field pattern="[a-z]"></ef-password-field>');

      el.value = '12345';

      await elementUpdated(el);

      el.validateInput();
      expect(el.error).to.equal(true);
    });

    it('remove error state when input value does match pattern expression', async () => {
      const el = await fixture('<ef-password-field></ef-password-field>');

      el.setAttribute('pattern', '[a-z]{4}');
      el.setAttribute('error', 'true');
      el.value = 'test';
      await elementUpdated(el);
      el.validateInput();
      expect(el.error).to.equal(false);
    });

    it('test select method for enabled element', async () => {
      try {
        const el = await fixture('<ef-password-field value="abbr"></ef-password-field>');
        const input = el.shadowRoot.querySelector('[part=input]');

        el.select();
        await elementUpdated(el);

        expect(input.selectionStart).to.not.equal(input.selectionEnd);
        expect(input.selectionStart).to.lessThan(input.selectionEnd);
        expect(input.selectionEnd - input.selectionStart).to.equal(el.value.length);
      }
      catch (e) {
        // eslint-disable-next-line no-console
        console.log('select method problem with error: ' + e.message);
      }
    });

    xit('test select method for disabled element', async () => {
      try {
        const el = await fixture('<ef-password-field disabled value="abbr"></ef-password-field>');
        const input = el.shadowRoot.querySelector('[part=input]');

        el.select();
        await elementUpdated(el);

        expect(input.selectionStart).to.equal(input.selectionEnd);
      }
      catch (e) {
        // eslint-disable-next-line no-console
        console.log('select method problem with error: ' + e.message);
      }
    });

    it('test focus method for enabled element', async function () {
      if (isIE()) {
        this.skip();
      }

      const el = await fixture('<ef-password-field></ef-password-field>');
      const input = el.shadowRoot.querySelector('[part=input]');

      el.focus();
      await elementUpdated(el);

      expect(el.shadowRoot.activeElement).to.equal(input);
    });

    xit('test focus method for disabled element', async () => {
      try {
        const el = await fixture('<ef-password-field disabled></ef-password-field>');
        const input = el.shadowRoot.querySelector('[part=input]');

        el.focus();
        await elementUpdated(el);

        expect(document.activeElement).to.not.equal(el);
        expect(el.shadowRoot.activeElement).to.not.equal(input);
      }
      catch (e) {
        // eslint-disable-next-line no-console
        console.log('select method problem with error: ' + e.message);
      }
    });

    it('should change value', async () => {
      const el = await fixture('<ef-password-field value="abbr"></ef-password-field>');
      const input = el.shadowRoot.querySelector('[part=input]');

      el.value = 'valg';
      await elementUpdated(el);

      expect(input.value).to.equal('valg');
    });

    it('should change value and fire value-changed', async () => {
      const el = await fixture('<ef-password-field value="abbr"></ef-password-field>');
      const input = el.shadowRoot.querySelector('[part=input]');

      input.value = 'test';
      await elementUpdated(el);

      setTimeout(() => {
        input.dispatchEvent(new Event('input', {
          bubbles: true,
          cancelable: true
        }));
      });

      const { detail } = await oneEvent(el, 'value-changed');

      expect(detail.value).to.equal('test');
    });

    it('press `enter` and `space` on icon', async () => {
      const el = await fixture('<ef-password-field></ef-password-field>');
      const icon = el.shadowRoot.querySelector('[part=icon]');

      fireKeydownEvent(icon, 'Enter');
      await elementUpdated(icon);
      expect(icon.getAttribute('icon')).to.equal('eye-off', 'icon should be changed with `enter` keydown');

      fireKeydownEvent(icon, ' ');
      await elementUpdated(icon);
      expect(icon.getAttribute('icon')).to.equal('eye', 'icon should be changed with ` ` keydown');

      fireKeydownEvent(icon, 'Spacebar');
      await elementUpdated(icon);
      expect(icon.getAttribute('icon')).to.equal('eye-off', 'icon should be changed with `spacebar` keydown');
    });

    it('press `tab` on icon should not change icon', async () => {
      const el = await fixture('<ef-password-field></ef-password-field>');
      const icon = el.shadowRoot.querySelector('[part=icon]');

      fireKeydownEvent(icon, 'Tab');
      await elementUpdated(icon);

      expect(icon.getAttribute('icon')).to.equal('eye', 'icon should not be changed with `tab` keydown');
    });


  });
});
