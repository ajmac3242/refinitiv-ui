# `collapse/Collapse`

## `Should Have Correct DOM`

####   `Label and DOM structure is correct`

```html
<ef-header
  level="3"
  part="header"
  role="heading"
>
  <div
    aria-controls="content"
    aria-expanded="false"
    id="header-label"
    part="header-label"
    role="button"
    tabindex="0"
  >
  </div>
  <ef-icon
    aria-hidden="true"
    icon="right"
    part="toggle"
    slot="left"
  >
  </ef-icon>
  <slot
    name="header-left"
    slot="left"
  >
  </slot>
  <slot
    name="header-right"
    slot="right"
  >
  </slot>
</ef-header>
<div
  aria-labelledby="header-label"
  id="content"
  part="content"
  role="region"
>
  <ef-panel
    part="content-data"
    transparent=""
  >
    <slot>
    </slot>
  </ef-panel>
</div>

```

####   `Label and DOM structure is correct with spacing`

```html
<ef-header
  level="3"
  part="header"
  role="heading"
>
  <div
    aria-controls="content"
    aria-expanded="false"
    id="header-label"
    part="header-label"
    role="button"
    tabindex="0"
  >
  </div>
  <ef-icon
    aria-hidden="true"
    icon="right"
    part="toggle"
    slot="left"
  >
  </ef-icon>
  <slot
    name="header-left"
    slot="left"
  >
  </slot>
  <slot
    name="header-right"
    slot="right"
  >
  </slot>
</ef-header>
<div
  aria-labelledby="header-label"
  id="content"
  part="content"
  role="region"
>
  <ef-panel
    part="content-data"
    transparent=""
  >
    <slot>
    </slot>
  </ef-panel>
</div>

```

####   `Label and DOM structure is correct with header`

```html
<ef-header
  level="3"
  part="header"
  role="heading"
>
  <div
    aria-controls="content"
    aria-expanded="false"
    id="header-label"
    part="header-label"
    role="button"
    tabindex="0"
  >
    Header
  </div>
  <ef-icon
    aria-hidden="true"
    icon="right"
    part="toggle"
    slot="left"
  >
  </ef-icon>
  <slot
    name="header-left"
    slot="left"
  >
  </slot>
  <slot
    name="header-right"
    slot="right"
  >
  </slot>
</ef-header>
<div
  aria-labelledby="header-label"
  id="content"
  part="content"
  role="region"
>
  <ef-panel
    part="content-data"
    transparent=""
  >
    <slot>
    </slot>
  </ef-panel>
</div>

```

####   `Label and DOM structure is correct with level`

```html
<ef-header
  level="1"
  part="header"
  role="heading"
>
  <div
    aria-controls="content"
    aria-expanded="false"
    id="header-label"
    part="header-label"
    role="button"
    tabindex="0"
  >
  </div>
  <ef-icon
    aria-hidden="true"
    icon="right"
    part="toggle"
    slot="left"
  >
  </ef-icon>
  <slot
    name="header-left"
    slot="left"
  >
  </slot>
  <slot
    name="header-right"
    slot="right"
  >
  </slot>
</ef-header>
<div
  aria-labelledby="header-label"
  id="content"
  part="content"
  role="region"
>
  <ef-panel
    part="content-data"
    transparent=""
  >
    <slot>
    </slot>
  </ef-panel>
</div>

```

####   `Label and DOM structure is correct without level`

```html
<ef-header
  level=""
  part="header"
  role="heading"
>
  <div
    aria-controls="content"
    aria-expanded="false"
    id="header-label"
    part="header-label"
    role="button"
    tabindex="0"
  >
  </div>
  <ef-icon
    aria-hidden="true"
    icon="right"
    part="toggle"
    slot="left"
  >
  </ef-icon>
  <slot
    name="header-left"
    slot="left"
  >
  </slot>
  <slot
    name="header-right"
    slot="right"
  >
  </slot>
</ef-header>
<div
  aria-labelledby="header-label"
  id="content"
  part="content"
  role="region"
>
  <ef-panel
    part="content-data"
    transparent=""
  >
    <slot>
    </slot>
  </ef-panel>
</div>

```

