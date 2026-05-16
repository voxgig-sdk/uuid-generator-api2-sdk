# UuidGeneratorApi2 SDK utility: make_context
require_relative '../core/context'
module UuidGeneratorApi2Utilities
  MakeContext = ->(ctxmap, basectx) {
    UuidGeneratorApi2Context.new(ctxmap, basectx)
  }
end
