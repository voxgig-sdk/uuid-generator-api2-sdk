package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGuidEntityFunc func(client *UuidGeneratorApi2SDK, entopts map[string]any) UuidGeneratorApi2Entity

var NewV1nEntityFunc func(client *UuidGeneratorApi2SDK, entopts map[string]any) UuidGeneratorApi2Entity

var NewV3nEntityFunc func(client *UuidGeneratorApi2SDK, entopts map[string]any) UuidGeneratorApi2Entity

var NewV4nEntityFunc func(client *UuidGeneratorApi2SDK, entopts map[string]any) UuidGeneratorApi2Entity

var NewV5nEntityFunc func(client *UuidGeneratorApi2SDK, entopts map[string]any) UuidGeneratorApi2Entity

var NewV6nEntityFunc func(client *UuidGeneratorApi2SDK, entopts map[string]any) UuidGeneratorApi2Entity

var NewV7nEntityFunc func(client *UuidGeneratorApi2SDK, entopts map[string]any) UuidGeneratorApi2Entity

