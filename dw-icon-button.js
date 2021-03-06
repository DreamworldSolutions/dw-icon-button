/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { css, html } from 'lit-element';
import { LitElement } from '@dreamworld/pwa-helpers/lit-element.js';
import { styleMap } from 'lit-html/directives/style-map';

//These are the dw element needed by this elemenet
import '@dreamworld/dw-icon/dw-icon.js';
import { isTouchDevice } from '@dreamworld/web-util/isTouchDevice';
import { buttonFocus } from '@dreamworld/pwa-helpers';

// These are the dw styles element needed by this element.
import { flexLayout } from '@dreamworld/flex-layout/flex-layout.js';
import { alignment } from '@dreamworld/flex-layout/flex-layout-alignment.js';

export class DwIconButton extends buttonFocus(LitElement) {
  static get styles() {
    return [
      flexLayout,
      alignment,
      css`
        :host {
          display: block;
          outline: none;
        }
        
        :host([hidden]) {
          display: none; 
        }

        :host([disabled]){
          pointer-events: none;
        } 

        :host([primary]) {
          --dw-icon-color: var(--mdc-theme-primary);
          --dw-icon-color-active: var(--mdc-theme-primary);
        }

        :host([secondary]) {
          --dw-icon-color: var(--mdc-theme-secondary);
          --dw-icon-color-active: var(--mdc-theme-secondary);
        }

        button:focus dw-icon {
          --dw-icon-color: var(--dw-icon-color-active, rgba(0, 0, 0, 0.87));
        }

        :host([disabled]) button {
          cursor: default;
        }

        button {
          position: relative;
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          padding: var(--dw-icon-button-padding, 12px);
          margin: 0px;
          overflow: hidden;
          border-radius: 50%;
        }

        button::before  {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--mdc-theme-on-surface);
          transition: opacity 150ms;
          opacity: 0;
          pointer-events: none;
        }

        :host(:not([disabled]):not([touch-device])) button:hover::before {
          opacity: 0.04;
        }

        button:focus::before {
          opacity: 0.12;
        }

        :host(:not([disabled]):not([touch-device])) button:focus:hover::before {
          opacity: 0.16;
        }

        button::after {
          content: '';
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: var(--mdc-theme-on-surface);
          pointer-events: none;
          opacity: 0;
          border-radius: 50%;
        }

        @keyframes scale-in-ripple {
          from {
            animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);
            transform: scale(0.6);}
          to {transform: scale(1);}
        }

        @keyframes fade-in-ripple {
          from {opacity: 0;}
          to {opacity: 0.12;}
        }

        @keyframes fade-out-ripple {
          from {opacity: 0.12;}
          to {opacity: 0;}
        }

        :host([disabled]) button::before, :host([disabled]) button::after {
          background-color: transparent;
        }


        :host([primary]) button::before, :host([primary]) button::after {
          background-color: var(--mdc-theme-primary);
        }
        :host([secondary]) button::before, :host([secondary]) button::after {
          background-color: var(--mdc-theme-secondary);
        }

        :host(.ripple-entry) button::after {
          animation: scale-in-ripple 225ms forwards, fade-in-ripple 75ms forwards;
        }

        :host(.ripple-exit) button::after {
          transform: scale(1);
          animation: fade-out-ripple 250ms forwards;
        }
      `
    ];
  }

  static get properties() {
    return {
      /**
       * name of icon
       */
      icon: { type: String },

      /**
       * `true` if icon needs to be show as a disabled
       */
      disabled: { type: Boolean, reflect: true },

      /**
       * size of icon. default size is 24.
       */
      iconSize: { type: Number },

      /**
       *  No default value. So, default icon container size is it's parent height and width. If buttonSize is exists then icon container size base on `buttonSize` property.
       */
      buttonSize: { type: Number },

      /**
       * Set to `true` when icon is to be shown in primary color.
       */
      primary: { type: Boolean, reflect: true },

      /**
       * Set to `true` when icon is to be shown in secondary color.
       */
      secondary: { type: Boolean, reflect: true },

      /**
       * When it is `true` don't apply hover effect.
       */
      _touchDevice: {type: Boolean, reflect: true, attribute: 'touch-device'}
    }
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    /**
     * It's data-type is Promise. Default value is the Promise which is resolved immediately.
     * Later on, it's value will be changed when entry animation is started (__onStart).
     * And when entry animation is completed, that promise gets resolved.
     */
    this.waitForEntryAnimation = new Promise( (resolve) => {resolve()});
    this.__bindActiveEvents();
    this.__bindInactiveEvents();
  }

  disconnectedCallback() {
    this.__unbindActiveEvents();
    this.__unbindInactiveEvents();
    super.disconnectedCallback && super.disconnectedCallback();
  }

  render() {
    return html`
      <button style=${this._buttonStyle()} 
        tabindex="${this.disabled ? -1 : ''}" 
        @touchstart="${this._onClick}" 
        @mousedown="${this._onClick}" 
        class="center-center layout vertical">
        <dw-icon 
          .name="${this.icon}" 
          .size=${this.iconSize} 
          ?disabled="${this.disabled}"></dw-icon>
        </dw-icon>
      </button>
    `
  }

  /**
   * When `buttonSize` is defined then return button `width`, `height` and `padding`.
   * @returns {*} Button style based on `buttonSize` and `iconSize` property.
   * @protected
   */
  _buttonStyle() {
    if(!this.buttonSize) {
      return '';
    }
    
    let padding = (this.buttonSize - (this.iconSize || 24)) / 2;
    return styleMap({ width: this.buttonSize + 'px', height: this.buttonSize + 'px', padding: padding + 'px'});
  }

  constructor() {
    super();
    this.disabled = false;
    this._touchDevice = isTouchDevice();
  }

  async _onClick() {
    await this.waitForEntryAnimation;
    /**
    * call blur method to fix ripple effect after icon click.
    */
    setTimeout(() => {
      this.shadowRoot.querySelector('button').blur();
    }, 0);
  }
  
  /**
   * Bind active ripple events.
   * @private
   */
  __bindActiveEvents() {
    this.addEventListener('mousedown', this.__onStart, {passive: true});
    this.addEventListener('touchstart', this.__onStart, {passive: true});
  }

  /**
   * unbind active ripple events.
   * @private
   */
  __unbindActiveEvents() {
    this.removeEventListener('mousedown', this.__onStart, {passive: true});
    this.removeEventListener('touchstart', this.__onStart, {passive: true});
  }

  /**
   * Bind remove/in-active ripple events.
   * @private
   */
  __bindInactiveEvents() {
    this.addEventListener('mouseup', this.__fadeOut, {passive: true});
    this.addEventListener('touchend', this.__fadeOut, {passive: true});
  }

  /**
   * unbind remove/in-active ripple events.
   * @private
   */
  __unbindInactiveEvents() {
    this.removeEventListener('mouseup', this.__fadeOut, {passive: true});
    this.removeEventListener('mouseleave', this.__fadeOut, {passive: true});
    this.removeEventListener('touchend', this.__fadeOut , {passive: true});
  }

  /**
   * Invoked on ripple active events.
   * Active a ripple animation.
   * @private
   */
  __onStart() {
    let resolve;
    let promise = new Promise((res) => { resolve = res });
    this.waitForEntryAnimation = promise;
    window.requestAnimationFrame(() => {
      this.classList.add('ripple-entry');
      window.setTimeout(() => {
        resolve();
      }, 225);
    });
  }

  /**
   * Fade out a current active ripple.
   * Waits till the scale animation is completed, and then performs the fadeout animation
   * @private
   */
  async __fadeOut() {
    await this.waitForEntryAnimation;
    window.requestAnimationFrame(() => {
      this.classList.add('ripple-exit');
      window.setTimeout(()=> {
        this.classList.remove('ripple-entry');
        this.classList.remove('ripple-exit');
      }, 250);
    });
  }
}

window.customElements.define('dw-icon-button', DwIconButton);
