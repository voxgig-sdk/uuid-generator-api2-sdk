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
    public ?string $id = null;
    public int $maxPerCall;
    public array $uuids;
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
    public ?string $id = null;
    public ?int $maxPerCall = null;
    public ?array $uuids = null;
    public ?string $version = null;
}

/** V1n entity data model. */
class V1n
{
    public int $count;
    public int $maxPerCall;
    public array $uuids;
    public string $version;
}

/** Request payload for V1n#load. */
class V1nLoadMatch
{
    public int $count;
}

/** Request payload for V1n#list. */
class V1nListMatch
{
    public ?int $count = null;
    public ?int $maxPerCall = null;
    public ?array $uuids = null;
    public ?string $version = null;
}

/** V3n entity data model. */
class V3n
{
    public int $count;
    public int $maxPerCall;
    public array $uuids;
    public string $version;
}

/** Request payload for V3n#load. */
class V3nLoadMatch
{
    public int $count;
}

/** Request payload for V3n#list. */
class V3nListMatch
{
    public ?int $count = null;
    public ?int $maxPerCall = null;
    public ?array $uuids = null;
    public ?string $version = null;
}

/** V4n entity data model. */
class V4n
{
    public int $count;
    public int $maxPerCall;
    public array $uuids;
    public string $version;
}

/** Request payload for V4n#load. */
class V4nLoadMatch
{
    public int $count;
}

/** Request payload for V4n#list. */
class V4nListMatch
{
    public ?int $count = null;
    public ?int $maxPerCall = null;
    public ?array $uuids = null;
    public ?string $version = null;
}

/** V5n entity data model. */
class V5n
{
    public int $count;
    public int $maxPerCall;
    public array $uuids;
    public string $version;
}

/** Request payload for V5n#load. */
class V5nLoadMatch
{
    public int $count;
}

/** Request payload for V5n#list. */
class V5nListMatch
{
    public ?int $count = null;
    public ?int $maxPerCall = null;
    public ?array $uuids = null;
    public ?string $version = null;
}

/** V6n entity data model. */
class V6n
{
    public int $count;
    public int $maxPerCall;
    public array $uuids;
    public string $version;
}

/** Request payload for V6n#load. */
class V6nLoadMatch
{
    public int $count;
}

/** Request payload for V6n#list. */
class V6nListMatch
{
    public ?int $count = null;
    public ?int $maxPerCall = null;
    public ?array $uuids = null;
    public ?string $version = null;
}

/** V7n entity data model. */
class V7n
{
    public int $count;
    public int $maxPerCall;
    public array $uuids;
    public string $version;
}

/** Request payload for V7n#load. */
class V7nLoadMatch
{
    public int $count;
}

/** Request payload for V7n#list. */
class V7nListMatch
{
    public ?int $count = null;
    public ?int $maxPerCall = null;
    public ?array $uuids = null;
    public ?string $version = null;
}

