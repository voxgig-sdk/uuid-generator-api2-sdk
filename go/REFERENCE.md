# UuidGeneratorApi2 Golang SDK Reference

Complete API reference for the UuidGeneratorApi2 Golang SDK.


## UuidGeneratorApi2SDK

### Constructor

```go
func NewUuidGeneratorApi2SDK(options map[string]any) *UuidGeneratorApi2SDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *UuidGeneratorApi2SDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *UuidGeneratorApi2SDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Guid(data map[string]any) UuidGeneratorApi2Entity`

Create a new `Guid` entity instance. Pass `nil` for no initial data.

#### `V1n(data map[string]any) UuidGeneratorApi2Entity`

Create a new `V1n` entity instance. Pass `nil` for no initial data.

#### `V3n(data map[string]any) UuidGeneratorApi2Entity`

Create a new `V3n` entity instance. Pass `nil` for no initial data.

#### `V4n(data map[string]any) UuidGeneratorApi2Entity`

Create a new `V4n` entity instance. Pass `nil` for no initial data.

#### `V5n(data map[string]any) UuidGeneratorApi2Entity`

Create a new `V5n` entity instance. Pass `nil` for no initial data.

#### `V6n(data map[string]any) UuidGeneratorApi2Entity`

Create a new `V6n` entity instance. Pass `nil` for no initial data.

#### `V7n(data map[string]any) UuidGeneratorApi2Entity`

Create a new `V7n` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## GuidEntity

```go
guid := client.Guid(nil)
fmt.Println(guid.GetName()) // "guid"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `[]any` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Guid(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Guid(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GuidEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V1nEntity

```go
v1n := client.V1n(nil)
fmt.Println(v1n.GetName()) // "v1n"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `[]any` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.V1n(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V1n(nil).Load(map[string]any{"count": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V1nEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V3nEntity

```go
v3n := client.V3n(nil)
fmt.Println(v3n.GetName()) // "v3n"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `[]any` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.V3n(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V3n(nil).Load(map[string]any{"count": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V3nEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V4nEntity

```go
v4n := client.V4n(nil)
fmt.Println(v4n.GetName()) // "v4n"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `[]any` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.V4n(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V4n(nil).Load(map[string]any{"count": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V4nEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V5nEntity

```go
v5n := client.V5n(nil)
fmt.Println(v5n.GetName()) // "v5n"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `[]any` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.V5n(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V5n(nil).Load(map[string]any{"count": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V5nEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V6nEntity

```go
v6n := client.V6n(nil)
fmt.Println(v6n.GetName()) // "v6n"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `[]any` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.V6n(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V6n(nil).Load(map[string]any{"count": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V6nEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## V7nEntity

```go
v7n := client.V7n(nil)
fmt.Println(v7n.GetName()) // "v7n"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `[]any` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.V7n(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.V7n(nil).Load(map[string]any{"count": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `V7nEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewUuidGeneratorApi2SDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

