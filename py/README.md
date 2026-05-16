# UuidGeneratorApi2 Python SDK

The Python SDK for the UuidGeneratorApi2 API. Provides an entity-oriented interface following Pythonic conventions.


## Install
```bash
pip install uuid-generator-api2-sdk
```

Or install from source:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from uuidgeneratorapi2_sdk import UuidGeneratorApi2SDK

client = UuidGeneratorApi2SDK({
    "apikey": os.environ.get("UUID-GENERATOR-API2_APIKEY"),
})
```

### 2. List guids

```python
result, err = client.Guid(None).list(None, None)
if err:
    raise Exception(err)

if isinstance(result, list):
    for item in result:
        d = item.data_get()
        print(d["id"], d["name"])
```

### 3. Load a guid

```python
result, err = client.Guid(None).load({"id": "example_id"}, None)
if err:
    raise Exception(err)
print(result)
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
```

### Prepare a request without sending it

```python
fetchdef, err = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = UuidGeneratorApi2SDK.test(None, None)

result, err = client.UuidGeneratorApi2(None).load(
    {"id": "test01"}, None
)
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = UuidGeneratorApi2SDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### UuidGeneratorApi2SDK

```python
from uuidgeneratorapi2_sdk import UuidGeneratorApi2SDK

client = UuidGeneratorApi2SDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = UuidGeneratorApi2SDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### UuidGeneratorApi2SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> (dict, err)` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> (dict, err)` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> (any, err)` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> (any, err)` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> (any, err)` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> (any, err)` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> (any, err)` | Remove an entity. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`dict` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `const guid = client.Guid()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```ts
const guid = await client.Guid().load({ id: 'guid_id' })
```

#### Example: List

```ts
const guids = await client.Guid().list()
```


### V1n

Create an instance: `const v1n = client.V1n()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: List

```ts
const v1ns = await client.V1n().list()
```


### V1n2

Create an instance: `const v1n2 = client.V1n2()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```ts
const v1n2 = await client.V1n2().load({ id: 'v1n2_id' })
```


### V3n

Create an instance: `const v3n = client.V3n()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: List

```ts
const v3ns = await client.V3n().list()
```


### V3n2

Create an instance: `const v3n2 = client.V3n2()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```ts
const v3n2 = await client.V3n2().load({ id: 'v3n2_id' })
```


### V4n

Create an instance: `const v4n = client.V4n()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: List

```ts
const v4ns = await client.V4n().list()
```


### V4n2

Create an instance: `const v4n2 = client.V4n2()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```ts
const v4n2 = await client.V4n2().load({ id: 'v4n2_id' })
```


### V5n

Create an instance: `const v5n = client.V5n()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: List

```ts
const v5ns = await client.V5n().list()
```


### V5n2

Create an instance: `const v5n2 = client.V5n2()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```ts
const v5n2 = await client.V5n2().load({ id: 'v5n2_id' })
```


### V6n

Create an instance: `const v6n = client.V6n()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: List

```ts
const v6ns = await client.V6n().list()
```


### V6n2

Create an instance: `const v6n2 = client.V6n2()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```ts
const v6n2 = await client.V6n2().load({ id: 'v6n2_id' })
```


### V7n

Create an instance: `const v7n = client.V7n()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: List

```ts
const v7ns = await client.V7n().list()
```


### V7n2

Create an instance: `const v7n2 = client.V7n2()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | ``$INTEGER`` |  |
| `max_per_call` | ``$INTEGER`` |  |
| `uuid` | ``$ARRAY`` |  |
| `version` | ``$STRING`` |  |

#### Example: Load

```ts
const v7n2 = await client.V7n2().load({ id: 'v7n2_id' })
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
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── uuidgeneratorapi2_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`uuidgeneratorapi2_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
moon = client.Moon()
moon.load({"planet_id": "earth", "id": "luna"})

# moon.data_get() now returns the loaded moon data
# moon.match_get() returns the last match criteria
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
