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

//These are the dw element needed by this elemenet
import '@dreamworld/dw-icon/dw-icon.js';
import '@dreamworld/dw-ripple/dw-ripple.js';

// These are the dw styles element needed by this element.
import { flexLayout } from '@dreamworld/flex-layout/flex-layout.js';
import { alignment } from '@dreamworld/flex-layout/flex-layout-alignment.js';

export class DwIconButton extends LitElement {
  static get styles() {
    return [
      flexLayout,
      alignment,
      css`
        :host {
          display: block;
        }
        div.button-container {
          width: 100%;
          height: 100%;
        }
        dw-icon {
          padding: var(--dw-icon-button-padding, 12px);
        }
        button:focus dw-icon {
          --dw-icon-color: var(--dw-icon-color-active, rgba(0, 0, 0, 0.87));
        }
        button {
          background: transparent;
          border: none;
          border-radius: 50%;
          padding: 0px;
          outline: none;
          cursor: pointer;
          overflow: hidden;
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
      disabled: { type: Boolean },

      /**
       * size of icon. default size is 24.
       */
      iconSize: { type: Number },

      /**
       * `true` if icon needs to be show as active
       */
      active: { type: Boolean }
    }
  }

  render(){
    return html`
    <button tabindex="${this.disabled ? -1 : ''}" @click="${this._onClick}">
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

  _onClick() {
    this.shadowRoot.querySelector('button').blur();
  }

  constructor(){
    super();
    this.disabled = false;
    this.active = false;
  }
}

window.customElements.define('dw-icon-button', DwIconButton);
