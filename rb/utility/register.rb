# UuidGeneratorApi2 SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

UuidGeneratorApi2Utility.registrar = ->(u) {
  u.clean = UuidGeneratorApi2Utilities::Clean
  u.done = UuidGeneratorApi2Utilities::Done
  u.make_error = UuidGeneratorApi2Utilities::MakeError
  u.feature_add = UuidGeneratorApi2Utilities::FeatureAdd
  u.feature_hook = UuidGeneratorApi2Utilities::FeatureHook
  u.feature_init = UuidGeneratorApi2Utilities::FeatureInit
  u.fetcher = UuidGeneratorApi2Utilities::Fetcher
  u.make_fetch_def = UuidGeneratorApi2Utilities::MakeFetchDef
  u.make_context = UuidGeneratorApi2Utilities::MakeContext
  u.make_options = UuidGeneratorApi2Utilities::MakeOptions
  u.make_request = UuidGeneratorApi2Utilities::MakeRequest
  u.make_response = UuidGeneratorApi2Utilities::MakeResponse
  u.make_result = UuidGeneratorApi2Utilities::MakeResult
  u.make_point = UuidGeneratorApi2Utilities::MakePoint
  u.make_spec = UuidGeneratorApi2Utilities::MakeSpec
  u.make_url = UuidGeneratorApi2Utilities::MakeUrl
  u.param = UuidGeneratorApi2Utilities::Param
  u.prepare_auth = UuidGeneratorApi2Utilities::PrepareAuth
  u.prepare_body = UuidGeneratorApi2Utilities::PrepareBody
  u.prepare_headers = UuidGeneratorApi2Utilities::PrepareHeaders
  u.prepare_method = UuidGeneratorApi2Utilities::PrepareMethod
  u.prepare_params = UuidGeneratorApi2Utilities::PrepareParams
  u.prepare_path = UuidGeneratorApi2Utilities::PreparePath
  u.prepare_query = UuidGeneratorApi2Utilities::PrepareQuery
  u.result_basic = UuidGeneratorApi2Utilities::ResultBasic
  u.result_body = UuidGeneratorApi2Utilities::ResultBody
  u.result_headers = UuidGeneratorApi2Utilities::ResultHeaders
  u.transform_request = UuidGeneratorApi2Utilities::TransformRequest
  u.transform_response = UuidGeneratorApi2Utilities::TransformResponse
}
