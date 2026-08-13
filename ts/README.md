# UuidGeneratorApi2 TypeScript SDK



The TypeScript SDK for the UuidGeneratorApi2 API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Guid()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/uuid-generator-api2-sdk/releases](https://github.com/voxgig-sdk/uuid-generator-api2-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { UuidGeneratorApi2SDK } from '@voxgig-sdk/uuid-generator-api2'

const client = new UuidGeneratorApi2SDK()
```

### 2. List guid records

`list()` resolves to an array of Guid ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const guids = await client.Guid().list()

for (const guid of guids) {
  console.log(guid)
}
```

### 3. Load a v1n

V1n is nested under count, so provide the `count`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const v1n = await client.V1n().load({
    count: 1,
  })
  console.log(v1n)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const v1ns = await client.V1n().list()
  console.log(v1ns)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = UuidGeneratorApi2SDK.test()

const v1n = await client.V1n().list()
// v1n is the entity, populated with mock response data
// — call v1n.data() for the record itself
console.log(v1n)
```

You can also use the instance method:

```ts
const client = new UuidGeneratorApi2SDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.V1n()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new UuidGeneratorApi2SDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
UUID_GENERATOR_API2_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### UuidGeneratorApi2SDK

#### Constructor

```ts
new UuidGeneratorApi2SDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Guid(data?)` | `GuidEntity` | Create a Guid entity instance. |
| `V1n(data?)` | `V1nEntity` | Create a V1n entity instance. |
| `V3n(data?)` | `V3nEntity` | Create a V3n entity instance. |
| `V4n(data?)` | `V4nEntity` | Create a V4n entity instance. |
| `V5n(data?)` | `V5nEntity` | Create a V5n entity instance. |
| `V6n(data?)` | `V6nEntity` | Create a V6n entity instance. |
| `V7n(data?)` | `V7nEntity` | Create a V7n entity instance. |
| `tester(testopts?, sdkopts?)` | `UuidGeneratorApi2SDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `UuidGeneratorApi2SDK.test(testopts?, sdkopts?)` | `UuidGeneratorApi2SDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): UuidGeneratorApi2SDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Guid

| Field | Description |
| --- | --- |
| `count` |  |
| `maxPerCall` |  |
| `uuids` |  |
| `version` |  |

Operations: list, load.

API path: `/api/uuid-generator/guid`

#### V1n

| Field | Description |
| --- | --- |
| `count` |  |
| `maxPerCall` |  |
| `uuids` |  |
| `version` |  |

Operations: list, load.

API path: `/api/uuid-generator/v1`

#### V3n

| Field | Description |
| --- | --- |
| `count` |  |
| `maxPerCall` |  |
| `uuids` |  |
| `version` |  |

Operations: list, load.

API path: `/api/uuid-generator/v3`

#### V4n

| Field | Description |
| --- | --- |
| `count` |  |
| `maxPerCall` |  |
| `uuids` |  |
| `version` |  |

Operations: list, load.

API path: `/api/uuid-generator/v4`

#### V5n

| Field | Description |
| --- | --- |
| `count` |  |
| `maxPerCall` |  |
| `uuids` |  |
| `version` |  |

Operations: list, load.

API path: `/api/uuid-generator/v5`

#### V6n

| Field | Description |
| --- | --- |
| `count` |  |
| `maxPerCall` |  |
| `uuids` |  |
| `version` |  |

Operations: list, load.

API path: `/api/uuid-generator/v6`

#### V7n

| Field | Description |
| --- | --- |
| `count` |  |
| `maxPerCall` |  |
| `uuids` |  |
| `version` |  |

Operations: list, load.

API path: `/api/uuid-generator/v7`



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
| `count` | `number` |  |
| `maxPerCall` | `number` |  |
| `uuids` | `any[]` |  |
| `version` | `string` |  |

#### Example: Load

```ts
const guid = await client.Guid().load({ id: 1 })
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
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` |  |
| `maxPerCall` | `number` |  |
| `uuids` | `any[]` |  |
| `version` | `string` |  |

#### Example: Load

```ts
const v1n = await client.V1n().load({ count: 1 })
```

#### Example: List

```ts
const v1ns = await client.V1n().list()
```


### V3n

Create an instance: `const v3n = client.V3n()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` |  |
| `maxPerCall` | `number` |  |
| `uuids` | `any[]` |  |
| `version` | `string` |  |

#### Example: Load

```ts
const v3n = await client.V3n().load({ count: 1 })
```

#### Example: List

```ts
const v3ns = await client.V3n().list()
```


### V4n

Create an instance: `const v4n = client.V4n()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` |  |
| `maxPerCall` | `number` |  |
| `uuids` | `any[]` |  |
| `version` | `string` |  |

#### Example: Load

```ts
const v4n = await client.V4n().load({ count: 1 })
```

#### Example: List

```ts
const v4ns = await client.V4n().list()
```


### V5n

Create an instance: `const v5n = client.V5n()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` |  |
| `maxPerCall` | `number` |  |
| `uuids` | `any[]` |  |
| `version` | `string` |  |

#### Example: Load

```ts
const v5n = await client.V5n().load({ count: 1 })
```

#### Example: List

```ts
const v5ns = await client.V5n().list()
```


### V6n

Create an instance: `const v6n = client.V6n()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` |  |
| `maxPerCall` | `number` |  |
| `uuids` | `any[]` |  |
| `version` | `string` |  |

#### Example: Load

```ts
const v6n = await client.V6n().load({ count: 1 })
```

#### Example: List

```ts
const v6ns = await client.V6n().list()
```


### V7n

Create an instance: `const v7n = client.V7n()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` |  |
| `maxPerCall` | `number` |  |
| `uuids` | `any[]` |  |
| `version` | `string` |  |

#### Example: Load

```ts
const v7n = await client.V7n().load({ count: 1 })
```

#### Example: List

```ts
const v7ns = await client.V7n().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
uuid-generator-api2/
├── src/
│   ├── UuidGeneratorApi2SDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { UuidGeneratorApi2SDK } from '@voxgig-sdk/uuid-generator-api2'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const v1n = client.V1n()
await v1n.list()

// v1n.data() now returns the v1n data from the last `list`
// v1n.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
