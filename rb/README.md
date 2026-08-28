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
    puts "#{item["id"]} #{item["count"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a v1n

V1n is nested under count, so provide the `count`.

```ruby
begin
  # load returns the ENTITY — call data_get for the V1n record (raises on error).
  v1n = client.V1n.load({ "count" => 1 })
  puts v1n
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  v1ns = client.V1n.list()
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

Create a mock client for unit testing — no server required:

```ruby
client = UuidGeneratorApi2SDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
v1n = client.V1n.list()
puts v1n
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
| `V3n` | `(data) -> V3nEntity` | Create a V3n entity instance. |
| `V4n` | `(data) -> V4nEntity` | Create a V4n entity instance. |
| `V5n` | `(data) -> V5nEntity` | Create a V5n entity instance. |
| `V6n` | `(data) -> V6nEntity` | Create a V6n entity instance. |
| `V7n` | `(data) -> V7nEntity` | Create a V7n entity instance. |

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
| `count` | Number of UUIDs generated |
| `id` |  |
| `maxPerCall` | Maximum number of UUIDs allowed per API call |
| `uuids` | Array of generated UUIDs |
| `version` | UUID version used for generation |

Operations: List, Load.

API path: `/api/uuid-generator/guid`

#### V1n

| Field | Description |
| --- | --- |
| `count` | Number of UUIDs generated |
| `maxPerCall` | Maximum number of UUIDs allowed per API call |
| `uuids` | Array of generated UUIDs |
| `version` | UUID version used for generation |

Operations: List, Load.

API path: `/api/uuid-generator/v1`

#### V3n

| Field | Description |
| --- | --- |
| `count` | Number of UUIDs generated |
| `maxPerCall` | Maximum number of UUIDs allowed per API call |
| `uuids` | Array of generated UUIDs |
| `version` | UUID version used for generation |

Operations: List, Load.

API path: `/api/uuid-generator/v3`

#### V4n

| Field | Description |
| --- | --- |
| `count` | Number of UUIDs generated |
| `maxPerCall` | Maximum number of UUIDs allowed per API call |
| `uuids` | Array of generated UUIDs |
| `version` | UUID version used for generation |

Operations: List, Load.

API path: `/api/uuid-generator/v4`

#### V5n

| Field | Description |
| --- | --- |
| `count` | Number of UUIDs generated |
| `maxPerCall` | Maximum number of UUIDs allowed per API call |
| `uuids` | Array of generated UUIDs |
| `version` | UUID version used for generation |

Operations: List, Load.

API path: `/api/uuid-generator/v5`

#### V6n

| Field | Description |
| --- | --- |
| `count` | Number of UUIDs generated |
| `maxPerCall` | Maximum number of UUIDs allowed per API call |
| `uuids` | Array of generated UUIDs |
| `version` | UUID version used for generation |

Operations: List, Load.

API path: `/api/uuid-generator/v6`

#### V7n

| Field | Description |
| --- | --- |
| `count` | Number of UUIDs generated |
| `maxPerCall` | Maximum number of UUIDs allowed per API call |
| `uuids` | Array of generated UUIDs |
| `version` | UUID version used for generation |

Operations: List, Load.

API path: `/api/uuid-generator/v7`



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
| `count` | `Integer` | Number of UUIDs generated |
| `id` | `String` |  |
| `maxPerCall` | `Integer` | Maximum number of UUIDs allowed per API call |
| `uuids` | `Array` | Array of generated UUIDs |
| `version` | `String` | UUID version used for generation |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Guid record (raises on error).
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
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` | Number of UUIDs generated |
| `maxPerCall` | `Integer` | Maximum number of UUIDs allowed per API call |
| `uuids` | `Array` | Array of generated UUIDs |
| `version` | `String` | UUID version used for generation |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the V1n record (raises on error).
v1n = client.V1n.load({ "count" => 1 })
```

#### Example: List

```ruby
# list returns an Array of V1n records (raises on error).
v1ns = client.V1n.list
```


### V3n

Create an instance: `v3n = client.V3n`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` | Number of UUIDs generated |
| `maxPerCall` | `Integer` | Maximum number of UUIDs allowed per API call |
| `uuids` | `Array` | Array of generated UUIDs |
| `version` | `String` | UUID version used for generation |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the V3n record (raises on error).
v3n = client.V3n.load({ "count" => 1 })
```

#### Example: List

```ruby
# list returns an Array of V3n records (raises on error).
v3ns = client.V3n.list
```


### V4n

Create an instance: `v4n = client.V4n`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` | Number of UUIDs generated |
| `maxPerCall` | `Integer` | Maximum number of UUIDs allowed per API call |
| `uuids` | `Array` | Array of generated UUIDs |
| `version` | `String` | UUID version used for generation |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the V4n record (raises on error).
v4n = client.V4n.load({ "count" => 1 })
```

#### Example: List

```ruby
# list returns an Array of V4n records (raises on error).
v4ns = client.V4n.list
```


### V5n

Create an instance: `v5n = client.V5n`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` | Number of UUIDs generated |
| `maxPerCall` | `Integer` | Maximum number of UUIDs allowed per API call |
| `uuids` | `Array` | Array of generated UUIDs |
| `version` | `String` | UUID version used for generation |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the V5n record (raises on error).
v5n = client.V5n.load({ "count" => 1 })
```

#### Example: List

```ruby
# list returns an Array of V5n records (raises on error).
v5ns = client.V5n.list
```


### V6n

Create an instance: `v6n = client.V6n`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` | Number of UUIDs generated |
| `maxPerCall` | `Integer` | Maximum number of UUIDs allowed per API call |
| `uuids` | `Array` | Array of generated UUIDs |
| `version` | `String` | UUID version used for generation |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the V6n record (raises on error).
v6n = client.V6n.load({ "count" => 1 })
```

#### Example: List

```ruby
# list returns an Array of V6n records (raises on error).
v6ns = client.V6n.list
```


### V7n

Create an instance: `v7n = client.V7n`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` | Number of UUIDs generated |
| `maxPerCall` | `Integer` | Maximum number of UUIDs allowed per API call |
| `uuids` | `Array` | Array of generated UUIDs |
| `version` | `String` | UUID version used for generation |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the V7n record (raises on error).
v7n = client.V7n.load({ "count" => 1 })
```

#### Example: List

```ruby
# list returns an Array of V7n records (raises on error).
v7ns = client.V7n.list
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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
v1n = client.V1n
v1n.list()

# v1n.data_get now returns the v1n data from the last list
# v1n.match_get returns the last match criteria
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
