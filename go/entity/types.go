// Typed models for the UuidGeneratorApi2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Guid is the typed data model for the guid entity.
type Guid struct {
	Count int `json:"count"`
	MaxPerCall int `json:"max_per_call"`
	Uuid []any `json:"uuid"`
	Version string `json:"version"`
}

// GuidLoadMatch is the typed request payload for Guid.LoadTyped.
type GuidLoadMatch struct {
	Id int `json:"id"`
}

// GuidListMatch mirrors the guid fields as an all-optional match
// filter (Go analog of Partial<Guid>).
type GuidListMatch struct {
	Count *int `json:"count,omitempty"`
	MaxPerCall *int `json:"max_per_call,omitempty"`
	Uuid *[]any `json:"uuid,omitempty"`
	Version *string `json:"version,omitempty"`
}

// V1n is the typed data model for the v1n entity.
type V1n struct {
	Count int `json:"count"`
	MaxPerCall int `json:"max_per_call"`
	Uuid []any `json:"uuid"`
	Version string `json:"version"`
}

// V1nListMatch mirrors the v1n fields as an all-optional match
// filter (Go analog of Partial<V1n>).
type V1nListMatch struct {
	Count *int `json:"count,omitempty"`
	MaxPerCall *int `json:"max_per_call,omitempty"`
	Uuid *[]any `json:"uuid,omitempty"`
	Version *string `json:"version,omitempty"`
}

// V1n2 is the typed data model for the v1n2 entity.
type V1n2 struct {
	Count int `json:"count"`
	MaxPerCall int `json:"max_per_call"`
	Uuid []any `json:"uuid"`
	Version string `json:"version"`
}

// V1n2LoadMatch is the typed request payload for V1n2.LoadTyped.
type V1n2LoadMatch struct {
	Count int `json:"count"`
}

// V3n is the typed data model for the v3n entity.
type V3n struct {
	Count int `json:"count"`
	MaxPerCall int `json:"max_per_call"`
	Uuid []any `json:"uuid"`
	Version string `json:"version"`
}

// V3nListMatch mirrors the v3n fields as an all-optional match
// filter (Go analog of Partial<V3n>).
type V3nListMatch struct {
	Count *int `json:"count,omitempty"`
	MaxPerCall *int `json:"max_per_call,omitempty"`
	Uuid *[]any `json:"uuid,omitempty"`
	Version *string `json:"version,omitempty"`
}

// V3n2 is the typed data model for the v3n2 entity.
type V3n2 struct {
	Count int `json:"count"`
	MaxPerCall int `json:"max_per_call"`
	Uuid []any `json:"uuid"`
	Version string `json:"version"`
}

// V3n2LoadMatch is the typed request payload for V3n2.LoadTyped.
type V3n2LoadMatch struct {
	Count int `json:"count"`
}

// V4n is the typed data model for the v4n entity.
type V4n struct {
	Count int `json:"count"`
	MaxPerCall int `json:"max_per_call"`
	Uuid []any `json:"uuid"`
	Version string `json:"version"`
}

// V4nListMatch mirrors the v4n fields as an all-optional match
// filter (Go analog of Partial<V4n>).
type V4nListMatch struct {
	Count *int `json:"count,omitempty"`
	MaxPerCall *int `json:"max_per_call,omitempty"`
	Uuid *[]any `json:"uuid,omitempty"`
	Version *string `json:"version,omitempty"`
}

// V4n2 is the typed data model for the v4n2 entity.
type V4n2 struct {
	Count int `json:"count"`
	MaxPerCall int `json:"max_per_call"`
	Uuid []any `json:"uuid"`
	Version string `json:"version"`
}

// V4n2LoadMatch is the typed request payload for V4n2.LoadTyped.
type V4n2LoadMatch struct {
	Count int `json:"count"`
}

// V5n is the typed data model for the v5n entity.
type V5n struct {
	Count int `json:"count"`
	MaxPerCall int `json:"max_per_call"`
	Uuid []any `json:"uuid"`
	Version string `json:"version"`
}

// V5nListMatch mirrors the v5n fields as an all-optional match
// filter (Go analog of Partial<V5n>).
type V5nListMatch struct {
	Count *int `json:"count,omitempty"`
	MaxPerCall *int `json:"max_per_call,omitempty"`
	Uuid *[]any `json:"uuid,omitempty"`
	Version *string `json:"version,omitempty"`
}

// V5n2 is the typed data model for the v5n2 entity.
type V5n2 struct {
	Count int `json:"count"`
	MaxPerCall int `json:"max_per_call"`
	Uuid []any `json:"uuid"`
	Version string `json:"version"`
}

// V5n2LoadMatch is the typed request payload for V5n2.LoadTyped.
type V5n2LoadMatch struct {
	Count int `json:"count"`
}

// V6n is the typed data model for the v6n entity.
type V6n struct {
	Count int `json:"count"`
	MaxPerCall int `json:"max_per_call"`
	Uuid []any `json:"uuid"`
	Version string `json:"version"`
}

// V6nListMatch mirrors the v6n fields as an all-optional match
// filter (Go analog of Partial<V6n>).
type V6nListMatch struct {
	Count *int `json:"count,omitempty"`
	MaxPerCall *int `json:"max_per_call,omitempty"`
	Uuid *[]any `json:"uuid,omitempty"`
	Version *string `json:"version,omitempty"`
}

// V6n2 is the typed data model for the v6n2 entity.
type V6n2 struct {
	Count int `json:"count"`
	MaxPerCall int `json:"max_per_call"`
	Uuid []any `json:"uuid"`
	Version string `json:"version"`
}

// V6n2LoadMatch is the typed request payload for V6n2.LoadTyped.
type V6n2LoadMatch struct {
	Count int `json:"count"`
}

// V7n is the typed data model for the v7n entity.
type V7n struct {
	Count int `json:"count"`
	MaxPerCall int `json:"max_per_call"`
	Uuid []any `json:"uuid"`
	Version string `json:"version"`
}

// V7nListMatch mirrors the v7n fields as an all-optional match
// filter (Go analog of Partial<V7n>).
type V7nListMatch struct {
	Count *int `json:"count,omitempty"`
	MaxPerCall *int `json:"max_per_call,omitempty"`
	Uuid *[]any `json:"uuid,omitempty"`
	Version *string `json:"version,omitempty"`
}

// V7n2 is the typed data model for the v7n2 entity.
type V7n2 struct {
	Count int `json:"count"`
	MaxPerCall int `json:"max_per_call"`
	Uuid []any `json:"uuid"`
	Version string `json:"version"`
}

// V7n2LoadMatch is the typed request payload for V7n2.LoadTyped.
type V7n2LoadMatch struct {
	Count int `json:"count"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
