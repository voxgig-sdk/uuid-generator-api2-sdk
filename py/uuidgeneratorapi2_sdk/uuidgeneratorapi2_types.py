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


class Guid(TypedDict):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class GuidLoadMatch(TypedDict):
    id: int


class GuidListMatch(TypedDict, total=False):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V1n(TypedDict):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V1nLoadMatch(TypedDict):
    count: int


class V1nListMatch(TypedDict, total=False):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V3n(TypedDict):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V3nLoadMatch(TypedDict):
    count: int


class V3nListMatch(TypedDict, total=False):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V4n(TypedDict):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V4nLoadMatch(TypedDict):
    count: int


class V4nListMatch(TypedDict, total=False):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V5n(TypedDict):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V5nLoadMatch(TypedDict):
    count: int


class V5nListMatch(TypedDict, total=False):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V6n(TypedDict):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V6nLoadMatch(TypedDict):
    count: int


class V6nListMatch(TypedDict, total=False):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V7n(TypedDict):
    count: int
    maxPerCall: int
    uuids: list
    version: str


class V7nLoadMatch(TypedDict):
    count: int


class V7nListMatch(TypedDict, total=False):
    count: int
    maxPerCall: int
    uuids: list
    version: str
