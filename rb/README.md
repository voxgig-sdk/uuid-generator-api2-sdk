# UuidGeneratorApi2 Ruby SDK



The Ruby SDK for the UuidGeneratorApi2 API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Guid` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/uuid-generator-api2-sdk/releases](https://github.com/voxgig-sdk/uuid-generator-api2-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "UuidGeneratorApi2_sdk"

client = UuidGeneratorApi2SDK.new
```

### 2. List guid records

```ruby
begin
  # list returns an Array of Guid records — iterate directly.
  guids = client.Guid.list
  guids.each do |item|
    puts "#{item["count"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a v1n2

V1n2 is nested under count, so provide the `count`.

```ruby
begin
  # load returns the bare V1n2 record (raises on error).
  v1n2 = client.V1n2.load({ "count" => 1 })
  puts v1n2
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  guids = client.Guid.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = UuidGeneratorApi2SDK.test({
  "entity" => { "guid" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the bare mock record (raises on error).
guid = client.Guid.list()
puts guid
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = UuidGeneratorApi2SDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
UUID_GENERATOR_API2_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### UuidGeneratorApi2SDK

```ruby
require_relative "UuidGeneratorApi2_sdk"
client = UuidGeneratorApi2SDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = UuidGeneratorApi2SDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### UuidGeneratorApi2SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Guid` | `(data) -> GuidEntity` | Create a Guid entity instance. |
| `V1n` | `(data) -> V1nEntity` | Create a V1n entity instance. |
| `V1n2` | `(data) -> V1n2Entity` | Create a V1n2 entity instance. |
| `V3n` | `(data) -> V3nEntity` | Create a V3n entity instance. |
| `V3n2` | `(data) -> V3n2Entity` | Create a V3n2 entity instance. |
| `V4n` | `(data) -> V4nEntity` | Create a V4n entity instance. |
| `V4n2` | `(data) -> V4n2Entity` | Create a V4n2 entity instance. |
| `V5n` | `(data) -> V5nEntity` | Create a V5n entity instance. |
| `V5n2` | `(data) -> V5n2Entity` | Create a V5n2 entity instance. |
| `V6n` | `(data) -> V6nEntity` | Create a V6n entity instance. |
| `V6n2` | `(data) -> V6n2Entity` | Create a V6n2 entity instance. |
| `V7n` | `(data) -> V7nEntity` | Create a V7n entity instance. |
| `V7n2` | `(data) -> V7n2Entity` | Create a V7n2 entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `UuidGeneratorApi2Error` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Guid

| Field | Description |
| --- | --- |
| `count` |  |
| `max_per_call` |  |
| `uuid` |  |
| `version` |  |

Operations: List, Load.

API path: `/api/uuid-generator/guid`

#### V1n

| Field | Description |
| --- | --- |
| `count` |  |
| `max_per_call` |  |
| `uuid` |  |
| `version` |  |

Operations: List.

API path: `/api/uuid-generator/v1`

#### V1n2

| Field | Description |
| --- | --- |
| `count` |  |
| `max_per_call` |  |
| `uuid` |  |
| `version` |  |

Operations: Load.

API path: `/api/uuid-generator/v1/{count}`

#### V3n

| Field | Description |
| --- | --- |
| `count` |  |
| `max_per_call` |  |
| `uuid` |  |
| `version` |  |

Operations: List.

API path: `/api/uuid-generator/v3`

#### V3n2

| Field | Description |
| --- | --- |
| `count` |  |
| `max_per_call` |  |
| `uuid` |  |
| `version` |  |

Operations: Load.

API path: `/api/uuid-generator/v3/{count}`

#### V4n

| Field | Description |
| --- | --- |
| `count` |  |
| `max_per_call` |  |
| `uuid` |  |
| `version` |  |

Operations: List.

API path: `/api/uuid-generator/v4`

#### V4n2

| Field | Description |
| --- | --- |
| `count` |  |
| `max_per_call` |  |
| `uuid` |  |
| `version` |  |

Operations: Load.

API path: `/api/uuid-generator/v4/{count}`

#### V5n

| Field | Description |
| --- | --- |
| `count` |  |
| `max_per_call` |  |
| `uuid` |  |
| `version` |  |

Operations: List.

API path: `/api/uuid-generator/v5`

#### V5n2

| Field | Description |
| --- | --- |
| `count` |  |
| `max_per_call` |  |
| `uuid` |  |
| `version` |  |

Operations: Load.

API path: `/api/uuid-generator/v5/{count}`

#### V6n

| Field | Description |
| --- | --- |
| `count` |  |
| `max_per_call` |  |
| `uuid` |  |
| `version` |  |

Operations: List.

API path: `/api/uuid-generator/v6`

#### V6n2

| Field | Description |
| --- | --- |
| `count` |  |
| `max_per_call` |  |
| `uuid` |  |
| `version` |  |

Operations: Load.

API path: `/api/uuid-generator/v6/{count}`

#### V7n

| Field | Description |
| --- | --- |
| `count` |  |
| `max_per_call` |  |
| `uuid` |  |
| `version` |  |

Operations: List.

API path: `/api/uuid-generator/v7`

#### V7n2

| Field | Description |
| --- | --- |
| `count` |  |
| `max_per_call` |  |
| `uuid` |  |
| `version` |  |

Operations: Load.

API path: `/api/uuid-generator/v7/{count}`



## Entities


### Guid

Create an instance: `guid = client.Guid`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |
| `max_per_call` | `Integer` |  |
| `uuid` | `Array` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Guid record (raises on error).
guid = client.Guid.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Guid records (raises on error).
guids = client.Guid.list
```


### V1n

Create an instance: `v1n = client.V1n`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |
| `max_per_call` | `Integer` |  |
| `uuid` | `Array` |  |
| `version` | `String` |  |

#### Example: List

```ruby
# list returns an Array of V1n records (raises on error).
v1ns = client.V1n.list
```


### V1n2

Create an instance: `v1n2 = client.V1n2`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |
| `max_per_call` | `Integer` |  |
| `uuid` | `Array` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the bare V1n2 record (raises on error).
v1n2 = client.V1n2.load({ "count" => 1 })
```


### V3n

Create an instance: `v3n = client.V3n`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |
| `max_per_call` | `Integer` |  |
| `uuid` | `Array` |  |
| `version` | `String` |  |

#### Example: List

```ruby
# list returns an Array of V3n records (raises on error).
v3ns = client.V3n.list
```


### V3n2

Create an instance: `v3n2 = client.V3n2`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |
| `max_per_call` | `Integer` |  |
| `uuid` | `Array` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the bare V3n2 record (raises on error).
v3n2 = client.V3n2.load({ "count" => 1 })
```


### V4n

Create an instance: `v4n = client.V4n`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |
| `max_per_call` | `Integer` |  |
| `uuid` | `Array` |  |
| `version` | `String` |  |

#### Example: List

```ruby
# list returns an Array of V4n records (raises on error).
v4ns = client.V4n.list
```


### V4n2

Create an instance: `v4n2 = client.V4n2`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |
| `max_per_call` | `Integer` |  |
| `uuid` | `Array` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the bare V4n2 record (raises on error).
v4n2 = client.V4n2.load({ "count" => 1 })
```


### V5n

Create an instance: `v5n = client.V5n`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |
| `max_per_call` | `Integer` |  |
| `uuid` | `Array` |  |
| `version` | `String` |  |

#### Example: List

```ruby
# list returns an Array of V5n records (raises on error).
v5ns = client.V5n.list
```


### V5n2

Create an instance: `v5n2 = client.V5n2`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |
| `max_per_call` | `Integer` |  |
| `uuid` | `Array` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the bare V5n2 record (raises on error).
v5n2 = client.V5n2.load({ "count" => 1 })
```


### V6n

Create an instance: `v6n = client.V6n`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |
| `max_per_call` | `Integer` |  |
| `uuid` | `Array` |  |
| `version` | `String` |  |

#### Example: List

```ruby
# list returns an Array of V6n records (raises on error).
v6ns = client.V6n.list
```


### V6n2

Create an instance: `v6n2 = client.V6n2`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |
| `max_per_call` | `Integer` |  |
| `uuid` | `Array` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the bare V6n2 record (raises on error).
v6n2 = client.V6n2.load({ "count" => 1 })
```


### V7n

Create an instance: `v7n = client.V7n`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |
| `max_per_call` | `Integer` |  |
| `uuid` | `Array` |  |
| `version` | `String` |  |

#### Example: List

```ruby
# list returns an Array of V7n records (raises on error).
v7ns = client.V7n.list
```


### V7n2

Create an instance: `v7n2 = client.V7n2`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |
| `max_per_call` | `Integer` |  |
| `uuid` | `Array` |  |
| `version` | `String` |  |

#### Example: Load

```ruby
# load returns the bare V7n2 record (raises on error).
v7n2 = client.V7n2.load({ "count" => 1 })
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── UuidGeneratorApi2_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`UuidGeneratorApi2_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
guid = client.Guid
guid.list()

# guid.data_get now returns the guid data from the last list
# guid.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
