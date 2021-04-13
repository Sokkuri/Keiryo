# SelectComponent
## Usage
```vue
<template>
    <SelectComponent
        :name="'example'"
        :elements="example[]"
    />
</template>
```

## API
### Props
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `Name` | string | **required** | Needs to be unique |
| `Label` | string | *undefined* |
| `Rules` | string | *undefined* |
| `Elements` | [SelectListItem](https://github.com/Sokkuri/Keiryo/blob/master/src/models/SelectListItem.ts)[] | **required** |
| `SearchEnabled` | bool | true |
| `Multiple` | bool | false |
| `Placeholder` | bool | true |

### Events
| Name | Description |
| --- | --- |
| `input`/`selection` | Triggers when an element is selected |
| `created` | Triggers when the component is mounted and returns the Choices instance |
