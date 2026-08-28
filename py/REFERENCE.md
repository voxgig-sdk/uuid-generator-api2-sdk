# UuidGeneratorApi2 Python SDK Reference

Complete API reference for the UuidGeneratorApi2 Python SDK.


## UuidGeneratorApi2SDK

### Constructor

```python
from uuidgeneratorapi2_sdk import UuidGeneratorApi2SDK

client = UuidGeneratorApi2SDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `UuidGeneratorApi2SDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = UuidGeneratorApi2SDK.test()
```


### Instance Methods

#### `Guid(data=None)`

Create a new `GuidEntity` instance. Pass `None` for no initial data.

#### `V1n(data=None)`

Create a new `V1nEntity` instance. Pass `None` for no initial data.

#### `V3n(data=None)`

Create a new `V3nEntity` instance. Pass `None` for no initial data.

#### `V4n(data=None)`

Create a new `V4nEntity` instance. Pass `None` for no initial data.

#### `V5n(data=None)`

Create a new `V5nEntity` instance. Pass `None` for no initial data.

#### `V6n(data=None)`

Create a new `V6nEntity` instance. Pass `None` for no initial data.

#### `V7n(data=None)`

Create a new `V7nEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## GuidEntity

```python
guid = client.Guid()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `id` | `str` | No |  |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `list` | Yes | Array of generated UUIDs |
| `version` | `str` | Yes | UUID version used for generation |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Guid().list()
for guid in results:
    print(guid)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Guid().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GuidEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V1nEntity

```python
v1n = client.V1n()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `list` | Yes | Array of generated UUIDs |
| `version` | `str` | Yes | UUID version used for generation |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.V1n().list()
for v1n in results:
    print(v1n)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V1n().load({"count": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V1nEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V3nEntity

```python
v3n = client.V3n()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `list` | Yes | Array of generated UUIDs |
| `version` | `str` | Yes | UUID version used for generation |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.V3n().list()
for v3n in results:
    print(v3n)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V3n().load({"count": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V3nEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V4nEntity

```python
v4n = client.V4n()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `list` | Yes | Array of generated UUIDs |
| `version` | `str` | Yes | UUID version used for generation |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.V4n().list()
for v4n in results:
    print(v4n)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V4n().load({"count": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V4nEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V5nEntity

```python
v5n = client.V5n()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `list` | Yes | Array of generated UUIDs |
| `version` | `str` | Yes | UUID version used for generation |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.V5n().list()
for v5n in results:
    print(v5n)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V5n().load({"count": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V5nEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V6nEntity

```python
v6n = client.V6n()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `list` | Yes | Array of generated UUIDs |
| `version` | `str` | Yes | UUID version used for generation |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.V6n().list()
for v6n in results:
    print(v6n)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V6n().load({"count": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V6nEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## V7nEntity

```python
v7n = client.V7n()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `list` | Yes | Array of generated UUIDs |
| `version` | `str` | Yes | UUID version used for generation |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.V7n().list()
for v7n in results:
    print(v7n)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V7n().load({"count": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `V7nEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = UuidGeneratorApi2SDK({
    "feature": {
        "test": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

