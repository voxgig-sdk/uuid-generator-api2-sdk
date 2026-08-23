# UuidGeneratorApi2 PHP SDK



The PHP SDK for the UuidGeneratorApi2 API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Guid()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/uuid-generator-api2-sdk/releases](https://github.com/voxgig-sdk/uuid-generator-api2-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'uuidgeneratorapi2_sdk.php';

$client = new UuidGeneratorApi2SDK();
```

### 2. List guid records

```php
try {
    // list() returns an array of Guid records — iterate directly.
    $guids = $client->Guid()->list();
    foreach ($guids as $item) {
        echo $item["count"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a v1n

V1n is nested under count, so provide the `count`.

```php
try {
    // load() returns the ENTITY — call data_get() for the V1n record (throws on error).
    $v1n = $client->V1n()->load(["count" => 1]);
    print_r($v1n);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $v1ns = $client->V1n()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = UuidGeneratorApi2SDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$v1n = $client->V1n()->list();
print_r($v1n);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new UuidGeneratorApi2SDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
UUID_GENERATOR_API2_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### UuidGeneratorApi2SDK

```php
require_once 'uuidgeneratorapi2_sdk.php';
$client = new UuidGeneratorApi2SDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = UuidGeneratorApi2SDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### UuidGeneratorApi2SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Guid` | `($data): GuidEntity` | Create a Guid entity instance. |
| `V1n` | `($data): V1nEntity` | Create a V1n entity instance. |
| `V3n` | `($data): V3nEntity` | Create a V3n entity instance. |
| `V4n` | `($data): V4nEntity` | Create a V4n entity instance. |
| `V5n` | `($data): V5nEntity` | Create a V5n entity instance. |
| `V6n` | `($data): V6nEntity` | Create a V6n entity instance. |
| `V7n` | `($data): V7nEntity` | Create a V7n entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Guid

| Field | Description |
| --- | --- |
| `count` | Number of UUIDs generated |
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

Create an instance: `$guid = $client->Guid();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of UUIDs generated |
| `maxPerCall` | `int` | Maximum number of UUIDs allowed per API call |
| `uuids` | `array` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Guid record (throws on error).
$guid = $client->Guid()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Guid records (throws on error).
$guids = $client->Guid()->list();
```


### V1n

Create an instance: `$v1n = $client->V1n();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of UUIDs generated |
| `maxPerCall` | `int` | Maximum number of UUIDs allowed per API call |
| `uuids` | `array` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the V1n record (throws on error).
$v1n = $client->V1n()->load(["count" => 1]);
```

#### Example: List

```php
// list() returns an array of V1n records (throws on error).
$v1ns = $client->V1n()->list();
```


### V3n

Create an instance: `$v3n = $client->V3n();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of UUIDs generated |
| `maxPerCall` | `int` | Maximum number of UUIDs allowed per API call |
| `uuids` | `array` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the V3n record (throws on error).
$v3n = $client->V3n()->load(["count" => 1]);
```

#### Example: List

```php
// list() returns an array of V3n records (throws on error).
$v3ns = $client->V3n()->list();
```


### V4n

Create an instance: `$v4n = $client->V4n();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of UUIDs generated |
| `maxPerCall` | `int` | Maximum number of UUIDs allowed per API call |
| `uuids` | `array` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the V4n record (throws on error).
$v4n = $client->V4n()->load(["count" => 1]);
```

#### Example: List

```php
// list() returns an array of V4n records (throws on error).
$v4ns = $client->V4n()->list();
```


### V5n

Create an instance: `$v5n = $client->V5n();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of UUIDs generated |
| `maxPerCall` | `int` | Maximum number of UUIDs allowed per API call |
| `uuids` | `array` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the V5n record (throws on error).
$v5n = $client->V5n()->load(["count" => 1]);
```

#### Example: List

```php
// list() returns an array of V5n records (throws on error).
$v5ns = $client->V5n()->list();
```


### V6n

Create an instance: `$v6n = $client->V6n();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of UUIDs generated |
| `maxPerCall` | `int` | Maximum number of UUIDs allowed per API call |
| `uuids` | `array` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the V6n record (throws on error).
$v6n = $client->V6n()->load(["count" => 1]);
```

#### Example: List

```php
// list() returns an array of V6n records (throws on error).
$v6ns = $client->V6n()->list();
```


### V7n

Create an instance: `$v7n = $client->V7n();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of UUIDs generated |
| `maxPerCall` | `int` | Maximum number of UUIDs allowed per API call |
| `uuids` | `array` | Array of generated UUIDs |
| `version` | `string` | UUID version used for generation |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the V7n record (throws on error).
$v7n = $client->V7n()->load(["count" => 1]);
```

#### Example: List

```php
// list() returns an array of V7n records (throws on error).
$v7ns = $client->V7n()->list();
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── uuidgeneratorapi2_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`uuidgeneratorapi2_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$v1n = $client->V1n();
$v1n->list();

// $v1n->data_get() now returns the v1n data from the last list
// $v1n->match_get() returns the last match criteria
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
