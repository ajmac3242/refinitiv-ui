<!--
type: page
title: Select
location: ./elements/select
layout: default
-->

# Select

::
```javascript
::import-elements::
```
```css
section {
  height: 250px;
}
ef-select {
  width: 200px;
  margin-left: 4px;
}
```
```html
<section>
  <label for="desserts">Desserts </label>
  <ef-select id="desserts" opened>
    <ef-item role="presentation" type="header">Drinks</ef-item>
    <ef-item role="option" value="cola">Cola</ef-item>
    <ef-item role="option" value="apple-juice" disabled>Apple Juice</ef-item>
    <ef-item role="option" value="iced-tea">Iced Tea</ef-item>
    <ef-item role="presentation" type="header">Ice Cream</ef-item>
    <ef-item role="option" value="vanilla-ice-cream">Vanilla Ice Cream</ef-item>
    <ef-item role="option" value="chocolate-ice-cream">Chocolate Ice Cream</ef-item>
    <ef-item role="option" value="honey-ice-cream">Honey &amp; Walnut Ice Cream</ef-item>
    <ef-item role="option" value="raspberry-ice-cream" selected>Raspberry Ice Cream</ef-item>
  </ef-select>
</section>
```
::

## Usage

`ef-select` expands upon the native `select` element, providing a fully themeable dropdown element. There are 2 ways to create options for `ef-select`.

### Using `ef-item`

::
```javascript
::import-elements::
```
```css
section {
  height: 155px;
}
ef-select {
  width: 160px;
  margin-left: 4px;
}
```
```html
<section>
  <label for="fruits">Favourite fruit </label>
  <ef-select id="fruits">
    <ef-item role="option" value="apple">Apple</ef-item>
    <ef-item role="option" value="papaya">Papaya</ef-item>
    <ef-item role="option" value="banana">Banana</ef-item>
    <ef-item role="option" value="orange">Orange</ef-item>
  </ef-select>
</section>
```
::

```html
<label for="fruits">Favourite fruit: </label>
<ef-select id="fruits">
  <ef-item role="option" value="apple">Apple</ef-item>
  <ef-item role="option" value="papaya">Papaya</ef-item>
  <ef-item role="option" value="banana">Banana</ef-item>
  <ef-item role="option" value="orange">Orange</ef-item>
</ef-select>
```

### Using data property
You can use `data` property to populate item in Select.

```javascript
const select = document.querySelector('ef-select');
const data = [
  {
    label: 'Drinks',
    type: 'header'
  },
  {
    label: 'Tea',
    value: 'tea'
  },
  {
    label: 'Beer',
    value: 'beer',
    selected: true
  },
  {
    label: 'Ice Cream',
    type: 'header'
  },
  {
    label: 'Vanilla',
    value: 'vanilla',
    disabled: true
  },
  {
    label: 'Strawberry',
    value: 'Strawberry'
  }
];

select.data = data;
```

The data of Select is an array of `ItemData`.

```typescript
interface ItemData {
  /**
   * The text for the label indicating the meaning of the item.
   */
  label: string;
  /**
   * Value of the item
   */
  value: string;
  /**
   * The`subLabel` property represents the text beneath the label.
   * Not applicable if item is header or divider.
   */
  subLabel?: string;
  /**
   * Type of item. Value can be `text` (default), `header`, `divider`
   */
  type?: ItemType;
  /**
   * Sets the selection state of the item.
   */
  selected?: boolean;
  /**
   * Sets the item to be disabled.
   * Prevents the item from users interaction.
   */
  disabled?: boolean;
  /**
   * Set the icon name from the ef-icon list
   */
  icon?: string;
  /**
   * Set the tooltip text
   */
  tooltip?: string;
  /**
   * Whether to show or hide
   * the item from the renderer.
   */
  hidden?: boolean;
}
```


## Categorize into groups

Groups are also defined using `ef-item`. The only difference is that we add a `type="header"` attribute onto the element.

::
```javascript
::import-elements::
```
```css
section {
  height: 275px;
}
ef-select {
  margin-left: 4px;
}
```
```html
<section>
  <label for="countries">Country of residence</label>
  <ef-select id="countries">
    <ef-item role="presentation" type="header">Asia</ef-item>
    <ef-item role="option" value="japan">Japan</ef-item>
    <ef-item role="option" value="singapore">Singapore</ef-item>
    <ef-item role="option" value="thailand" selected>Thailand</ef-item>
    <ef-item role="presentation" type="header">Europe</ef-item>
    <ef-item role="option" value="london">London</ef-item>
    <ef-item role="option" value="italy">Italy</ef-item>
    <ef-item role="presentation" type="header">America</ef-item>
    <ef-item role="option" value="usa">USA</ef-item>
  </ef-select>
</section>
```
::

``` html
<ef-select>
  <ef-item role="presentation" type="header">Asia</ef-item>
  ...
  <ef-item role="presentation" type="header">Europe</ef-item>
  ...
</ef-select>
```

## Selecting a default option

You may wish to set an initial selected value. This can be achieved by adding a `selected` attribute to the option you would like to have selected by default.

Only one option can be selected at a time.

::
```javascript
::import-elements::
```
```css
section {
  height: 130px;
}
ef-select {
  margin-left: 4px;
}
```
```html
<section>
  <label for="color">Color</label>
  <ef-select id="color">
    <ef-item role="option" value="black">Black</ef-item>
    <ef-item role="option" value="blue">Blue</ef-item>
    <ef-item role="option" value="green" selected>Green</ef-item>
  </ef-select>
</section>
```
::

```html
...
  <ef-item role="option" value="green" selected>Green</ef-item>
...
```

## Disabling an option

Options can be disabled by adding a `disabled` attribute to the options you wish to disable.

::
```javascript
::import-elements::
```
```css
section {
  height: 170px;
}
ef-select {
  margin-left: 4px;
}
```
```html
<section>
  <label for="size">Size</label>
  <ef-select id="size" placeholder="Choose your size">
    <ef-item role="option" value="xs">XS</ef-item>
    <ef-item role="option" value="s">S</ef-item>
    <ef-item role="option" value="m" disabled>M (Out of stock)</ef-item>
    <ef-item role="option" value="l">L</ef-item>
    <ef-item role="option" value="xl">XL</ef-item>
    <ef-item role="option" value="xxl">2XL</ef-item>
  </ef-select>
</section>
```
::

```html
...
  <ef-item role="option" value="m" disabled>M (Out of stock)</ef-item>
...
```

## Restricting list height

The `max-height` of the list can be restricted using the `--list-max-height` property.

::
```javascript
::import-elements::
```
```css
section {
  height: 130px;
}
ef-select {
  margin-left: 4px;
  --list-max-height: 100px;
}
```
```html
<section>
  <label for="refreshment">Refreshment </label>
  <ef-select id="refreshment" placeholder="Choose your refreshment...">
    <ef-item role="presentation" type="header">Drinks</ef-item>
    <ef-item role="option" value="4" disabled>Apple Juice</ef-item>
    <ef-item role="option" value="5" disabled>Iced Tea</ef-item>
    <ef-item role="option" value="6" disabled>Water</ef-item>
    <ef-item role="presentation" type="header">Ice Cream</ef-item>
    <ef-item role="option" value="7">Vanilla</ef-item>
    <ef-item role="option" value="8">Chocolate</ef-item>
  </ef-select>
</section>
```
::

```css
ef-select {
  --list-max-height: 100px;
}
```

## CSS Variables

The max height and width can be overridden by CSS Variables.

```css
ef-select {
  --list-max-height: 100px;
  --list-max-width: 70px;
}
```

| CSS Variables Name | Description                          |
| ------------------ | ------------------------------------ |
| --list-max-height  | Maximum height of the drop-down list |
| --list-max-width   | Maximum width of the drop-down list  |

## Accessibility
::a11y-intro::

`ef-select` is assigned `role="combobox"` and also attribute `aria-expanded`. Select options are assigned `role="option"` and `aria-selected` which depends on item's selection state. You must ensure that the element has associated label by using `aria-label`, `aria-labelledby` or `label[for="<element.id>"]`.

* `ef-select` manages the role and aria attributes automatically if you create `ef-select` using `data` property
* If you create select declaratively by using `ef-item`, assign `role="option"` to selectable `ef-item` and `role="presentation"` to `ef-item` with `type="header"` and `type="divider"`.

```html
<label for="currency">Currency: </label>
<ef-select id="currency">
  <ef-item value="GBP" role="option" selected>GBP (£)</ef-item>
  <ef-item value="EUR" role="option">EUR (€)</ef-item>
  <ef-item value="USD" role="option">USD ($)</ef-item>
</ef-select>
```
* If you have header items, assign `role="presentation"` on the items

```html
<label for="refreshment">Refreshment: </label>
<ef-select id="refreshment">
  <ef-item role="presentation" type="header">Drinks</ef-item>
  ...
  <ef-item role="presentation" type="header">Ice Cream</ef-item>
  ...
</ef-select>
```

::a11y-end::
