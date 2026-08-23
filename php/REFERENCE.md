# UuidGeneratorApi2 PHP SDK Reference

Complete API reference for the UuidGeneratorApi2 PHP SDK.


## UuidGeneratorApi2SDK

### Constructor

```php
require_once __DIR__ . '/uuidgeneratorapi2_sdk.php';

$client = new UuidGeneratorApi2SDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `UuidGeneratorApi2SDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = UuidGeneratorApi2SDK::test();
```


### Instance Methods

#### `Guid($data = null)`

Create a new `GuidEntity` instance. Pass `null` for no initial data.

#### `V1n($data = null)`

Create a new `V1nEntity` instance. Pass `null` for no initial data.

#### `V3n($data = null)`

Create a new `V3nEntity` instance. Pass `null` for no initial data.

#### `V4n($data = null)`

Create a new `V4nEntity` instance. Pass `null` for no initial data.

#### `V5n($data = null)`

Create a new `V5nEntity` instance. Pass `null` for no initial data.

#### `V6n($data = null)`

Create a new `V6nEntity` instance. Pass `null` for no initial data.

#### `V7n($data = null)`

Create a new `V7nEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): UuidGeneratorApi2Utility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## GuidEntity

```php
$guid = $client->Guid();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `array` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Guid()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Guid()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GuidEntity`

Create a new `GuidEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## V1nEntity

```php
$v1n = $client->V1n();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `array` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->V1n()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->V1n()->load(["count" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): V1nEntity`

Create a new `V1nEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## V3nEntity

```php
$v3n = $client->V3n();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `array` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->V3n()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->V3n()->load(["count" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): V3nEntity`

Create a new `V3nEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## V4nEntity

```php
$v4n = $client->V4n();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `array` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->V4n()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->V4n()->load(["count" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): V4nEntity`

Create a new `V4nEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## V5nEntity

```php
$v5n = $client->V5n();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `array` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->V5n()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->V5n()->load(["count" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): V5nEntity`

Create a new `V5nEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## V6nEntity

```php
$v6n = $client->V6n();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `array` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->V6n()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->V6n()->load(["count" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): V6nEntity`

Create a new `V6nEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## V7nEntity

```php
$v7n = $client->V7n();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | Yes | Number of UUIDs generated |
| `maxPerCall` | `int` | Yes | Maximum number of UUIDs allowed per API call |
| `uuids` | `array` | Yes | Array of generated UUIDs |
| `version` | `string` | Yes | UUID version used for generation |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->V7n()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->V7n()->load(["count" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): V7nEntity`

Create a new `V7nEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new UuidGeneratorApi2SDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

