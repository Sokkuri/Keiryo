# SearchSelectComponent
## Usage
```vue
<template>
    <SearchSelectComponent
        :name="'example'"
        :executeSearch="(searchTerm: string) => {}"
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
| `Multiple` | bool | false |
| `MinLength` | number | 3 |
| `ExecuteSearch` | (searchTerm: string) => Promise<[BaseSelectListItem](https://github.com/Sokkuri/Keiryo/blob/master/src/models/BaseSelectListItem.ts)[]> | **required** |
| `Elements` | [SelectListItem](https://github.com/Sokkuri/Keiryo/blob/master/src/models/SelectListItem.ts)[] | *undefined* |

### Events
| Name | Description |
| --- | --- |
| `input`/`selection` | Triggers when an element is selected |
