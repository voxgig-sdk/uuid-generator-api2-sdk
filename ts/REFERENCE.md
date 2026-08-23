# UuidGeneratorApi2 TypeScript SDK Reference

Complete API reference for the UuidGeneratorApi2 TypeScript SDK.


## UuidGeneratorApi2SDK

### Constructor

```ts
new UuidGeneratorApi2SDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `UuidGeneratorApi2SDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = UuidGeneratorApi2SDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `UuidGeneratorApi2SDK` instance in test mode.


### Instance Methods

#### `Guid(data?: object)`

Create a new `Guid` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GuidEntity` instance.

#### `V1n(data?: object)`

Create a new `V1n` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `V1nEntity` instance.

#### `V3n(data?: object)`

Create a new `V3n` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `V3nEntity` instance.

#### `V4n(data?: object)`

Create a new `V4n` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `V4nEntity` instance.

#### `V5n(data?: object)`

Create a new `V5n` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `V5nEntity` instance.

#### `V6n(data?: object)`

Create a new `V6n` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `V6nEntity` instance.

#### `V7n(data?: object)`

Create a new `V7n` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `V7nEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `UuidGeneratorApi2SDK.test()`.

**Returns:** `UuidGeneratorApi2SDK` instance in test mode.


---

## GuidEntity

```ts
const guid = client.Guid()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `number` | Yes | Number of UUIDs generated |
| `maxPerCall` | `number` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `any[]` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Guid().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Guid().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GuidEntity` instance with the same client and
options.

#### `client()`

Return the parent `UuidGeneratorApi2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## V1nEntity

```ts
const v1n = client.V1n()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `number` | Yes | Number of UUIDs generated |
| `maxPerCall` | `number` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `any[]` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.V1n().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.V1n().load({ count: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `V1nEntity` instance with the same client and
options.

#### `client()`

Return the parent `UuidGeneratorApi2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## V3nEntity

```ts
const v3n = client.V3n()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `number` | Yes | Number of UUIDs generated |
| `maxPerCall` | `number` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `any[]` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.V3n().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.V3n().load({ count: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `V3nEntity` instance with the same client and
options.

#### `client()`

Return the parent `UuidGeneratorApi2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## V4nEntity

```ts
const v4n = client.V4n()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `number` | Yes | Number of UUIDs generated |
| `maxPerCall` | `number` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `any[]` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.V4n().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.V4n().load({ count: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `V4nEntity` instance with the same client and
options.

#### `client()`

Return the parent `UuidGeneratorApi2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## V5nEntity

```ts
const v5n = client.V5n()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `number` | Yes | Number of UUIDs generated |
| `maxPerCall` | `number` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `any[]` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.V5n().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.V5n().load({ count: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `V5nEntity` instance with the same client and
options.

#### `client()`

Return the parent `UuidGeneratorApi2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## V6nEntity

```ts
const v6n = client.V6n()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `number` | Yes | Number of UUIDs generated |
| `maxPerCall` | `number` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `any[]` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.V6n().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.V6n().load({ count: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `V6nEntity` instance with the same client and
options.

#### `client()`

Return the parent `UuidGeneratorApi2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## V7nEntity

```ts
const v7n = client.V7n()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `number` | Yes | Number of UUIDs generated |
| `maxPerCall` | `number` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `any[]` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.V7n().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.V7n().load({ count: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `V7nEntity` instance with the same client and
options.

#### `client()`

Return the parent `UuidGeneratorApi2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new UuidGeneratorApi2SDK({
  feature: {
    test: { active: true },
  }
})
```

