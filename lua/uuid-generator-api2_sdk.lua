-- UuidGeneratorApi2 SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local UuidGeneratorApi2SDK = {}
UuidGeneratorApi2SDK.__index = UuidGeneratorApi2SDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

UuidGeneratorApi2SDK._make_feature = _make_feature


function UuidGeneratorApi2SDK.new(options)
  local self = setmetatable({}, UuidGeneratorApi2SDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function UuidGeneratorApi2SDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function UuidGeneratorApi2SDK:get_utility()
  return Utility.copy(self._utility)
end


function UuidGeneratorApi2SDK:get_root_ctx()
  return self._rootctx
end


function UuidGeneratorApi2SDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function UuidGeneratorApi2SDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:guid():list() / client:guid():load({ id = ... })
function UuidGeneratorApi2SDK:guid(data)
  local EntityMod = require("entity.guid_entity")
  if data == nil then
    if self._guid == nil then
      self._guid = EntityMod.new(self, nil)
    end
    return self._guid
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:guid() instead.
function UuidGeneratorApi2SDK:Guid(data)
  local EntityMod = require("entity.guid_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:v1n():list() / client:v1n():load({ id = ... })
function UuidGeneratorApi2SDK:v1n(data)
  local EntityMod = require("entity.v1n_entity")
  if data == nil then
    if self._v1n == nil then
      self._v1n = EntityMod.new(self, nil)
    end
    return self._v1n
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:v1n() instead.
function UuidGeneratorApi2SDK:V1n(data)
  local EntityMod = require("entity.v1n_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:v1n2():list() / client:v1n2():load({ id = ... })
function UuidGeneratorApi2SDK:v1n2(data)
  local EntityMod = require("entity.v1n2_entity")
  if data == nil then
    if self._v1n2 == nil then
      self._v1n2 = EntityMod.new(self, nil)
    end
    return self._v1n2
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:v1n2() instead.
function UuidGeneratorApi2SDK:V1n2(data)
  local EntityMod = require("entity.v1n2_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:v3n():list() / client:v3n():load({ id = ... })
function UuidGeneratorApi2SDK:v3n(data)
  local EntityMod = require("entity.v3n_entity")
  if data == nil then
    if self._v3n == nil then
      self._v3n = EntityMod.new(self, nil)
    end
    return self._v3n
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:v3n() instead.
function UuidGeneratorApi2SDK:V3n(data)
  local EntityMod = require("entity.v3n_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:v3n2():list() / client:v3n2():load({ id = ... })
function UuidGeneratorApi2SDK:v3n2(data)
  local EntityMod = require("entity.v3n2_entity")
  if data == nil then
    if self._v3n2 == nil then
      self._v3n2 = EntityMod.new(self, nil)
    end
    return self._v3n2
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:v3n2() instead.
function UuidGeneratorApi2SDK:V3n2(data)
  local EntityMod = require("entity.v3n2_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:v4n():list() / client:v4n():load({ id = ... })
function UuidGeneratorApi2SDK:v4n(data)
  local EntityMod = require("entity.v4n_entity")
  if data == nil then
    if self._v4n == nil then
      self._v4n = EntityMod.new(self, nil)
    end
    return self._v4n
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:v4n() instead.
function UuidGeneratorApi2SDK:V4n(data)
  local EntityMod = require("entity.v4n_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:v4n2():list() / client:v4n2():load({ id = ... })
function UuidGeneratorApi2SDK:v4n2(data)
  local EntityMod = require("entity.v4n2_entity")
  if data == nil then
    if self._v4n2 == nil then
      self._v4n2 = EntityMod.new(self, nil)
    end
    return self._v4n2
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:v4n2() instead.
function UuidGeneratorApi2SDK:V4n2(data)
  local EntityMod = require("entity.v4n2_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:v5n():list() / client:v5n():load({ id = ... })
function UuidGeneratorApi2SDK:v5n(data)
  local EntityMod = require("entity.v5n_entity")
  if data == nil then
    if self._v5n == nil then
      self._v5n = EntityMod.new(self, nil)
    end
    return self._v5n
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:v5n() instead.
function UuidGeneratorApi2SDK:V5n(data)
  local EntityMod = require("entity.v5n_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:v5n2():list() / client:v5n2():load({ id = ... })
function UuidGeneratorApi2SDK:v5n2(data)
  local EntityMod = require("entity.v5n2_entity")
  if data == nil then
    if self._v5n2 == nil then
      self._v5n2 = EntityMod.new(self, nil)
    end
    return self._v5n2
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:v5n2() instead.
function UuidGeneratorApi2SDK:V5n2(data)
  local EntityMod = require("entity.v5n2_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:v6n():list() / client:v6n():load({ id = ... })
function UuidGeneratorApi2SDK:v6n(data)
  local EntityMod = require("entity.v6n_entity")
  if data == nil then
    if self._v6n == nil then
      self._v6n = EntityMod.new(self, nil)
    end
    return self._v6n
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:v6n() instead.
function UuidGeneratorApi2SDK:V6n(data)
  local EntityMod = require("entity.v6n_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:v6n2():list() / client:v6n2():load({ id = ... })
function UuidGeneratorApi2SDK:v6n2(data)
  local EntityMod = require("entity.v6n2_entity")
  if data == nil then
    if self._v6n2 == nil then
      self._v6n2 = EntityMod.new(self, nil)
    end
    return self._v6n2
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:v6n2() instead.
function UuidGeneratorApi2SDK:V6n2(data)
  local EntityMod = require("entity.v6n2_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:v7n():list() / client:v7n():load({ id = ... })
function UuidGeneratorApi2SDK:v7n(data)
  local EntityMod = require("entity.v7n_entity")
  if data == nil then
    if self._v7n == nil then
      self._v7n = EntityMod.new(self, nil)
    end
    return self._v7n
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:v7n() instead.
function UuidGeneratorApi2SDK:V7n(data)
  local EntityMod = require("entity.v7n_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:v7n2():list() / client:v7n2():load({ id = ... })
function UuidGeneratorApi2SDK:v7n2(data)
  local EntityMod = require("entity.v7n2_entity")
  if data == nil then
    if self._v7n2 == nil then
      self._v7n2 = EntityMod.new(self, nil)
    end
    return self._v7n2
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:v7n2() instead.
function UuidGeneratorApi2SDK:V7n2(data)
  local EntityMod = require("entity.v7n2_entity")
  return EntityMod.new(self, data)
end




function UuidGeneratorApi2SDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = UuidGeneratorApi2SDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return UuidGeneratorApi2SDK
