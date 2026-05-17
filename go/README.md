# UuidGeneratorApi2 Golang SDK

The Golang SDK for the UuidGeneratorApi2 API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/uuid-generator-api2-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/uuid-generator-api2-sdk/go=../path/to/github.com/voxgig-sdk/uuid-generator-api2-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/uuid-generator-api2-sdk/go"
    "github.com/voxgig-sdk/uuid-generator-api2-sdk/go/core"
)

func main() {
    client := sdk.NewUuidGeneratorApi2SDK(map[string]any{
        "apikey": os.Getenv("UUID-GENERATOR-API2_APIKEY"),
    })
```

### 2. List guids

```go
    result, err := client.Guid(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```

### 3. Load a guid

```go
    result, err = client.Guid(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
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
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
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
UUID-GENERATOR-API2_TEST_LIVE=TRUE
UUID-GENERATOR-API2_APIKEY=<your-key>
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
| `"apikey"` | `string` | API key for authentication. |
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
| `V1n2` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V1n2 entity instance. |
| `V3n` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V3n entity instance. |
| `V3n2` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V3n2 entity instance. |
| `V4n` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V4n entity instance. |
| `V4n2` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V4n2 entity instance. |
| `V5n` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V5n entity instance. |
| `V5n2` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V5n2 entity instance. |
| `V6n` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V6n entity instance. |
| `V6n2` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V6n2 entity instance. |
| `V7n` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V7n entity instance. |
| `V7n2` | `(data map[string]any) UuidGeneratorApi2Entity` | Create a V7n2 entity instance. |

### Entity interface (UuidGeneratorApi2Entity)

All entities implement the `UuidGeneratorApi2Entity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### Guid

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"max_per_call"` |  |
| `"uuid"` |  |
| `"version"` |  |

Operations: List, Load.

API path: `/api/uuid-generator/guid`

#### V1n

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"max_per_call"` |  |
| `"uuid"` |  |
| `"version"` |  |

Operations: List.

API path: `/api/uuid-generator/v1`

#### V1n2

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"max_per_call"` |  |
| `"uuid"` |  |
| `"version"` |  |

Operations: Load.

API path: `/api/uuid-generator/v1/{count}`

#### V3n

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"max_per_call"` |  |
| `"uuid"` |  |
| `"version"` |  |

Operations: List.

API path: `/api/uuid-generator/v3`

#### V3n2

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"max_per_call"` |  |
| `"uuid"` |  |
| `"version"` |  |

Operations: Load.

API path: `/api/uuid-generator/v3/{count}`

#### V4n

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"max_per_call"` |  |
| `"uuid"` |  |
| `"version"` |  |

Operations: List.

API path: `/api/uuid-generator/v4`

#### V4n2

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"max_per_call"` |  |
| `"uuid"` |  |
| `"version"` |  |

Operations: Load.

API path: `/api/uuid-generator/v4/{count}`

#### V5n

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"max_per_call"` |  |
| `"uuid"` |  |
| `"version"` |  |

Operations: List.

API path: `/api/uuid-generator/v5`

#### V5n2

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"max_per_call"` |  |
| `"uuid"` |  |
| `"version"` |  |

Operations: Load.

API path: `/api/uuid-generator/v5/{count}`

#### V6n

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"max_per_call"` |  |
| `"uuid"` |  |
| `"version"` |  |

Operations: List.

API path: `/api/uuid-generator/v6`

#### V6n2

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"max_per_call"` |  |
| `"uuid"` |  |
| `"version"` |  |

Operations: Load.

API path: `/api/uuid-generator/v6/{count}`

#### V7n

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"max_per_call"` |  |
| `"uuid"` |  |
| `"version"` |  |

Operations: List.

API path: `/api/uuid-generator/v7`

#### V7n2

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"max_per_call"` |  |
| `"uuid"` |  |
| `"version"` |  |

Operations: Load.

API path: `/api/uuid-generator/v7/{count}`



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
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Guid(nil).Load(map[string]any{"id": "guid_id"}, nil)
```

#### Example: List

```go
results, err := client.Guid(nil).List(nil, nil)
```


### V1n

Create an instance: `v1n := client.V1n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.V1n(nil).List(nil, nil)
```


### V1n2

Create an instance: `v1n2 := client.V1n2(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.V1n2(nil).Load(map[string]any{"id": "v1n2_id"}, nil)
```


### V3n

Create an instance: `v3n := client.V3n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.V3n(nil).List(nil, nil)
```


### V3n2

Create an instance: `v3n2 := client.V3n2(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.V3n2(nil).Load(map[string]any{"id": "v3n2_id"}, nil)
```


### V4n

Create an instance: `v4n := client.V4n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.V4n(nil).List(nil, nil)
```


### V4n2

Create an instance: `v4n2 := client.V4n2(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.V4n2(nil).Load(map[string]any{"id": "v4n2_id"}, nil)
```


### V5n

Create an instance: `v5n := client.V5n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.V5n(nil).List(nil, nil)
```


### V5n2

Create an instance: `v5n2 := client.V5n2(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.V5n2(nil).Load(map[string]any{"id": "v5n2_id"}, nil)
```


### V6n

Create an instance: `v6n := client.V6n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.V6n(nil).List(nil, nil)
```


### V6n2

Create an instance: `v6n2 := client.V6n2(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.V6n2(nil).Load(map[string]any{"id": "v6n2_id"}, nil)
```


### V7n

Create an instance: `v7n := client.V7n(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.V7n(nil).List(nil, nil)
```


### V7n2

Create an instance: `v7n2 := client.V7n2(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.V7n2(nil).Load(map[string]any{"id": "v7n2_id"}, nil)
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

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

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
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
