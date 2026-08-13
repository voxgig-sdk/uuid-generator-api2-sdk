// Typed models for the UuidGeneratorApi2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/uuid-generator-api2-sdk/go/core"
)

// Guid is the typed data model for the guid entity.
type Guid struct {
	Count int `json:"count"`
	MaxPerCall int `json:"maxPerCall"`
	Uuids []any `json:"uuids"`
	Version string `json:"version"`
}

// GuidLoadMatch is the typed request payload for Guid.LoadTyped.
type GuidLoadMatch struct {
	Id int `json:"id"`
}

// GuidListMatch is the typed request payload for Guid.ListTyped.
type GuidListMatch struct {
	Count *int `json:"count,omitempty"`
	MaxPerCall *int `json:"maxPerCall,omitempty"`
	Uuids *[]any `json:"uuids,omitempty"`
	Version *string `json:"version,omitempty"`
}

// V1n is the typed data model for the v1n entity.
type V1n struct {
	Count int `json:"count"`
	MaxPerCall int `json:"maxPerCall"`
	Uuids []any `json:"uuids"`
	Version string `json:"version"`
}

// V1nLoadMatch is the typed request payload for V1n.LoadTyped.
type V1nLoadMatch struct {
	Count int `json:"count"`
}

// V1nListMatch is the typed request payload for V1n.ListTyped.
type V1nListMatch struct {
	Count *int `json:"count,omitempty"`
	MaxPerCall *int `json:"maxPerCall,omitempty"`
	Uuids *[]any `json:"uuids,omitempty"`
	Version *string `json:"version,omitempty"`
}

// V3n is the typed data model for the v3n entity.
type V3n struct {
	Count int `json:"count"`
	MaxPerCall int `json:"maxPerCall"`
	Uuids []any `json:"uuids"`
	Version string `json:"version"`
}

// V3nLoadMatch is the typed request payload for V3n.LoadTyped.
type V3nLoadMatch struct {
	Count int `json:"count"`
}

// V3nListMatch is the typed request payload for V3n.ListTyped.
type V3nListMatch struct {
	Count *int `json:"count,omitempty"`
	MaxPerCall *int `json:"maxPerCall,omitempty"`
	Uuids *[]any `json:"uuids,omitempty"`
	Version *string `json:"version,omitempty"`
}

// V4n is the typed data model for the v4n entity.
type V4n struct {
	Count int `json:"count"`
	MaxPerCall int `json:"maxPerCall"`
	Uuids []any `json:"uuids"`
	Version string `json:"version"`
}

// V4nLoadMatch is the typed request payload for V4n.LoadTyped.
type V4nLoadMatch struct {
	Count int `json:"count"`
}

// V4nListMatch is the typed request payload for V4n.ListTyped.
type V4nListMatch struct {
	Count *int `json:"count,omitempty"`
	MaxPerCall *int `json:"maxPerCall,omitempty"`
	Uuids *[]any `json:"uuids,omitempty"`
	Version *string `json:"version,omitempty"`
}

// V5n is the typed data model for the v5n entity.
type V5n struct {
	Count int `json:"count"`
	MaxPerCall int `json:"maxPerCall"`
	Uuids []any `json:"uuids"`
	Version string `json:"version"`
}

// V5nLoadMatch is the typed request payload for V5n.LoadTyped.
type V5nLoadMatch struct {
	Count int `json:"count"`
}

// V5nListMatch is the typed request payload for V5n.ListTyped.
type V5nListMatch struct {
	Count *int `json:"count,omitempty"`
	MaxPerCall *int `json:"maxPerCall,omitempty"`
	Uuids *[]any `json:"uuids,omitempty"`
	Version *string `json:"version,omitempty"`
}

// V6n is the typed data model for the v6n entity.
type V6n struct {
	Count int `json:"count"`
	MaxPerCall int `json:"maxPerCall"`
	Uuids []any `json:"uuids"`
	Version string `json:"version"`
}

// V6nLoadMatch is the typed request payload for V6n.LoadTyped.
type V6nLoadMatch struct {
	Count int `json:"count"`
}

// V6nListMatch is the typed request payload for V6n.ListTyped.
type V6nListMatch struct {
	Count *int `json:"count,omitempty"`
	MaxPerCall *int `json:"maxPerCall,omitempty"`
	Uuids *[]any `json:"uuids,omitempty"`
	Version *string `json:"version,omitempty"`
}

// V7n is the typed data model for the v7n entity.
type V7n struct {
	Count int `json:"count"`
	MaxPerCall int `json:"maxPerCall"`
	Uuids []any `json:"uuids"`
	Version string `json:"version"`
}

// V7nLoadMatch is the typed request payload for V7n.LoadTyped.
type V7nLoadMatch struct {
	Count int `json:"count"`
}

// V7nListMatch is the typed request payload for V7n.ListTyped.
type V7nListMatch struct {
	Count *int `json:"count,omitempty"`
	MaxPerCall *int `json:"maxPerCall,omitempty"`
	Uuids *[]any `json:"uuids,omitempty"`
	Version *string `json:"version,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
