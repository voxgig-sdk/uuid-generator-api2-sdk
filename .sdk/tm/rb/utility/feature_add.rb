# UuidGeneratorApi2 SDK utility: feature_add
module UuidGeneratorApi2Utilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
