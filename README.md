# dw-icon-button

A LitElement-based Web Component that renders a circular icon button with Material Design ripple effects, hover/focus state overlays, tooltip support, and extended icon set via `dw-icon`.

**Why not `mwc-icon-button`?**
- Custom icon sets registered with `dw-icon` cannot be used with `mwc-icon-button`.
- `mwc-icon-button` cannot be resized easily.

---

## 1. User Guide

### Installation & Setup

```bash
yarn add @dreamworld/dw-icon-button
```

```js
import '@dreamworld/dw-icon-button/dw-icon-button.js';
```

The component renders icons using icon font classes. Include the relevant font stylesheets in your HTML:

```html
<!-- Material Icons (filled) -->
<link href="https://fonts.googleapis.com/css?family=Material+Icons&display=block" rel="stylesheet" />

<!-- Material Icons Outlined (for iconFont="OUTLINED") -->
<link href="https://fonts.googleapis.com/css?family=Material+Icons+Outlined&display=block" rel="stylesheet" />

<!-- Material Symbols Outlined (for symbol attribute) -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
```

---

### Basic Usage

```html
<!-- Default icon button -->
<dw-icon-button icon="perm_media"></dw-icon-button>

<!-- Disabled -->
<dw-icon-button icon="perm_media" disabled></dw-icon-button>

<!-- Primary color -->
<dw-icon-button icon="perm_media" primary></dw-icon-button>

<!-- Secondary color -->
<dw-icon-button icon="perm_media" secondary></dw-icon-button>
```

---

### API Reference

#### Properties

| Property | Attribute | Type | Default | Reflected | Description |
|---|---|---|---|---|---|
| `icon` | `icon` | `String` | — | No | Name of the icon to render via `dw-icon` |
| `disabled` | `disabled` | `Boolean` | `false` | Yes | Disables the button. Sets `tabindex="-1"` and stops click event propagation |
| `iconSize` | `icon-size` | `Number` | `undefined` | No | Icon size in pixels. When unset, `dw-icon` uses its own default (24px) |
| `buttonSize` | `button-size` | `Number` | `undefined` | No | Explicit button width/height in pixels. Padding is computed as `(buttonSize - iconSize) / 2`. When unset, the button fills its parent |
| `primary` | `primary` | `Boolean` | `false` | Yes | Renders the icon and ripple using `--mdc-theme-primary` |
| `secondary` | `secondary` | `Boolean` | `false` | Yes | Renders the icon and ripple using `--mdc-theme-secondary` |
| `title` | `title` | `String` | — | No | Tooltip text. Shown on `mouseenter` when the button is **not** disabled and **not** on a touch device |
| `disabledTitle` | `disabled-title` | `String` | — | No | Tooltip text. Shown on `mouseenter` only when `disabled` is `true` |
| `tipExtraOptions` | — | `Object` | `{}` | No | Additional options object merged into `dw-tooltip`'s `extraOptions` for the `title` tooltip |
| `iconFont` | `icon-font` | `String` | — | Yes | Icon font variant. Accepted values: `FILLED`, `OUTLINED` |
| `symbol` | `symbol` | `Boolean` | `false` | Yes | When `true`, renders using the Material Symbols font instead of Material Icons |
| `placement` | `placement` | `String` | `'top'` | No | Tooltip position relative to the button. Accepts: `top`, `bottom`, `left`, `right`, with optional `-start` or `-end` suffix (e.g. `top-start`, `left-end`) |

> **Tooltip note:** `title` and `disabledTitle` are independent. Set both to show a tooltip in both enabled and disabled states.

#### Methods

| Method | Signature | Description |
|---|---|---|
| `focus` | `focus(): void` | Programmatically focuses the internal `<button>` element |

#### Events

No custom events are dispatched by this component. Standard DOM events (`click`, `mousedown`, `mouseup`, etc.) propagate from the host element normally, **except** when `disabled` is `true` — in that case, `click` events on the internal wrapper are stopped via `stopImmediatePropagation`.

#### Slots

Not supported. The component renders `dw-icon` internally within shadow DOM. Light DOM (`slot`) content is not accepted.

---

### CSS Custom Properties

| Property | Default | Description |
|---|---|---|
| `--dw-icon-color` | (from `dw-icon`) | Icon color in the default state |
| `--dw-icon-color-active` | `rgba(0, 0, 0, 0.87)` | Icon color when the button is focused |
| `--dw-icon-color-disabled` | (from `dw-icon`) | Icon color when `disabled` is `true` |
| `--dw-icon-button-background` | `transparent` | Background color of the button element |
| `--dw-icon-button-padding` | `12px` | Button padding. Automatically overridden when `buttonSize` is set |
| `--mdc-theme-primary` | — | Applied to icon color and ripple when `primary` attribute is set |
| `--mdc-theme-secondary` | — | Applied to icon color and ripple when `secondary` attribute is set |
| `--mdc-theme-on-surface` | — | Color used for hover/focus state overlays and ripple |

```css
/* Example: custom-colored icon button */
dw-icon-button {
  --dw-icon-color: #6200ee;
  --dw-icon-color-active: #3700b3;
  --dw-icon-button-background: #f5f5f5;
}
```

---

### Sizing

To size the button container using CSS (without the `buttonSize` property), set `width` and `height` directly on the element:

```css
dw-icon-button {
  width: 48px;
  height: 48px;
}
```

To use `buttonSize` for self-contained sizing with automatic padding:

```html
<!-- 48px button with 24px icon → padding = (48 - 24) / 2 = 12px -->
<dw-icon-button icon="more_vert" buttonSize="48" iconSize="24"></dw-icon-button>
```

---

### Advanced Usage

#### Tooltip on enabled button

```html
<dw-icon-button
  icon="more_vert"
  .title=${"More options"}
  .placement=${"bottom"}
></dw-icon-button>
```

#### Tooltip on disabled button

```html
<dw-icon-button
  icon="more_vert"
  disabled
  .disabledTitle=${"This action is unavailable"}
  .placement=${"bottom"}
></dw-icon-button>
```

#### Tooltip in both states

```html
<dw-icon-button
  icon="more_vert"
  .title=${"More options"}
  .disabledTitle=${"This action is unavailable"}
  .placement=${"top"}
></dw-icon-button>
```

#### Custom tooltip delay via `tipExtraOptions`

```html
<dw-icon-button
  icon="info"
  .title=${"Help"}
  .tipExtraOptions=${{ delay: [200, 0] }}
></dw-icon-button>
```

#### Material Symbols (outlined)

```html
<dw-icon-button
  icon="signal_wifi_statusbar_not_connected"
  iconFont="OUTLINED"
  symbol
  iconSize="48"
></dw-icon-button>
```

#### Custom SVG icons (registered via `DwIcon.addIcons`)

```js
import { DwIcon } from '@dreamworld/dw-icon/dw-icon.js';
import { svg } from 'lit';

DwIcon.addIcons({
  my_custom_icon: svg`<svg viewBox="0 0 24 24">...</svg>`,
});
```

```html
<dw-icon-button icon="my_custom_icon"></dw-icon-button>
```

#### Programmatic focus

```js
const btn = document.querySelector('dw-icon-button');
btn.focus();
```

---

## 2. Developer Guide / Architecture

### Architecture Overview

| Concern | Implementation |
|---|---|
| Base class | `DwIconButton extends buttonFocus(LitElement)` |
| Composition pattern | Mixin (`buttonFocus` from `@dreamworld/pwa-helpers`) layered over `LitElement` |
| DOM model | Shadow DOM only; no light DOM slots |
| Icon rendering | Delegates to `<dw-icon>` inside shadow DOM |
| Tooltip rendering | Conditionally renders `<dw-tooltip>` in shadow DOM; two independent instances managed for `title` and `disabledTitle` |

### Ripple State Machine

The ripple effect is driven entirely by CSS class toggling:

1. **Entry** (`mousedown` / `touchstart`): `requestAnimationFrame` adds `ripple-entry` class → CSS applies `scale-in-ripple` (225ms) and `fade-in-ripple` (75ms) keyframe animations on `::after`.
2. A `Promise` (`waitForEntryAnimation`) resolves after 225ms, ensuring exit does not begin before entry completes.
3. **Exit** (`mouseup` / `mouseleave` / `touchend`): Awaits `waitForEntryAnimation`, then adds `ripple-exit` → CSS applies `fade-out-ripple` (250ms). After 250ms, both classes are removed.

### Touch Device Handling

`isTouchDevice()` (from `@dreamworld/web-util`) is called:
- In the **constructor** to set `_touchDevice` property (reflected as `touch-device` attribute).
- In **`render()`** to suppress the `title` tooltip on touch devices.

The `touch-device` attribute disables hover overlays via the CSS rule:
```css
:host(:not([disabled]):not([touch-device])) button:hover::before { opacity: 0.04; }
```

### Focus Effect Suppression

To distinguish keyboard focus from pointer/touch focus:
- `pointerdown` sets `_noFocusEffect = true` → adds `no-focus-effect` attribute.
- `blur` resets `_noFocusEffect = false` → removes the attribute.

The attribute disables the focus overlay:
```css
:host([no-focus-effect]) button:focus::before { opacity: 0; }
```

This ensures the focus ring only appears for keyboard navigation, not after mouse or touch interaction.

### Disabled Click Interception

When `disabled` is `true`, the internal `_onTooltipContainerClick` handler on the wrapper `<div>` calls `e.stopImmediatePropagation()`. This prevents click events from reaching parent elements even though the underlying `<button>` has `tabindex="-1"` (not `disabled` attribute), which is necessary to allow the `disabledTitle` tooltip to still receive pointer events.

### Module Entry Point

The package exports a single ES module:

```
main: "dw-icon-button.js"
type: "module"
```

The custom element `dw-icon-button` is registered via `customElements.define` at the end of `dw-icon-button.js`.
