# dw-icon-button

## Why don't we use `mwc-icon-button`?
- We created `dw-icon` to have extended icon set, sepecific to the app. But, those icons we can't be used with 
`mwc-icon-button`. 
- We found issue with `mwc-icon-button` that it can't be resized easily.


## Usage
```html
<dw-icon-button name="" disabled></dw-icon-button>
```

### Customize size
- Integrater/User should write `width` & `height` css for `dw-icon-button`.

> We don't support icon in light-dom (`slot`) as supported by [`mwc-icon-button`]

## Properties
- `icon`
- `disabled`
- `iconSize`, No default value. So, default size of `dw-icon` is used (which is 24px.)


## CSS Propertiessdfsd