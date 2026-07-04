# UuidGeneratorApi2 SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'UuidGeneratorApi2_types'


class UuidGeneratorApi2SDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = UuidGeneratorApi2Utility.new
    @_utility = utility

    config = UuidGeneratorApi2Config.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = UuidGeneratorApi2Helpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = UuidGeneratorApi2Helpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, UuidGeneratorApi2Features.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    UuidGeneratorApi2Utility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = UuidGeneratorApi2Helpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = UuidGeneratorApi2Helpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = UuidGeneratorApi2Helpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = UuidGeneratorApi2Spec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue UuidGeneratorApi2Error => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = UuidGeneratorApi2Helpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = UuidGeneratorApi2Helpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.guid.list / client.guid.load({ "id" => ... })
  def guid
    require_relative 'entity/guid_entity'
    @guid ||= GuidEntity.new(self, nil)
  end

  # Deprecated: use client.guid instead.
  def Guid(data = nil)
    require_relative 'entity/guid_entity'
    GuidEntity.new(self, data)
  end


  # Idiomatic facade: client.v1n.list / client.v1n.load({ "id" => ... })
  def v1n
    require_relative 'entity/v1n_entity'
    @v1n ||= V1nEntity.new(self, nil)
  end

  # Deprecated: use client.v1n instead.
  def V1n(data = nil)
    require_relative 'entity/v1n_entity'
    V1nEntity.new(self, data)
  end


  # Idiomatic facade: client.v1n2.list / client.v1n2.load({ "id" => ... })
  def v1n2
    require_relative 'entity/v1n2_entity'
    @v1n2 ||= V1n2Entity.new(self, nil)
  end

  # Deprecated: use client.v1n2 instead.
  def V1n2(data = nil)
    require_relative 'entity/v1n2_entity'
    V1n2Entity.new(self, data)
  end


  # Idiomatic facade: client.v3n.list / client.v3n.load({ "id" => ... })
  def v3n
    require_relative 'entity/v3n_entity'
    @v3n ||= V3nEntity.new(self, nil)
  end

  # Deprecated: use client.v3n instead.
  def V3n(data = nil)
    require_relative 'entity/v3n_entity'
    V3nEntity.new(self, data)
  end


  # Idiomatic facade: client.v3n2.list / client.v3n2.load({ "id" => ... })
  def v3n2
    require_relative 'entity/v3n2_entity'
    @v3n2 ||= V3n2Entity.new(self, nil)
  end

  # Deprecated: use client.v3n2 instead.
  def V3n2(data = nil)
    require_relative 'entity/v3n2_entity'
    V3n2Entity.new(self, data)
  end


  # Idiomatic facade: client.v4n.list / client.v4n.load({ "id" => ... })
  def v4n
    require_relative 'entity/v4n_entity'
    @v4n ||= V4nEntity.new(self, nil)
  end

  # Deprecated: use client.v4n instead.
  def V4n(data = nil)
    require_relative 'entity/v4n_entity'
    V4nEntity.new(self, data)
  end


  # Idiomatic facade: client.v4n2.list / client.v4n2.load({ "id" => ... })
  def v4n2
    require_relative 'entity/v4n2_entity'
    @v4n2 ||= V4n2Entity.new(self, nil)
  end

  # Deprecated: use client.v4n2 instead.
  def V4n2(data = nil)
    require_relative 'entity/v4n2_entity'
    V4n2Entity.new(self, data)
  end


  # Idiomatic facade: client.v5n.list / client.v5n.load({ "id" => ... })
  def v5n
    require_relative 'entity/v5n_entity'
    @v5n ||= V5nEntity.new(self, nil)
  end

  # Deprecated: use client.v5n instead.
  def V5n(data = nil)
    require_relative 'entity/v5n_entity'
    V5nEntity.new(self, data)
  end


  # Idiomatic facade: client.v5n2.list / client.v5n2.load({ "id" => ... })
  def v5n2
    require_relative 'entity/v5n2_entity'
    @v5n2 ||= V5n2Entity.new(self, nil)
  end

  # Deprecated: use client.v5n2 instead.
  def V5n2(data = nil)
    require_relative 'entity/v5n2_entity'
    V5n2Entity.new(self, data)
  end


  # Idiomatic facade: client.v6n.list / client.v6n.load({ "id" => ... })
  def v6n
    require_relative 'entity/v6n_entity'
    @v6n ||= V6nEntity.new(self, nil)
  end

  # Deprecated: use client.v6n instead.
  def V6n(data = nil)
    require_relative 'entity/v6n_entity'
    V6nEntity.new(self, data)
  end


  # Idiomatic facade: client.v6n2.list / client.v6n2.load({ "id" => ... })
  def v6n2
    require_relative 'entity/v6n2_entity'
    @v6n2 ||= V6n2Entity.new(self, nil)
  end

  # Deprecated: use client.v6n2 instead.
  def V6n2(data = nil)
    require_relative 'entity/v6n2_entity'
    V6n2Entity.new(self, data)
  end


  # Idiomatic facade: client.v7n.list / client.v7n.load({ "id" => ... })
  def v7n
    require_relative 'entity/v7n_entity'
    @v7n ||= V7nEntity.new(self, nil)
  end

  # Deprecated: use client.v7n instead.
  def V7n(data = nil)
    require_relative 'entity/v7n_entity'
    V7nEntity.new(self, data)
  end


  # Idiomatic facade: client.v7n2.list / client.v7n2.load({ "id" => ... })
  def v7n2
    require_relative 'entity/v7n2_entity'
    @v7n2 ||= V7n2Entity.new(self, nil)
  end

  # Deprecated: use client.v7n2 instead.
  def V7n2(data = nil)
    require_relative 'entity/v7n2_entity'
    V7n2Entity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = UuidGeneratorApi2SDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
