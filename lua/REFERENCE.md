# UuidGeneratorApi2 Lua SDK Reference

Complete API reference for the UuidGeneratorApi2 Lua SDK.


## UuidGeneratorApi2SDK

### Constructor

```lua
local sdk = require("uuid-generator-api2_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Guid(data)`

Create a new `Guid` entity instance. Pass `nil` for no initial data.

#### `V1n(data)`

Create a new `V1n` entity instance. Pass `nil` for no initial data.

#### `V1n2(data)`

Create a new `V1n2` entity instance. Pass `nil` for no initial data.

#### `V3n(data)`

Create a new `V3n` entity instance. Pass `nil` for no initial data.

#### `V3n2(data)`

Create a new `V3n2` entity instance. Pass `nil` for no initial data.

#### `V4n(data)`

Create a new `V4n` entity instance. Pass `nil` for no initial data.

#### `V4n2(data)`

Create a new `V4n2` entity instance. Pass `nil` for no initial data.

#### `V5n(data)`

Create a new `V5n` entity instance. Pass `nil` for no initial data.

#### `V5n2(data)`

Create a new `V5n2` entity instance. Pass `nil` for no initial data.

#### `V6n(data)`

Create a new `V6n` entity instance. Pass `nil` for no initial data.

#### `V6n2(data)`

Create a new `V6n2` entity instance. Pass `nil` for no initial data.

#### `V7n(data)`

Create a new `V7n` entity instance. Pass `nil` for no initial data.

#### `V7n2(data)`

Create a new `V7n2` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## GuidEntity

```lua
local guid = client:guid(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:guid():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:guid():load({ id = "guid_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GuidEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V1nEntity

```lua
local v1n = client:v1n(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:v1n():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V1nEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V1n2Entity

```lua
local v1n2 = client:v1n2(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:v1n2():load({ id = "v1n2_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V1n2Entity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V3nEntity

```lua
local v3n = client:v3n(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:v3n():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V3nEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V3n2Entity

```lua
local v3n2 = client:v3n2(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:v3n2():load({ id = "v3n2_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V3n2Entity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V4nEntity

```lua
local v4n = client:v4n(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:v4n():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V4nEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V4n2Entity

```lua
local v4n2 = client:v4n2(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:v4n2():load({ id = "v4n2_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V4n2Entity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V5nEntity

```lua
local v5n = client:v5n(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:v5n():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V5nEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V5n2Entity

```lua
local v5n2 = client:v5n2(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:v5n2():load({ id = "v5n2_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V5n2Entity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V6nEntity

```lua
local v6n = client:v6n(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:v6n():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V6nEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V6n2Entity

```lua
local v6n2 = client:v6n2(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:v6n2():load({ id = "v6n2_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V6n2Entity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V7nEntity

```lua
local v7n = client:v7n(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:v7n():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V7nEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## V7n2Entity

```lua
local v7n2 = client:v7n2(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:v7n2():load({ id = "v7n2_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V7n2Entity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

