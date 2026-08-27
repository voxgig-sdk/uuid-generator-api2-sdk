# UuidGeneratorApi2 Ruby SDK Reference

Complete API reference for the UuidGeneratorApi2 Ruby SDK.


## UuidGeneratorApi2SDK

### Constructor

```ruby
require_relative 'UuidGeneratorApi2_sdk'

client = UuidGeneratorApi2SDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `UuidGeneratorApi2SDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = UuidGeneratorApi2SDK.test
```


### Instance Methods

#### `Guid(data = nil)`

Create a new `Guid` entity instance. Pass `nil` for no initial data.

#### `V1n(data = nil)`

Create a new `V1n` entity instance. Pass `nil` for no initial data.

#### `V3n(data = nil)`

Create a new `V3n` entity instance. Pass `nil` for no initial data.

#### `V4n(data = nil)`

Create a new `V4n` entity instance. Pass `nil` for no initial data.

#### `V5n(data = nil)`

Create a new `V5n` entity instance. Pass `nil` for no initial data.

#### `V6n(data = nil)`

Create a new `V6n` entity instance. Pass `nil` for no initial data.

#### `V7n(data = nil)`

Create a new `V7n` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## GuidEntity

```ruby
guid = client.Guid
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `Integer` | Yes | Number of UUIDs generated |
| `id` | `String` | No |  |
| `maxPerCall` | `Integer` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `Array` | Yes | Array of generated UUIDs |
| `version` | `String` | Yes | UUID version used for generation |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Guid.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Guid.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GuidEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## V1nEntity

```ruby
v1n = client.V1n
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `Integer` | Yes | Number of UUIDs generated |
| `maxPerCall` | `Integer` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `Array` | Yes | Array of generated UUIDs |
| `version` | `String` | Yes | UUID version used for generation |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.V1n.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.V1n.load({ "count" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `V1nEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## V3nEntity

```ruby
v3n = client.V3n
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `Integer` | Yes | Number of UUIDs generated |
| `maxPerCall` | `Integer` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `Array` | Yes | Array of generated UUIDs |
| `version` | `String` | Yes | UUID version used for generation |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.V3n.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.V3n.load({ "count" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `V3nEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## V4nEntity

```ruby
v4n = client.V4n
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `Integer` | Yes | Number of UUIDs generated |
| `maxPerCall` | `Integer` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `Array` | Yes | Array of generated UUIDs |
| `version` | `String` | Yes | UUID version used for generation |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.V4n.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.V4n.load({ "count" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `V4nEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## V5nEntity

```ruby
v5n = client.V5n
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `Integer` | Yes | Number of UUIDs generated |
| `maxPerCall` | `Integer` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `Array` | Yes | Array of generated UUIDs |
| `version` | `String` | Yes | UUID version used for generation |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.V5n.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.V5n.load({ "count" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `V5nEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## V6nEntity

```ruby
v6n = client.V6n
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `Integer` | Yes | Number of UUIDs generated |
| `maxPerCall` | `Integer` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `Array` | Yes | Array of generated UUIDs |
| `version` | `String` | Yes | UUID version used for generation |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.V6n.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.V6n.load({ "count" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `V6nEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## V7nEntity

```ruby
v7n = client.V7n
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `Integer` | Yes | Number of UUIDs generated |
| `maxPerCall` | `Integer` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `Array` | Yes | Array of generated UUIDs |
| `version` | `String` | Yes | UUID version used for generation |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.V7n.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.V7n.load({ "count" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `V7nEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = UuidGeneratorApi2SDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

