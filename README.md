# UuidGeneratorApi2 SDK

Generate RFC 4122 / RFC 9562 UUIDs in versions 1, 3, 4, 5, 6, and 7 over a free public HTTPS API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About UUID Generator API

The UUID Generator API is a free utility from [ToolkitVault](https://toolkitvault.com), a collection of web-based developer tools described by its authors as a "Web Swiss Army Knife" of secure, fast, and useful utilities. The UUID endpoint produces identifiers conforming to RFC 4122 and RFC 9562 across every commonly used UUID version.

What you get from the API:

- UUID versions **v1** (time + node), **v3** (MD5 name-based), **v4** (random), **v5** (SHA-1 name-based), **v6** (re-ordered time), and **v7** (time-ordered, 2025-default)
- A `guid` alias that maps to v4
- Batch generation up to **200 UUIDs per call** via `count` (or `n`) query parameter
- Formatting options: `default`, `uppercase`, `braced`, and `braced-uppercase`
- Namespace + name inputs (`namespace=dns|url`, `name=<string>`) for v3 and v5
- JSON response of shape `{ "version", "count", "maxPerCall", "uuids": [...] }`

Operational notes: requests are served over HTTPS at `https://toolkitvault.com/api/uuid-generator`. Access is public but rate-limited (HTTP 429 on excess). Requesting v2 returns HTTP 501, as DCE Security UUIDs are not implemented. Invalid versions return HTTP 400.

## Try it

**TypeScript**
```bash
npm install uuid-generator-api2
```

**Python**
```bash
pip install uuid-generator-api2-sdk
```

**PHP**
```bash
composer require voxgig/uuid-generator-api2-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/uuid-generator-api2-sdk/go
```

**Ruby**
```bash
gem install uuid-generator-api2-sdk
```

**Lua**
```bash
luarocks install uuid-generator-api2-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { UuidGeneratorApi2SDK } from 'uuid-generator-api2'

const client = new UuidGeneratorApi2SDK({})

// List all guids
const guids = await client.Guid().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o uuid-generator-api2-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "uuid-generator-api2": {
      "command": "/abs/path/to/uuid-generator-api2-mcp"
    }
  }
}
```

## Entities

The API exposes 13 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Guid** | Generic UUID generation grouping; the `guid` keyword is documented as an alias for v4 at `/api/uuid-generator/guid`. | `/api/uuid-generator/guid` |
| **V1n** | Time-and-node based UUID v1 generation via `GET /api/uuid-generator/v1` with an optional `count` (or `n`) query parameter. | `/api/uuid-generator/v1` |
| **V1n2** | Path-style v1 batch endpoint at `GET /api/uuid-generator/v1/{count}` for requesting multiple v1 UUIDs in one call (max 200). | `/api/uuid-generator/v1/{count}` |
| **V3n** | Name-based UUID v3 (MD5) generation at `GET /api/uuid-generator/v3`, taking `namespace=dns|url` and `name` query parameters. | `/api/uuid-generator/v3` |
| **V3n2** | Path-style v3 batch endpoint at `GET /api/uuid-generator/v3/{count}` for generating multiple v3 UUIDs from the supplied namespace/name. | `/api/uuid-generator/v3/{count}` |
| **V4n** | Random UUID v4 generation at `GET /api/uuid-generator/v4`, with optional `count`/`n` and `format` query parameters. | `/api/uuid-generator/v4` |
| **V4n2** | Path-style v4 batch endpoint at `GET /api/uuid-generator/v4/{count}` for requesting up to 200 random v4 UUIDs per call. | `/api/uuid-generator/v4/{count}` |
| **V5n** | Name-based UUID v5 (SHA-1) generation at `GET /api/uuid-generator/v5`, taking `namespace=dns|url` and `name`. | `/api/uuid-generator/v5` |
| **V5n2** | Path-style v5 batch endpoint at `GET /api/uuid-generator/v5/{count}` for generating multiple v5 UUIDs from the supplied namespace/name. | `/api/uuid-generator/v5/{count}` |
| **V6n** | Re-ordered time-based UUID v6 generation at `GET /api/uuid-generator/v6`, with optional `count`/`n` and `format`. | `/api/uuid-generator/v6` |
| **V6n2** | Path-style v6 batch endpoint at `GET /api/uuid-generator/v6/{count}` for bulk v6 generation. | `/api/uuid-generator/v6/{count}` |
| **V7n** | Time-ordered UUID v7 generation at `GET /api/uuid-generator/v7` — recommended by the provider as the 2025 default for modern apps needing time ordering. | `/api/uuid-generator/v7` |
| **V7n2** | Path-style v7 batch endpoint at `GET /api/uuid-generator/v7/{count}` for requesting multiple time-ordered v7 UUIDs per call. | `/api/uuid-generator/v7/{count}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from uuidgeneratorapi2_sdk import UuidGeneratorApi2SDK

client = UuidGeneratorApi2SDK({})

# List all guids
guids, err = client.Guid(None).list(None, None)

# Load a specific guid
guid, err = client.Guid(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'uuidgeneratorapi2_sdk.php';

$client = new UuidGeneratorApi2SDK([]);

// List all guids
[$guids, $err] = $client->Guid(null)->list(null, null);

// Load a specific guid
[$guid, $err] = $client->Guid(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/uuid-generator-api2-sdk/go"

client := sdk.NewUuidGeneratorApi2SDK(map[string]any{})

// List all guids
guids, err := client.Guid(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "UuidGeneratorApi2_sdk"

client = UuidGeneratorApi2SDK.new({})

# List all guids
guids, err = client.Guid(nil).list(nil, nil)

# Load a specific guid
guid, err = client.Guid(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("uuid-generator-api2_sdk")

local client = sdk.new({})

-- List all guids
local guids, err = client:Guid(nil):list(nil, nil)

-- Load a specific guid
local guid, err = client:Guid(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = UuidGeneratorApi2SDK.test()
const result = await client.Guid().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = UuidGeneratorApi2SDK.test(None, None)
result, err = client.Guid(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = UuidGeneratorApi2SDK::test(null, null);
[$result, $err] = $client->Guid(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Guid(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = UuidGeneratorApi2SDK.test(nil, nil)
result, err = client.Guid(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Guid(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the UUID Generator API

- Upstream: [https://toolkitvault.com/uuid-generator](https://toolkitvault.com/uuid-generator)
- API docs: [https://toolkitvault.com/uuid-generator/uuid-api-docs](https://toolkitvault.com/uuid-generator/uuid-api-docs)

- Free, public, rate-limited API — no API key or registration required
- Follows RFC 4122 and RFC 9562 for UUID generation
- The provider notes UUIDs from this service are not cryptographically secure and uniqueness is not guaranteed
- Use at your own risk for non-critical identifier needs

---

Generated from the UUID Generator API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
