# UuidGeneratorApi2 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module UuidGeneratorApi2Features
  def self.make_feature(name)
    case name
    when "base"
      UuidGeneratorApi2BaseFeature.new
    when "test"
      UuidGeneratorApi2TestFeature.new
    else
      UuidGeneratorApi2BaseFeature.new
    end
  end
end
