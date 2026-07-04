# UuidGeneratorApi2 PHP SDK Reference

Complete API reference for the UuidGeneratorApi2 PHP SDK.


## UuidGeneratorApi2SDK

### Constructor

```php
require_once __DIR__ . '/uuid-generator-api2_sdk.php';

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

#### `V1n2($data = null)`

Create a new `V1n2Entity` instance. Pass `null` for no initial data.

#### `V3n($data = null)`

Create a new `V3nEntity` instance. Pass `null` for no initial data.

#### `V3n2($data = null)`

Create a new `V3n2Entity` instance. Pass `null` for no initial data.

#### `V4n($data = null)`

Create a new `V4nEntity` instance. Pass `null` for no initial data.

#### `V4n2($data = null)`

Create a new `V4n2Entity` instance. Pass `null` for no initial data.

#### `V5n($data = null)`

Create a new `V5nEntity` instance. Pass `null` for no initial data.

#### `V5n2($data = null)`

Create a new `V5n2Entity` instance. Pass `null` for no initial data.

#### `V6n($data = null)`

Create a new `V6nEntity` instance. Pass `null` for no initial data.

#### `V6n2($data = null)`

Create a new `V6n2Entity` instance. Pass `null` for no initial data.

#### `V7n($data = null)`

Create a new `V7nEntity` instance. Pass `null` for no initial data.

#### `V7n2($data = null)`

Create a new `V7n2Entity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
$guid = $client->guid();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->guid()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->guid()->load(["id" => "guid_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GuidEntity`

Create a new `GuidEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## V1nEntity

```php
$v1n = $client->v1n();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->v1n()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): V1nEntity`

Create a new `V1nEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## V1n2Entity

```php
$v1n2 = $client->v1n2();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->v1n2()->load(["id" => "v1n2_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): V1n2Entity`

Create a new `V1n2Entity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## V3nEntity

```php
$v3n = $client->v3n();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->v3n()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): V3nEntity`

Create a new `V3nEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## V3n2Entity

```php
$v3n2 = $client->v3n2();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->v3n2()->load(["id" => "v3n2_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): V3n2Entity`

Create a new `V3n2Entity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## V4nEntity

```php
$v4n = $client->v4n();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->v4n()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): V4nEntity`

Create a new `V4nEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## V4n2Entity

```php
$v4n2 = $client->v4n2();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->v4n2()->load(["id" => "v4n2_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): V4n2Entity`

Create a new `V4n2Entity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## V5nEntity

```php
$v5n = $client->v5n();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->v5n()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): V5nEntity`

Create a new `V5nEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## V5n2Entity

```php
$v5n2 = $client->v5n2();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->v5n2()->load(["id" => "v5n2_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): V5n2Entity`

Create a new `V5n2Entity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## V6nEntity

```php
$v6n = $client->v6n();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->v6n()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): V6nEntity`

Create a new `V6nEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## V6n2Entity

```php
$v6n2 = $client->v6n2();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->v6n2()->load(["id" => "v6n2_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): V6n2Entity`

Create a new `V6n2Entity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## V7nEntity

```php
$v7n = $client->v7n();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->v7n()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): V7nEntity`

Create a new `V7nEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## V7n2Entity

```php
$v7n2 = $client->v7n2();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | ``$INTEGER`` | Yes |  |
| `max_per_call` | ``$INTEGER`` | Yes |  |
| `uuid` | ``$ARRAY`` | Yes |  |
| `version` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->v7n2()->load(["id" => "v7n2_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): V7n2Entity`

Create a new `V7n2Entity` instance with the same client and
options.

#### `getName(): string`

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

