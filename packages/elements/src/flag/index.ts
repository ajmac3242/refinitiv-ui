import {
  BasicElement,
  CSSResultGroup,
  DeprecationNotice,
  PropertyValues,
  TemplateResult,
  css,
  svg
} from '@refinitiv-ui/core';
import { customElement } from '@refinitiv-ui/core/decorators/custom-element.js';
import { property } from '@refinitiv-ui/core/decorators/property.js';
import { unsafeHTML } from '@refinitiv-ui/core/directives/unsafe-html.js';

import { VERSION } from '../version.js';
import { FlagLoader } from './utils/FlagLoader.js';

export { preload } from './utils/FlagLoader.js';

const EmptyTemplate = svg``;

@customElement('ef-flag')
export class Flag extends BasicElement {
  /**
   * Element version number
   * @returns version number
   */
  static override get version(): string {
    return VERSION;
  }

  /**
   * A `CSSResultGroup` that will be used
   * to style the host, slotted children
   * and the internal template of the element.
   * @returns CSS template
   */
  static override get styles(): CSSResultGroup {
    return css`
      :host {
        display: inline-block;
        box-sizing: border-box;
        width: 1.33em;
        height: 1em;
      }
      svg {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
      }
    `;
  }

  private _flag: string | null = null;

  /**
   * Name of a known flag to render.
   * @example gb
   * @default null
   */
  @property({ type: String, reflect: true })
  public get flag(): string | null {
    return this._flag;
  }
  public set flag(value: string | null) {
    const oldValue = this._flag;
    if (oldValue !== value) {
      this._flag = value;
      void this.setFlagSrc();
      this.requestUpdate('flag', oldValue);
    }
  }

  /**
   * Deprecation notice displays a warning message
   * when deprecated features are used.
   */
  private deprecationNotice = new DeprecationNotice(
    '`src` attribute and property are deprecated. Use `flag` for attribute and property instead.'
  );

  private _src: string | null = null;
  /**
   * Src location of an svg flag.
   * @example https://cdn.io/flags/gb.svg
   * @ignore
   * @default null
   */
  @property({ type: String })
  public get src(): string | null {
    return this._src;
  }
  /**
   * @param value - location of an svg flag.
   * @ignore
   * @default null
   */
  public set src(value: string | null) {
    if (this.src !== value) {
      this._src = value;
      this.clearFlag();
      if (value) {
        void this.loadAndRenderFlag(value);
      }
    }

    if (value && !this.flag) {
      this.deprecationNotice.once();
    }
  }

  private _template: TemplateResult = EmptyTemplate;

  /**
   * The flag template to render
   */
  private get template(): TemplateResult {
    return this._template;
  }
  private set template(value: TemplateResult) {
    if (this._template !== value) {
      this._template = value;
      this.requestUpdate();
    }
  }

  /**
   * Called after the component is first rendered
   * @param changedProperties Properties which have changed
   * @returns {void}
   */
  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    /**
     * We have to call this here because
     * polyfilled browsers only get variables at this point.
     */
    this.setPrefix();
  }

  /**
   * Helper method, used to set the flag src.
   * @returns {void}
   */
  private async setFlagSrc(): Promise<void> {
    this.src = this.flag ? await FlagLoader.getSrc(this.flag) : null;
  }

  /**
   * Tries to load an flag from the url provided
   * and the renders this into the flag template.
   * @param src Source location of the svg flag.
   * @returns {void}
   */
  private async loadAndRenderFlag(src: string): Promise<void> {
    const svgBody = await FlagLoader.loadSVG(src);
    if (svgBody) {
      this.template = svg`${unsafeHTML(svgBody)}`;
    }
  }

  /**
   * Get and cache CDN prefix
   * This is a private URL which is set in the theme
   * and should not be configured again via the variable.
   * @returns {void}
   */
  private setPrefix(): void {
    if (!FlagLoader.isPrefixSet) {
      const CDNPrefix = this.getComputedVariable('--cdn-prefix').replace(/^('|")|('|")$/g, '');

      FlagLoader.setCdnPrefix(CDNPrefix);
    }
  }

  /**
   * Clears SVG body from the flag template
   * @returns {void}
   */
  private clearFlag(): void {
    this.template = EmptyTemplate;
  }

  /**
   * A `TemplateResult` that will be used
   * to render the updated internal template.
   * @return {TemplateResult} Render template
   */
  protected override render(): TemplateResult {
    return this.template;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ef-flag': Flag;
  }
}
