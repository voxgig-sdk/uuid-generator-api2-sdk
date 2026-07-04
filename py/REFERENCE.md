# UuidGeneratorApi2 Python SDK Reference

Complete API reference for the UuidGeneratorApi2 Python SDK.


## UuidGeneratorApi2SDK

### Constructor

```python
from uuid-generator-api2_sdk import UuidGeneratorApi2SDK

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

#### `V1n2(data=None)`

Create a new `V1n2Entity` instance. Pass `None` for no initial data.

#### `V3n(data=None)`

Create a new `V3nEntity` instance. Pass `None` for no initial data.

#### `V3n2(data=None)`

Create a new `V3n2Entity` instance. Pass `None` for no initial data.

#### `V4n(data=None)`

Create a new `V4nEntity` instance. Pass `None` for no initial data.

#### `V4n2(data=None)`

Create a new `V4n2Entity` instance. Pass `None` for no initial data.

#### `V5n(data=None)`

Create a new `V5nEntity` instance. Pass `None` for no initial data.

#### `V5n2(data=None)`

Create a new `V5n2Entity` instance. Pass `None` for no initial data.

#### `V6n(data=None)`

Create a new `V6nEntity` instance. Pass `None` for no initial data.

#### `V6n2(data=None)`

Create a new `V6n2Entity` instance. Pass `None` for no initial data.

#### `V7n(data=None)`

Create a new `V7nEntity` instance. Pass `None` for no initial data.

#### `V7n2(data=None)`

Create a new `V7n2Entity` instance. Pass `None` for no initial data.

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
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Guid().list({})
for guid in results:
    print(guid)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Guid().load({"id": "guid_id"})
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
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.V1n().list({})
for v1n in results:
    print(v1n)
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

## V1n2Entity

```python
v1n2 = client.V1n2()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V1n2().load({"id": "v1n2_id"})
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

Create a new `V1n2Entity` instance with the same options.

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
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.V3n().list({})
for v3n in results:
    print(v3n)
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

## V3n2Entity

```python
v3n2 = client.V3n2()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V3n2().load({"id": "v3n2_id"})
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

Create a new `V3n2Entity` instance with the same options.

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
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.V4n().list({})
for v4n in results:
    print(v4n)
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

## V4n2Entity

```python
v4n2 = client.V4n2()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V4n2().load({"id": "v4n2_id"})
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

Create a new `V4n2Entity` instance with the same options.

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
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.V5n().list({})
for v5n in results:
    print(v5n)
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

## V5n2Entity

```python
v5n2 = client.V5n2()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V5n2().load({"id": "v5n2_id"})
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

Create a new `V5n2Entity` instance with the same options.

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
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.V6n().list({})
for v6n in results:
    print(v6n)
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

## V6n2Entity

```python
v6n2 = client.V6n2()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V6n2().load({"id": "v6n2_id"})
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

Create a new `V6n2Entity` instance with the same options.

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
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.V7n().list({})
for v7n in results:
    print(v7n)
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

## V7n2Entity

```python
v7n2 = client.V7n2()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.V7n2().load({"id": "v7n2_id"})
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

Create a new `V7n2Entity` instance with the same options.

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

