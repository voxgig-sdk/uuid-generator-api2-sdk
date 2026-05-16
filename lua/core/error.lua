-- UuidGeneratorApi2 SDK error

local UuidGeneratorApi2Error = {}
UuidGeneratorApi2Error.__index = UuidGeneratorApi2Error


function UuidGeneratorApi2Error.new(code, msg, ctx)
  local self = setmetatable({}, UuidGeneratorApi2Error)
  self.is_sdk_error = true
  self.sdk = "UuidGeneratorApi2"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function UuidGeneratorApi2Error:error()
  return self.msg
end


function UuidGeneratorApi2Error:__tostring()
  return self.msg
end


return UuidGeneratorApi2Error
