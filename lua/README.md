# UuidGeneratorApi2 Lua SDK



The Lua SDK for the UuidGeneratorApi2 API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Guid()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/uuid-generator-api2-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("uuid-generator-api2_sdk")

local client = sdk.new()
```

### 2. List guid records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local guids, err = client:Guid():list()
if err then error(err) end

for _, item in ipairs(guids) do
  print(item["id"], item["version"])
end
```

### 3. Load a v1n

V1n is nested under count, so provide the `count`.

```lua
local v1n, err = client:V1n():load({ count = 1 })
if err then error(err) end
print(v1n)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local v1ns, err = client:V1n():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:V1n():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### UuidGeneratorApi2SDK

```lua
local sdk = require("uuid-generator-api2_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### UuidGeneratorApi2SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local guid, err = client:Guid():load({ id = "example_id" })
    if err then error(err) end
    -- guid is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local guid = client:Guid(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` | Number of UUIDs generated |
| `id` | `string` |  |
| `maxPerCall` | `number` | Maximum number of UUIDs allowed per API call |
| `uuids` | `table` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```lua
local guid, err = client:Guid():load({ id = 1 })
```

#### Example: List

```lua
local guids, err = client:Guid():list()
```


### V1n

Create an instance: `local v1n = client:V1n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` | Number of UUIDs generated |
| `maxPerCall` | `number` | Maximum number of UUIDs allowed per API call |
| `uuids` | `table` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```lua
local v1n, err = client:V1n():load({ count = 1 })
```

#### Example: List

```lua
local v1ns, err = client:V1n():list()
```


### V3n

Create an instance: `local v3n = client:V3n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` | Number of UUIDs generated |
| `maxPerCall` | `number` | Maximum number of UUIDs allowed per API call |
| `uuids` | `table` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```lua
local v3n, err = client:V3n():load({ count = 1 })
```

#### Example: List

```lua
local v3ns, err = client:V3n():list()
```


### V4n

Create an instance: `local v4n = client:V4n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` | Number of UUIDs generated |
| `maxPerCall` | `number` | Maximum number of UUIDs allowed per API call |
| `uuids` | `table` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```lua
local v4n, err = client:V4n():load({ count = 1 })
```

#### Example: List

```lua
local v4ns, err = client:V4n():list()
```


### V5n

Create an instance: `local v5n = client:V5n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` | Number of UUIDs generated |
| `maxPerCall` | `number` | Maximum number of UUIDs allowed per API call |
| `uuids` | `table` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```lua
local v5n, err = client:V5n():load({ count = 1 })
```

#### Example: List

```lua
local v5ns, err = client:V5n():list()
```


### V6n

Create an instance: `local v6n = client:V6n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` | Number of UUIDs generated |
| `maxPerCall` | `number` | Maximum number of UUIDs allowed per API call |
| `uuids` | `table` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```lua
local v6n, err = client:V6n():load({ count = 1 })
```

#### Example: List

```lua
local v6ns, err = client:V6n():list()
```


### V7n

Create an instance: `local v7n = client:V7n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` | Number of UUIDs generated |
| `maxPerCall` | `number` | Maximum number of UUIDs allowed per API call |
| `uuids` | `table` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```lua
local v7n, err = client:V7n():load({ count = 1 })
```

#### Example: List

```lua
local v7ns, err = client:V7n():list()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── uuid-generator-api2_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`uuid-generator-api2_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local v1n = client:V1n()
v1n:list()

-- v1n:data_get() now returns the v1n data from the last list
-- v1n:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
