# dw-icon-button


## Why don't we use `mwc-icon-button`?
- We created `dw-icon` to have extended icon set, sepecific to the app. But, those icons we can't be used with 
`mwc-icon-button`. 
- We found issue with `mwc-icon-button` that it can't be resized easily.


## Usage
```html
<dw-icon-button icon="" disabled></dw-icon-button>
```

### Customize size
- Integrater/User should write `width` & `height` css for `dw-icon-button`.

> We don't support icon in light-dom (`slot`) as supported by [`mwc-icon-button`]

## Properties
- `icon`
- `disabled`
- `active`
- `iconSize`, No default value. So, default size of `dw-icon` is used (which is 24px.)
- `buttonSize`, No default value. So, default icon container size is it's parent height and width. If buttonSize is exists then icon container size base on `buttonSize` property.

## Custom CSS Properties

```
--dw-icon-color-active
--dw-icon-color
--dw-icon-color-disabled
```

