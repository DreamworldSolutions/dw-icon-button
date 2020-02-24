/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { css, LitElement, html } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

//These are the dw element needed by this elemenet
import '@dreamworld/dw-icon/dw-icon.js';
import '@dreamworld/dw-ripple/dw-ripple.js';
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

        button:focus dw-icon {
          --dw-icon-color: var(--dw-icon-color-active, rgba(0, 0, 0, 0.87));
        }

        :host(:not([disabled]):not([touch-device])) button:hover  {
          background-color: rgba(0, 0, 0, 0.04);
        }

        :host([disabled]) button {
          cursor: default;
        }

        :host[test] {
          background-color: red;
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
       * `true` if icon needs to be show as active
       */
      active: { type: Boolean },

      /**
       *  No default value. So, default icon container size is it's parent height and width. If buttonSize is exists then icon container size base on `buttonSize` property.
       */
      buttonSize: { type: Number },

      /**
       * When it is `true` don't apply hover effect.
       */
      _touchDevice: {type: Boolean, reflect: true, attribute: 'touch-device'}
    }
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
          ?disabled="${this.disabled}"
          ?active="${this.active}">
        </dw-icon>
        <dw-ripple unbounded ?disabled="${this.disabled}"></dw-ripple>
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

  _onClick() {
    /**
    * call blur method to fix ripple effect after icon click.
    */
    setTimeout(() => {
      this.shadowRoot.querySelector('button').blur();
    }, 350);
  }

  constructor() {
    super();
    this.disabled = false;
    this.active = false;
    this._touchDevice = isTouchDevice();
  }
}

window.customElements.define('dw-icon-button', DwIconButton);
