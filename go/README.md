# UuidGeneratorApi2 Golang SDK



The Golang SDK for the UuidGeneratorApi2 API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Guid(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/uuid-generator-api2-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/uuid-generator-api2-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/uuid-generator-api2-sdk/go=../uuid-generator-api2-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/uuid-generator-api2-sdk/go"
)

func main() {
    client := sdk.New()

    // List guid records — the value is the array of records itself.
    guids, err := client.Guid(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range guids.([]any) {
        fmt.Println(item)
    }

    // Load a single guid — the value is the loaded record.
    guid, err := client.Guid(nil).Load(map[string]any{"id": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(guid)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
v1ns, err := client.V1n(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = v1ns
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

v1n, err := client.V1n(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(v1n) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewUuidGeneratorApi2SDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewUuidGeneratorApi2SDK

```go
func NewUuidGeneratorApi2SDK(options map[string]any) *UuidGeneratorApi2SDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *UuidGeneratorApi2SDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### UuidGeneratorApi2SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Guid` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a Guid entity instance. |
| `V1n` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V1n entity instance. |
| `V3n` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V3n entity instance. |
| `V4n` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V4n entity instance. |
| `V5n` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V5n entity instance. |
| `V6n` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V6n entity instance. |
| `V7n` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V7n entity instance. |

### Entity interface (UuidGeneratorApi2Entity)

All entities implement the `UuidGeneratorApi2Entity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    guid, err := client.Guid(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // guid is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Guid

| Field | Description |
| --- | --- |
| `"count"` | Number of UUIDs generated |
| `"maxPerCall"` | Maximum number of UUIDs allowed per API call |
| `"uuids"` | Array of generated UUIDs |
| `"version"` | UUID version used for generation |

Operations: List, Load.

API path: `/api/uuid-generator/guid`

#### V1n

| Field | Description |
| --- | --- |
| `"count"` | Number of UUIDs generated |
| `"maxPerCall"` | Maximum number of UUIDs allowed per API call |
| `"uuids"` | Array of generated UUIDs |
| `"version"` | UUID version used for generation |

Operations: List, Load.

API path: `/api/uuid-generator/v1`

#### V3n

| Field | Description |
| --- | --- |
| `"count"` | Number of UUIDs generated |
| `"maxPerCall"` | Maximum number of UUIDs allowed per API call |
| `"uuids"` | Array of generated UUIDs |
| `"version"` | UUID version used for generation |

Operations: List, Load.

API path: `/api/uuid-generator/v3`

#### V4n

| Field | Description |
| --- | --- |
| `"count"` | Number of UUIDs generated |
| `"maxPerCall"` | Maximum number of UUIDs allowed per API call |
| `"uuids"` | Array of generated UUIDs |
| `"version"` | UUID version used for generation |

Operations: List, Load.

API path: `/api/uuid-generator/v4`

#### V5n

| Field | Description |
| --- | --- |
| `"count"` | Number of UUIDs generated |
| `"maxPerCall"` | Maximum number of UUIDs allowed per API call |
| `"uuids"` | Array of generated UUIDs |
| `"version"` | UUID version used for generation |

Operations: List, Load.

API path: `/api/uuid-generator/v5`

#### V6n

| Field | Description |
| --- | --- |
| `"count"` | Number of UUIDs generated |
| `"maxPerCall"` | Maximum number of UUIDs allowed per API call |
| `"uuids"` | Array of generated UUIDs |
| `"version"` | UUID version used for generation |

Operations: List, Load.

API path: `/api/uuid-generator/v6`

#### V7n

| Field | Description |
| --- | --- |
| `"count"` | Number of UUIDs generated |
| `"maxPerCall"` | Maximum number of UUIDs allowed per API call |
| `"uuids"` | Array of generated UUIDs |
| `"version"` | UUID version used for generation |

Operations: List, Load.

API path: `/api/uuid-generator/v7`



## Entities


### Guid

Create an instance: `guid := client.Guid(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of UUIDs generated |
| `maxPerCall` | `int` | Maximum number of UUIDs allowed per API call |
| `uuids` | `[]any` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```go
guid, err := client.Guid(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(guid) // the loaded record
```

#### Example: List

```go
guids, err := client.Guid(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(guids) // the array of records
```


### V1n

Create an instance: `v1n := client.V1n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of UUIDs generated |
| `maxPerCall` | `int` | Maximum number of UUIDs allowed per API call |
| `uuids` | `[]any` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```go
v1n, err := client.V1n(nil).Load(map[string]any{"count": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(v1n) // the loaded record
```

#### Example: List

```go
v1ns, err := client.V1n(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(v1ns) // the array of records
```


### V3n

Create an instance: `v3n := client.V3n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of UUIDs generated |
| `maxPerCall` | `int` | Maximum number of UUIDs allowed per API call |
| `uuids` | `[]any` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```go
v3n, err := client.V3n(nil).Load(map[string]any{"count": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(v3n) // the loaded record
```

#### Example: List

```go
v3ns, err := client.V3n(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(v3ns) // the array of records
```


### V4n

Create an instance: `v4n := client.V4n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of UUIDs generated |
| `maxPerCall` | `int` | Maximum number of UUIDs allowed per API call |
| `uuids` | `[]any` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```go
v4n, err := client.V4n(nil).Load(map[string]any{"count": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(v4n) // the loaded record
```

#### Example: List

```go
v4ns, err := client.V4n(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(v4ns) // the array of records
```


### V5n

Create an instance: `v5n := client.V5n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of UUIDs generated |
| `maxPerCall` | `int` | Maximum number of UUIDs allowed per API call |
| `uuids` | `[]any` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```go
v5n, err := client.V5n(nil).Load(map[string]any{"count": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(v5n) // the loaded record
```

#### Example: List

```go
v5ns, err := client.V5n(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(v5ns) // the array of records
```


### V6n

Create an instance: `v6n := client.V6n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of UUIDs generated |
| `maxPerCall` | `int` | Maximum number of UUIDs allowed per API call |
| `uuids` | `[]any` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```go
v6n, err := client.V6n(nil).Load(map[string]any{"count": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(v6n) // the loaded record
```

#### Example: List

```go
v6ns, err := client.V6n(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(v6ns) // the array of records
```


### V7n

Create an instance: `v7n := client.V7n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of UUIDs generated |
| `maxPerCall` | `int` | Maximum number of UUIDs allowed per API call |
| `uuids` | `[]any` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```go
v7n, err := client.V7n(nil).Load(map[string]any{"count": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(v7n) // the loaded record
```

#### Example: List

```go
v7ns, err := client.V7n(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(v7ns) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/uuid-generator-api2-sdk/go/
├── uuid-generator-api2.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/uuid-generator-api2-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
v1n := client.V1n(nil)
v1n.List(nil, nil)

// v1n.Data() now returns the v1n data from the last list
// v1n.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
