# InputComponent
## Usage
```vue
<template>
    <InputComponent
        :name="'example'"
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
| `Type` | string | text |
| `Maxlength` | number | 255 |
| `Placeholder` | string | - |
| `Value` | string | - |

### Events
| Name | Description |
| --- | --- |
| `input` | Triggers when the value changes |

### Methods
| Name | Description | Parameter | Return |
| --- | --- | --- | --- |
| `Focus` | Sets focus internally | - | - |
