-- Typed models for the UuidGeneratorApi2 SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Guid
---@field count number
---@field id? string
---@field maxPerCall number
---@field uuids table
---@field version string

---@class GuidLoadMatch
---@field id number
---@field format? string

---@class GuidListMatch
---@field count? number
---@field format? string

---@class V1n
---@field count number
---@field maxPerCall number
---@field uuids table
---@field version string

---@class V1nLoadMatch
---@field count number
---@field format? string

---@class V1nListMatch
---@field count? number
---@field format? string

---@class V3n
---@field count number
---@field maxPerCall number
---@field uuids table
---@field version string

---@class V3nLoadMatch
---@field count number
---@field format? string
---@field name? string
---@field namespace? string

---@class V3nListMatch
---@field count? number
---@field format? string
---@field name? string
---@field namespace? string

---@class V4n
---@field count number
---@field maxPerCall number
---@field uuids table
---@field version string

---@class V4nLoadMatch
---@field count number
---@field format? string

---@class V4nListMatch
---@field count? number
---@field format? string

---@class V5n
---@field count number
---@field maxPerCall number
---@field uuids table
---@field version string

---@class V5nLoadMatch
---@field count number
---@field format? string
---@field name? string
---@field namespace? string

---@class V5nListMatch
---@field count? number
---@field format? string
---@field name? string
---@field namespace? string

---@class V6n
---@field count number
---@field maxPerCall number
---@field uuids table
---@field version string

---@class V6nLoadMatch
---@field count number
---@field format? string

---@class V6nListMatch
---@field count? number
---@field format? string

---@class V7n
---@field count number
---@field maxPerCall number
---@field uuids table
---@field version string

---@class V7nLoadMatch
---@field count number
---@field format? string

---@class V7nListMatch
---@field count? number
---@field format? string

local M = {}

return M
