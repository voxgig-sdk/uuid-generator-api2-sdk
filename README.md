# UuidGeneratorApi2 SDK



Available for [Golang](go/) and [Go CLI](go-cli/) and [Go MCP server](go-mcp/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


## Entities

The API exposes 13 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Guid** |  | `/api/uuid-generator/guid` |
| **V1n** |  | `/api/uuid-generator/v1` |
| **V1n2** |  | `/api/uuid-generator/v1/{count}` |
| **V3n** |  | `/api/uuid-generator/v3` |
| **V3n2** |  | `/api/uuid-generator/v3/{count}` |
| **V4n** |  | `/api/uuid-generator/v4` |
| **V4n2** |  | `/api/uuid-generator/v4/{count}` |
| **V5n** |  | `/api/uuid-generator/v5` |
| **V5n2** |  | `/api/uuid-generator/v5/{count}` |
| **V6n** |  | `/api/uuid-generator/v6` |
| **V6n2** |  | `/api/uuid-generator/v6/{count}` |
| **V7n** |  | `/api/uuid-generator/v7` |
| **V7n2** |  | `/api/uuid-generator/v7/{count}` |

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/uuid-generator-api2-sdk/go"

client := sdk.NewUuidGeneratorApi2SDK(map[string]any{
    "apikey": os.Getenv("UUID-GENERATOR-API2_APIKEY"),
})

// List all guids
guids, err := client.Guid(nil).List(nil, nil)
```

### Lua

```lua
local sdk = require("uuid-generator-api2_sdk")

local client = sdk.new({
  apikey = os.getenv("UUID-GENERATOR-API2_APIKEY"),
})

-- List all guids
local guids, err = client:Guid(nil):list(nil, nil)

-- Load a specific guid
local guid, err = client:Guid(nil):load(
  { id = "example_id" }, nil
)
```

### PHP

```php
<?php
require_once 'uuidgeneratorapi2_sdk.php';

$client = new UuidGeneratorApi2SDK([
    "apikey" => getenv("UUID-GENERATOR-API2_APIKEY"),
]);

// List all guids
[$guids, $err] = $client->Guid(null)->list(null, null);

// Load a specific guid
[$guid, $err] = $client->Guid(null)->load(
    ["id" => "example_id"], null
);
```

### Python

```python
import os
from uuidgeneratorapi2_sdk import UuidGeneratorApi2SDK

client = UuidGeneratorApi2SDK({
    "apikey": os.environ.get("UUID-GENERATOR-API2_APIKEY"),
})

# List all guids
guids, err = client.Guid(None).list(None, None)

# Load a specific guid
guid, err = client.Guid(None).load(
    {"id": "example_id"}, None
)
```

### Ruby

```ruby
require_relative "UuidGeneratorApi2_sdk"

client = UuidGeneratorApi2SDK.new({
  "apikey" => ENV["UUID-GENERATOR-API2_APIKEY"],
})

# List all guids
guids, err = client.Guid(nil).list(nil, nil)

# Load a specific guid
guid, err = client.Guid(nil).load(
  { "id" => "example_id" }, nil
)
```

### TypeScript

```ts
import { UuidGeneratorApi2SDK } from 'uuid-generator-api2'

const client = new UuidGeneratorApi2SDK({
  apikey: process.env.UUID-GENERATOR-API2_APIKEY,
})

// List all guids
const guids = await client.Guid().list()
```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Guid(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Guid(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = UuidGeneratorApi2SDK::test(null, null);
[$result, $err] = $client->Guid(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = UuidGeneratorApi2SDK.test(None, None)
result, err = client.Guid(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = UuidGeneratorApi2SDK.test(nil, nil)
result, err = client.Guid(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = UuidGeneratorApi2SDK.test()
const result = await client.Guid().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Go CLI SDK](go-cli/README.md)
- [Go MCP server SDK](go-mcp/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

