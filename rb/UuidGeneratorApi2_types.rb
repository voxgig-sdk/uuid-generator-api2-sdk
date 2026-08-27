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
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] maxPerCall
#   @return [Integer]
#
# @!attribute [rw] uuids
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
Guid = Struct.new(
  :count,
  :id,
  :maxPerCall,
  :uuids,
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

# Request payload for Guid#list.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] maxPerCall
#   @return [Integer, nil]
#
# @!attribute [rw] uuids
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
GuidListMatch = Struct.new(
  :count,
  :id,
  :maxPerCall,
  :uuids,
  :version,
  keyword_init: true
)

# V1n entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] maxPerCall
#   @return [Integer]
#
# @!attribute [rw] uuids
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V1n = Struct.new(
  :count,
  :maxPerCall,
  :uuids,
  :version,
  keyword_init: true
)

# Request payload for V1n#load.
#
# @!attribute [rw] count
#   @return [Integer]
V1nLoadMatch = Struct.new(
  :count,
  keyword_init: true
)

# Request payload for V1n#list.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] maxPerCall
#   @return [Integer, nil]
#
# @!attribute [rw] uuids
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
V1nListMatch = Struct.new(
  :count,
  :maxPerCall,
  :uuids,
  :version,
  keyword_init: true
)

# V3n entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] maxPerCall
#   @return [Integer]
#
# @!attribute [rw] uuids
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V3n = Struct.new(
  :count,
  :maxPerCall,
  :uuids,
  :version,
  keyword_init: true
)

# Request payload for V3n#load.
#
# @!attribute [rw] count
#   @return [Integer]
V3nLoadMatch = Struct.new(
  :count,
  keyword_init: true
)

# Request payload for V3n#list.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] maxPerCall
#   @return [Integer, nil]
#
# @!attribute [rw] uuids
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
V3nListMatch = Struct.new(
  :count,
  :maxPerCall,
  :uuids,
  :version,
  keyword_init: true
)

# V4n entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] maxPerCall
#   @return [Integer]
#
# @!attribute [rw] uuids
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V4n = Struct.new(
  :count,
  :maxPerCall,
  :uuids,
  :version,
  keyword_init: true
)

# Request payload for V4n#load.
#
# @!attribute [rw] count
#   @return [Integer]
V4nLoadMatch = Struct.new(
  :count,
  keyword_init: true
)

# Request payload for V4n#list.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] maxPerCall
#   @return [Integer, nil]
#
# @!attribute [rw] uuids
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
V4nListMatch = Struct.new(
  :count,
  :maxPerCall,
  :uuids,
  :version,
  keyword_init: true
)

# V5n entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] maxPerCall
#   @return [Integer]
#
# @!attribute [rw] uuids
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V5n = Struct.new(
  :count,
  :maxPerCall,
  :uuids,
  :version,
  keyword_init: true
)

# Request payload for V5n#load.
#
# @!attribute [rw] count
#   @return [Integer]
V5nLoadMatch = Struct.new(
  :count,
  keyword_init: true
)

# Request payload for V5n#list.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] maxPerCall
#   @return [Integer, nil]
#
# @!attribute [rw] uuids
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
V5nListMatch = Struct.new(
  :count,
  :maxPerCall,
  :uuids,
  :version,
  keyword_init: true
)

# V6n entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] maxPerCall
#   @return [Integer]
#
# @!attribute [rw] uuids
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V6n = Struct.new(
  :count,
  :maxPerCall,
  :uuids,
  :version,
  keyword_init: true
)

# Request payload for V6n#load.
#
# @!attribute [rw] count
#   @return [Integer]
V6nLoadMatch = Struct.new(
  :count,
  keyword_init: true
)

# Request payload for V6n#list.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] maxPerCall
#   @return [Integer, nil]
#
# @!attribute [rw] uuids
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
V6nListMatch = Struct.new(
  :count,
  :maxPerCall,
  :uuids,
  :version,
  keyword_init: true
)

# V7n entity data model.
#
# @!attribute [rw] count
#   @return [Integer]
#
# @!attribute [rw] maxPerCall
#   @return [Integer]
#
# @!attribute [rw] uuids
#   @return [Array]
#
# @!attribute [rw] version
#   @return [String]
V7n = Struct.new(
  :count,
  :maxPerCall,
  :uuids,
  :version,
  keyword_init: true
)

# Request payload for V7n#load.
#
# @!attribute [rw] count
#   @return [Integer]
V7nLoadMatch = Struct.new(
  :count,
  keyword_init: true
)

# Request payload for V7n#list.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] maxPerCall
#   @return [Integer, nil]
#
# @!attribute [rw] uuids
#   @return [Array, nil]
#
# @!attribute [rw] version
#   @return [String, nil]
V7nListMatch = Struct.new(
  :count,
  :maxPerCall,
  :uuids,
  :version,
  keyword_init: true
)

