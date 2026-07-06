<?php
declare(strict_types=1);

// Typed models for the UuidGeneratorApi2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Guid entity data model. */
class Guid
{
    public int $count;
    public int $max_per_call;
    public array $uuid;
    public string $version;
}

/** Request payload for Guid#load. */
class GuidLoadMatch
{
    public int $id;
}

/** Request payload for Guid#list. */
class GuidListMatch
{
    public ?int $count = null;
    public ?int $max_per_call = null;
    public ?array $uuid = null;
    public ?string $version = null;
}

/** V1n entity data model. */
class V1n
{
    public int $count;
    public int $max_per_call;
    public array $uuid;
    public string $version;
}

/** Request payload for V1n#list. */
class V1nListMatch
{
    public ?int $count = null;
    public ?int $max_per_call = null;
    public ?array $uuid = null;
    public ?string $version = null;
}

/** V1n2 entity data model. */
class V1n2
{
    public int $count;
    public int $max_per_call;
    public array $uuid;
    public string $version;
}

/** Request payload for V1n2#load. */
class V1n2LoadMatch
{
    public int $count;
}

/** V3n entity data model. */
class V3n
{
    public int $count;
    public int $max_per_call;
    public array $uuid;
    public string $version;
}

/** Request payload for V3n#list. */
class V3nListMatch
{
    public ?int $count = null;
    public ?int $max_per_call = null;
    public ?array $uuid = null;
    public ?string $version = null;
}

/** V3n2 entity data model. */
class V3n2
{
    public int $count;
    public int $max_per_call;
    public array $uuid;
    public string $version;
}

/** Request payload for V3n2#load. */
class V3n2LoadMatch
{
    public int $count;
}

/** V4n entity data model. */
class V4n
{
    public int $count;
    public int $max_per_call;
    public array $uuid;
    public string $version;
}

/** Request payload for V4n#list. */
class V4nListMatch
{
    public ?int $count = null;
    public ?int $max_per_call = null;
    public ?array $uuid = null;
    public ?string $version = null;
}

/** V4n2 entity data model. */
class V4n2
{
    public int $count;
    public int $max_per_call;
    public array $uuid;
    public string $version;
}

/** Request payload for V4n2#load. */
class V4n2LoadMatch
{
    public int $count;
}

/** V5n entity data model. */
class V5n
{
    public int $count;
    public int $max_per_call;
    public array $uuid;
    public string $version;
}

/** Request payload for V5n#list. */
class V5nListMatch
{
    public ?int $count = null;
    public ?int $max_per_call = null;
    public ?array $uuid = null;
    public ?string $version = null;
}

/** V5n2 entity data model. */
class V5n2
{
    public int $count;
    public int $max_per_call;
    public array $uuid;
    public string $version;
}

/** Request payload for V5n2#load. */
class V5n2LoadMatch
{
    public int $count;
}

/** V6n entity data model. */
class V6n
{
    public int $count;
    public int $max_per_call;
    public array $uuid;
    public string $version;
}

/** Request payload for V6n#list. */
class V6nListMatch
{
    public ?int $count = null;
    public ?int $max_per_call = null;
    public ?array $uuid = null;
    public ?string $version = null;
}

/** V6n2 entity data model. */
class V6n2
{
    public int $count;
    public int $max_per_call;
    public array $uuid;
    public string $version;
}

/** Request payload for V6n2#load. */
class V6n2LoadMatch
{
    public int $count;
}

/** V7n entity data model. */
class V7n
{
    public int $count;
    public int $max_per_call;
    public array $uuid;
    public string $version;
}

/** Request payload for V7n#list. */
class V7nListMatch
{
    public ?int $count = null;
    public ?int $max_per_call = null;
    public ?array $uuid = null;
    public ?string $version = null;
}

/** V7n2 entity data model. */
class V7n2
{
    public int $count;
    public int $max_per_call;
    public array $uuid;
    public string $version;
}

/** Request payload for V7n2#load. */
class V7n2LoadMatch
{
    public int $count;
}

