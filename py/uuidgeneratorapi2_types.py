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
    max_per_call: int
    uuid: list
    version: str


class GuidLoadMatch(TypedDict):
    id: int


class GuidListMatch(TypedDict, total=False):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V1n(TypedDict):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V1nListMatch(TypedDict, total=False):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V1n2(TypedDict):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V1n2LoadMatch(TypedDict):
    count: int


class V3n(TypedDict):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V3nListMatch(TypedDict, total=False):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V3n2(TypedDict):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V3n2LoadMatch(TypedDict):
    count: int


class V4n(TypedDict):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V4nListMatch(TypedDict, total=False):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V4n2(TypedDict):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V4n2LoadMatch(TypedDict):
    count: int


class V5n(TypedDict):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V5nListMatch(TypedDict, total=False):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V5n2(TypedDict):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V5n2LoadMatch(TypedDict):
    count: int


class V6n(TypedDict):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V6nListMatch(TypedDict, total=False):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V6n2(TypedDict):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V6n2LoadMatch(TypedDict):
    count: int


class V7n(TypedDict):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V7nListMatch(TypedDict, total=False):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V7n2(TypedDict):
    count: int
    max_per_call: int
    uuid: list
    version: str


class V7n2LoadMatch(TypedDict):
    count: int
