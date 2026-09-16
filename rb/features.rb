# UuidGeneratorApi2 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module UuidGeneratorApi2Features
  def self.make_feature(name)
    case name
    when "base"
      UuidGeneratorApi2BaseFeature.new
    when "ratelimit"
      UuidGeneratorApi2RatelimitFeature.new
    when "retry"
      UuidGeneratorApi2RetryFeature.new
    when "test"
      UuidGeneratorApi2TestFeature.new
    when "timeout"
      UuidGeneratorApi2TimeoutFeature.new
    else
      UuidGeneratorApi2BaseFeature.new
    end
  end
end
