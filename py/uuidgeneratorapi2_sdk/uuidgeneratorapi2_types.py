# Typed models for the UuidGeneratorApi2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class GuidRequired(TypedDict):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class Guid(GuidRequired, total=False):
    id: str


class GuidLoadMatchRequired(TypedDict):
    id: int


class GuidLoadMatch(GuidLoadMatchRequired, total=False):
    format: str


class GuidListMatch(TypedDict, total=False):
    count: int
    format: str


class V1n(TypedDict):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V1nLoadMatchRequired(TypedDict):
    count: int


class V1nLoadMatch(V1nLoadMatchRequired, total=False):
    format: str


class V1nListMatch(TypedDict, total=False):
    count: int
    format: str


class V3n(TypedDict):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V3nLoadMatchRequired(TypedDict):
    count: int


class V3nLoadMatch(V3nLoadMatchRequired, total=False):
    format: str
    name: str
    namespace: str


class V3nListMatch(TypedDict, total=False):
    count: int
    format: str
    name: str
    namespace: str


class V4n(TypedDict):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V4nLoadMatchRequired(TypedDict):
    count: int


class V4nLoadMatch(V4nLoadMatchRequired, total=False):
    format: str


class V4nListMatch(TypedDict, total=False):
    count: int
    format: str


class V5n(TypedDict):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V5nLoadMatchRequired(TypedDict):
    count: int


class V5nLoadMatch(V5nLoadMatchRequired, total=False):
    format: str
    name: str
    namespace: str


class V5nListMatch(TypedDict, total=False):
    count: int
    format: str
    name: str
    namespace: str


class V6n(TypedDict):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V6nLoadMatchRequired(TypedDict):
    count: int


class V6nLoadMatch(V6nLoadMatchRequired, total=False):
    format: str


class V6nListMatch(TypedDict, total=False):
    count: int
    format: str


class V7n(TypedDict):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V7nLoadMatchRequired(TypedDict):
    count: int


class V7nLoadMatch(V7nLoadMatchRequired, total=False):
    format: str


class V7nListMatch(TypedDict, total=False):
    count: int
    format: str
