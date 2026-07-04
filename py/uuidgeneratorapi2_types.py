# Typed models for the UuidGeneratorApi2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Guid:
    count: int
    max_per_call: int
    uuid: list
    version: str


@dataclass
class GuidLoadMatch:
    id: int


@dataclass
class GuidListMatch:
    count: Optional[int] = None
    max_per_call: Optional[int] = None
    uuid: Optional[list] = None
    version: Optional[str] = None


@dataclass
class V1n:
    count: int
    max_per_call: int
    uuid: list
    version: str


@dataclass
class V1nListMatch:
    count: Optional[int] = None
    max_per_call: Optional[int] = None
    uuid: Optional[list] = None
    version: Optional[str] = None


@dataclass
class V1n2:
    count: int
    max_per_call: int
    uuid: list
    version: str


@dataclass
class V1n2LoadMatch:
    count: int


@dataclass
class V3n:
    count: int
    max_per_call: int
    uuid: list
    version: str


@dataclass
class V3nListMatch:
    count: Optional[int] = None
    max_per_call: Optional[int] = None
    uuid: Optional[list] = None
    version: Optional[str] = None


@dataclass
class V3n2:
    count: int
    max_per_call: int
    uuid: list
    version: str


@dataclass
class V3n2LoadMatch:
    count: int


@dataclass
class V4n:
    count: int
    max_per_call: int
    uuid: list
    version: str


@dataclass
class V4nListMatch:
    count: Optional[int] = None
    max_per_call: Optional[int] = None
    uuid: Optional[list] = None
    version: Optional[str] = None


@dataclass
class V4n2:
    count: int
    max_per_call: int
    uuid: list
    version: str


@dataclass
class V4n2LoadMatch:
    count: int


@dataclass
class V5n:
    count: int
    max_per_call: int
    uuid: list
    version: str


@dataclass
class V5nListMatch:
    count: Optional[int] = None
    max_per_call: Optional[int] = None
    uuid: Optional[list] = None
    version: Optional[str] = None


@dataclass
class V5n2:
    count: int
    max_per_call: int
    uuid: list
    version: str


@dataclass
class V5n2LoadMatch:
    count: int


@dataclass
class V6n:
    count: int
    max_per_call: int
    uuid: list
    version: str


@dataclass
class V6nListMatch:
    count: Optional[int] = None
    max_per_call: Optional[int] = None
    uuid: Optional[list] = None
    version: Optional[str] = None


@dataclass
class V6n2:
    count: int
    max_per_call: int
    uuid: list
    version: str


@dataclass
class V6n2LoadMatch:
    count: int


@dataclass
class V7n:
    count: int
    max_per_call: int
    uuid: list
    version: str


@dataclass
class V7nListMatch:
    count: Optional[int] = None
    max_per_call: Optional[int] = None
    uuid: Optional[list] = None
    version: Optional[str] = None


@dataclass
class V7n2:
    count: int
    max_per_call: int
    uuid: list
    version: str


@dataclass
class V7n2LoadMatch:
    count: int

