<!--
type: page
title: Text Field
location: ./elements/text-field
layout: default
-->

# Text Field

::

```javascript
::import-elements::
```

```css
ef-panel {
  max-width: 450px;
}
ef-text-field {
  width: 250px;
}
p {
  margin-bottom: 4px;
}
```

```html
<ef-panel spacing>
  <label for="first-name">First Name</label>
  <ef-text-field
    id="first-name"
    placeholder="Must be letters and at least 5 characters"
    pattern="[a-zA-Z]{5,}">
  </ef-text-field>
  <br/>
  <br/>
  <label for="last-name">Last Name</label>
  <ef-text-field
    id="last-name"
    placeholder="Must be letters and at least 5 characters"
    pattern="[a-zA-Z]{5,}">
  </ef-text-field>
</ef-panel>
```

::

`ef-text-field` is a form element for text.

## Usage

Text field is used to accept text input from users and has similar behaviors to the native text input.

```html
<label for="full-name">Full Name</label>
<ef-text-field
  id="full-name"
  placeholder="Your name as shown on your passport">
</ef-text-field>
```

## Getting value

The field's value can be accessed using the `value` property.

```html
<label for="full-name">Full Name</label>
<ef-text-field
  id="full-name"
  value="Sarah Connor">
</ef-text-field>
```

```javascript
const textInput = document.getElementById("full-name");
console.log(textInput.value); // "Sarah Connor"
```

You can also listen for the `value-changed` event. This event triggers when user interactions change the value.

```html
<label for="full-name">full Name</label>
<ef-text-field
  id="full-name"
  placeholder="Your name as shown on your passport">
</ef-text-field>
```

```javascript
const element = document.getElementById("full-name");

element.addEventListener("value-changed", (e) => {
  console.log(e.detail.value);
});
```

## Input validation

Validation occurs when constraints are provided and the value changes. If the error state changes, it will dispatch an `error-changed` event along with current error state.

Alternatively, you can check the `error` property to confirm if the input is valid or not.

See the [Input Length](/elements/text-field#input-length) example below for more detail.

## Input length

The `maxlength` attribute limits the number of characters that users can type into the input, and the `minlength` attribute sets the minimum number of characters required. `ef-text-field` will show error styles if a condition is not met.

::

```javascript
::import-elements::
const element = document.getElementById("username");
const errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.textContent = "Value length must be between 5-8 characters";
  } else {
    errorChangedText.textContent = "";
  }
});
```

```css
#error-text {
  color:#d94255;
}
ef-text-field {
  width: 200px;
}
```

```html
<label for="username">Username</label>
<ef-text-field
  id="username"
  aria-describedby="error-text"
  minlength="5"
  maxlength="8"
  placeholder="Between 5 to 8 characters">
</ef-text-field>
<p id="error-text"></p>
```

::

```html
<label for="username">Username</label>
<ef-text-field
  id="username"
  aria-describedby="error-text"
  minlength="5"
  maxlength="8"
  placeholder="Between 5 to 8 characters">
</ef-text-field>
<p id="error-text"></p>
```

```javascript
const element = document.getElementById("username");
const errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.textContent = "Value length must be between 5-8 characters";
  } else {
    errorChangedText.textContent = "";
  }
});
```

## Validate input using pattern

You can use a regular expression to validate the input value by setting it with the `pattern` attribute.

::

```javascript
::import-elements::
const element = document.getElementById("nickname");
const errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.textContent = "Nickname must be lowercase letters between 4-8 characters.";
  }
  else {
    errorChangedText.textContent = "";
  }
});
```

```css
#error-text {
  color:#d94255;
}
ef-text-field {
  width: 300px;
}
label {
  display: block;
}
```

```html
<label for="nickname">Nickname</label>
<ef-text-field
  id="nickname"
  aria-describedby="error-text"
  pattern="[a-z]{4,8}"
  placeholder="Must be lowercase letters between 4-8 characters">
</ef-text-field>
<p id="error-text"></p>
```

::

```html
<label for="nickname">Nickname:</label>
<ef-text-field
  id="nickname"
  aria-describedby="error-text"
  pattern="[a-z]{4,8}"
  placeholder="Must be lowercase letters between 4-8 characters">
</ef-text-field>
<p id="error-text"></p>
```

```javascript
const element = document.getElementById("nickname");
const errorChangedText = document.getElementById("error-text");
element.addEventListener("error-changed", (e) => {
  if (e.detail.value) {
    errorChangedText.textContent = "Nickname must be lowercase letters between 4-8 characters.";
  }
  else {
    errorChangedText.textContent = "";
  }
});
```

## Show icon

An inline icon can be set to display inside the input using the `icon` attribute.

::

```javascript
::import-elements::
```

```css
ef-text-field {
  width: 200px;
}
```

```html
<label for="feedback">Feedback</label>
<ef-text-field
  id="feedback"
  icon="email"
  placeholder="We appreciate your feedback!">
</ef-text-field>
```

::

```html
<label for="feedback">Feedback</label>
<ef-text-field
  id="feedback"
  icon="email">
</ef-text-field>
```

The icon can become actionable by adding the `icon-has-action` attribute to the element, so that `ef-text-field` will fire the `icon-click` event when users click on the icon. You can add an event listener to this event to execute your code.

::

```javascript
::import-elements::
const urlInput = document.getElementById("urlInput");
const label = document.getElementById("actionResult");
urlInput.addEventListener("icon-click", (e) => {
  navigator.clipboard.writeText(urlInput.value)
  label.textContent = 'URL copied'
});
```

```css
ef-text-field {
  width: 250px;
}
```

```html
<label for="urlInput">URL</label>
<ef-text-field
  id="urlInput"
  value="https://ui.refinitiv.com/"
  placeholder="Type URL to be copied"
  icon="copy"
  icon-has-action>
</ef-text-field>
<p id="actionResult"></p>
```

::

```html
<label for="urlInput">URL</label>
<ef-text-field
  id="urlInput"
  value="https://ui.refinitiv.com/"
  placeholder="Type URL to be copied"
  icon="copy"
  icon-has-action>
</ef-text-field>
<p id="actionResult"></p>
```

```javascript
const urlInput = document.getElementById("urlInput");
const label = document.getElementById("actionResult");
urlInput.addEventListener("icon-click", (e) => {
  navigator.clipboard.writeText(urlInput.value)
  label.textContent = 'URL copied'
});
```

## Accessibility

::a11y-intro::

`ef-text-field` is assigned `role="textbox"`. States such as `disabled` or `readonly` are programmatically updated to match the element’s visual state.

`ef-text-field` has already managed the role and states but you must ensure that the element has associated label by using `label[for="<element.id>"]`, `aria-label` or `aria-labelledby`.

`placeholder` should be used for supporting information only.

If there is an element displaying error of `ef-text-field`, `aria-describedby` should be added to the text field.

```html
<label for="name">Full Name</label>
<ef-text-field
  id="name"
  placeholder="Your name as shown on your passport">
</ef-text-field>
```

```html
<ef-text-field
  aria-label="Full name"
  placeholder="Your name as shown on your passport">
</ef-text-field>
```

```html
<label id="name">Full Name</label>
<ef-text-field
  aria-labelledby="name"
  placeholder="Your name as shown on your passport">
</ef-text-field>
```

```html
<label for="name">Full Name</label>
<ef-text-field
  id="name"
  aria-describedby="error-text"
  pattern="[a-zA-Z]{3,}"
  placeholder="Your name as shown on your passport">
</ef-text-field>
<p id="error-text">Must be letters at least 3 characters</p>
```

::a11y-end::
