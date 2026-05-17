package voxgiguuidgeneratorapi2sdk

import (
	"github.com/voxgig-sdk/uuid-generator-api2-sdk/go/core"
	"github.com/voxgig-sdk/uuid-generator-api2-sdk/go/entity"
	"github.com/voxgig-sdk/uuid-generator-api2-sdk/go/feature"
	_ "github.com/voxgig-sdk/uuid-generator-api2-sdk/go/utility"
)

// Type aliases preserve external API.
type UuidGeneratorApi2SDK = core.UuidGeneratorApi2SDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type UuidGeneratorApi2Entity = core.UuidGeneratorApi2Entity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type UuidGeneratorApi2Error = core.UuidGeneratorApi2Error

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGuidEntityFunc = func(client *core.UuidGeneratorApi2SDK, entopts map[string]any) core.UuidGeneratorApi2Entity {
		return entity.NewGuidEntity(client, entopts)
	}
	core.NewV1nEntityFunc = func(client *core.UuidGeneratorApi2SDK, entopts map[string]any) core.UuidGeneratorApi2Entity {
		return entity.NewV1nEntity(client, entopts)
	}
	core.NewV1n2EntityFunc = func(client *core.UuidGeneratorApi2SDK, entopts map[string]any) core.UuidGeneratorApi2Entity {
		return entity.NewV1n2Entity(client, entopts)
	}
	core.NewV3nEntityFunc = func(client *core.UuidGeneratorApi2SDK, entopts map[string]any) core.UuidGeneratorApi2Entity {
		return entity.NewV3nEntity(client, entopts)
	}
	core.NewV3n2EntityFunc = func(client *core.UuidGeneratorApi2SDK, entopts map[string]any) core.UuidGeneratorApi2Entity {
		return entity.NewV3n2Entity(client, entopts)
	}
	core.NewV4nEntityFunc = func(client *core.UuidGeneratorApi2SDK, entopts map[string]any) core.UuidGeneratorApi2Entity {
		return entity.NewV4nEntity(client, entopts)
	}
	core.NewV4n2EntityFunc = func(client *core.UuidGeneratorApi2SDK, entopts map[string]any) core.UuidGeneratorApi2Entity {
		return entity.NewV4n2Entity(client, entopts)
	}
	core.NewV5nEntityFunc = func(client *core.UuidGeneratorApi2SDK, entopts map[string]any) core.UuidGeneratorApi2Entity {
		return entity.NewV5nEntity(client, entopts)
	}
	core.NewV5n2EntityFunc = func(client *core.UuidGeneratorApi2SDK, entopts map[string]any) core.UuidGeneratorApi2Entity {
		return entity.NewV5n2Entity(client, entopts)
	}
	core.NewV6nEntityFunc = func(client *core.UuidGeneratorApi2SDK, entopts map[string]any) core.UuidGeneratorApi2Entity {
		return entity.NewV6nEntity(client, entopts)
	}
	core.NewV6n2EntityFunc = func(client *core.UuidGeneratorApi2SDK, entopts map[string]any) core.UuidGeneratorApi2Entity {
		return entity.NewV6n2Entity(client, entopts)
	}
	core.NewV7nEntityFunc = func(client *core.UuidGeneratorApi2SDK, entopts map[string]any) core.UuidGeneratorApi2Entity {
		return entity.NewV7nEntity(client, entopts)
	}
	core.NewV7n2EntityFunc = func(client *core.UuidGeneratorApi2SDK, entopts map[string]any) core.UuidGeneratorApi2Entity {
		return entity.NewV7n2Entity(client, entopts)
	}
}

// Constructor re-exports.
var NewUuidGeneratorApi2SDK = core.NewUuidGeneratorApi2SDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
