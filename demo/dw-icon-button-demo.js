import { LitElement, css, html, svg } from '@dreamworld/pwa-helpers/lit.js';

//These are the dw element needed by this elemenet
import { DwIcon } from '@dreamworld/dw-icon/dw-icon.js';
import '../dw-icon-button.js';

// These are the dw styles element needed by this element.
import { ThemeStyle } from '@dreamworld/material-styles/theme.js';

//These are the mwc element needed by this elemenet
import '@material/mwc-switch';
import '@material/mwc-formfield';

DwIcon.addIcons(
  { 
    'wellness_community': svg `<svg height="24" viewBox="0 0 24 24" width="24">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>`,
    'star_32': svg`<svg height="32px" viewBox="0 0 32 32" width="32px">
    <path d="M30,10h-9.031L18,1.672C17.641,0.422,16.813,0,16,0s-1.641,0.422-2,1.672L11.031,10H2c-1.141,0-2,0.938-2,2  c0,0.859,0.438,1.359,1.19,2l6.623,5l-3.208,9C4.234,28.922,4,29.484,4,30c0,0.984,0.766,2,2,2c0.719,0,1.016-0.25,2-0.895l8-6.021  l8,6.021C24.984,31.75,25.281,32,26,32c1.234,0,2-1.016,2-2c0-0.516-0.234-1.078-0.605-2l-3.208-9l6.623-5  c0.753-0.641,1.19-1.141,1.19-2C32,10.938,31.141,10,30,10z M19.433,17.577l2.477,6.948L16,20.077l-5.909,4.448l2.477-6.948  L7.829,14h6.022L16,7.974L18.148,14h6.022L19.433,17.577z"/></svg>
      </svg>`
  }
)

export class DwIconButtoDemo extends LitElement {
  static get styles() {
    return [
      ThemeStyle,
      css`
        :host {
          display: block;
          color: var(--mdc-theme-text-primary-on-background);
          background-color: var(--mdc-theme-background);
        }
        section.main {
          padding: 24px;
        }
        section div {
          margin: 0px 20px;
        }
        mwc-formfield {
          --mdc-theme-text-primary-on-background: var(--mdc-theme-text-primary);
        }
        .horizontal{
          flex-direction: row;
        }
        .vertical{
          flex-direction: column;
        }
        .center{
          align-items: center;
        }
        .layout{
          display: flex;
        }
      `
    ];
  }

  render(){
    return html `
      <section class="main">
        <mwc-formfield label="Enable Dark Theme">
          <mwc-switch @click="${(e) => {
            if (e.target.selected) { 
              this.setAttribute('dark-theme', e.detail);
              return;
            }
            this.removeAttribute('dark-theme');
            }}">
          </mwc-switch>
        </mwc-formfield>
          
        <h3> Material Icons </h3>
        <section class="layout horizontal">
          <div class="layout vertical center">
            <h4>Default</h4>
            <dw-icon-button icon="perm_media"></dw-icon-button>
          </div>
          <div class="layout vertical center">
            <h4>Primary</h4>
            <dw-icon-button icon="perm_media" primary></dw-icon-button>
          </div>
          <div class="layout vertical center">
            <h4>Secondary</h4>
            <dw-icon-button icon="perm_media" secondary></dw-icon-button>
          </div>
          <div class="layout vertical center">
            <h4>Disabled</h4>
            <dw-icon-button icon="perm_media" disabled></dw-icon-button>
          </div>
          <div class="layout vertical center">
            <h4>size : 48</h4>
            <dw-icon-button icon="perm_media" iconSize="48"></dw-icon-button>
          </div>
          <div class="layout vertical center">
            <h4>Icon Button with Tooltip</h4>
            <dw-icon-button icon="more_vert" .title=${'Click here for more info'} iconSize="48" .placement=${'bottom'}></dw-icon-button>
          </div>
          <div class="layout vertical center">
            <h4>Symbol</h4>
            <dw-icon-button icon="signal_wifi_statusbar_not_connected" iconFont="OUTLINED" symbol iconSize="48"></dw-icon-button>
          </div>
          <div class="layout vertical center">
            <h4>Icon Button with Tooltip when icon is disable</h4>
            <dw-icon-button icon="more_vert" .disabledTitle="${'icon is disabled'}" disabled iconSize="48" .placement=${'bottom'}></dw-icon-button>
          </div>
        </section>
        <h3> Custom SVG Icons </h3>
        <section class="layout horizontal"> 
          <div class="layout vertical center">
            <h4>community</h4>
            <dw-icon-button icon="wellness_community" id="customIcon"></dw-icon-button>
          </div>
          <div class="layout vertical center">
            <h4>star(32)</h4>
            <dw-icon-button icon="star" id="sizeIcon" iconSize="32"></dw-icon-button>
          </div>
        </section>
      </section>
    `
  }
}

window.customElements.define('dw-icon-button-demo', DwIconButtoDemo);
