# frozen_string_literal: true

# Typed models for the UuidGeneratorApi2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Guid entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] max_per_call
#   @return [Integer]
#
# @!attribute [rw] uuid
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
Guid = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# Request payload for Guid#load.
#
# @!attribute [rw] id
#   @return [Integer]
GuidLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Match filter for Guid#list (any subset of Guid fields).
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] max_per_call
#   @return [Integer, nil]
#
# @!attribute [rw] uuid
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
GuidListMatch = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# V1n entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] max_per_call
#   @return [Integer]
#
# @!attribute [rw] uuid
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V1n = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# Match filter for V1n#list (any subset of V1n fields).
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] max_per_call
#   @return [Integer, nil]
#
# @!attribute [rw] uuid
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
V1nListMatch = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# V1n2 entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] max_per_call
#   @return [Integer]
#
# @!attribute [rw] uuid
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V1n2 = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# Request payload for V1n2#load.
#
# @!attribute [rw] count
#   @return [Integer]
V1n2LoadMatch = Struct.new(
  :count,
  keyword_init: true
)

# V3n entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] max_per_call
#   @return [Integer]
#
# @!attribute [rw] uuid
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V3n = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# Match filter for V3n#list (any subset of V3n fields).
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] max_per_call
#   @return [Integer, nil]
#
# @!attribute [rw] uuid
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
V3nListMatch = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# V3n2 entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] max_per_call
#   @return [Integer]
#
# @!attribute [rw] uuid
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V3n2 = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# Request payload for V3n2#load.
#
# @!attribute [rw] count
#   @return [Integer]
V3n2LoadMatch = Struct.new(
  :count,
  keyword_init: true
)

# V4n entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] max_per_call
#   @return [Integer]
#
# @!attribute [rw] uuid
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V4n = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# Match filter for V4n#list (any subset of V4n fields).
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] max_per_call
#   @return [Integer, nil]
#
# @!attribute [rw] uuid
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
V4nListMatch = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# V4n2 entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] max_per_call
#   @return [Integer]
#
# @!attribute [rw] uuid
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V4n2 = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# Request payload for V4n2#load.
#
# @!attribute [rw] count
#   @return [Integer]
V4n2LoadMatch = Struct.new(
  :count,
  keyword_init: true
)

# V5n entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] max_per_call
#   @return [Integer]
#
# @!attribute [rw] uuid
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V5n = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# Match filter for V5n#list (any subset of V5n fields).
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] max_per_call
#   @return [Integer, nil]
#
# @!attribute [rw] uuid
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
V5nListMatch = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# V5n2 entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] max_per_call
#   @return [Integer]
#
# @!attribute [rw] uuid
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V5n2 = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# Request payload for V5n2#load.
#
# @!attribute [rw] count
#   @return [Integer]
V5n2LoadMatch = Struct.new(
  :count,
  keyword_init: true
)

# V6n entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] max_per_call
#   @return [Integer]
#
# @!attribute [rw] uuid
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V6n = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# Match filter for V6n#list (any subset of V6n fields).
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] max_per_call
#   @return [Integer, nil]
#
# @!attribute [rw] uuid
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
V6nListMatch = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# V6n2 entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] max_per_call
#   @return [Integer]
#
# @!attribute [rw] uuid
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V6n2 = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# Request payload for V6n2#load.
#
# @!attribute [rw] count
#   @return [Integer]
V6n2LoadMatch = Struct.new(
  :count,
  keyword_init: true
)

# V7n entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] max_per_call
#   @return [Integer]
#
# @!attribute [rw] uuid
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V7n = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# Match filter for V7n#list (any subset of V7n fields).
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] max_per_call
#   @return [Integer, nil]
#
# @!attribute [rw] uuid
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
V7nListMatch = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# V7n2 entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] max_per_call
#   @return [Integer]
#
# @!attribute [rw] uuid
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V7n2 = Struct.new(
  :count,
  :max_per_call,
  :uuid,
  :version,
  keyword_init: true
)

# Request payload for V7n2#load.
#
# @!attribute [rw] count
#   @return [Integer]
V7n2LoadMatch = Struct.new(
  :count,
  keyword_init: true
)

