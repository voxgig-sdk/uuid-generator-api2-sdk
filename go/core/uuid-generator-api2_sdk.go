package core

import (
	"fmt"

	vs "github.com/voxgig-sdk/uuid-generator-api2-sdk/go/utility/struct"
)

type UuidGeneratorApi2SDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewUuidGeneratorApi2SDK(options map[string]any) *UuidGeneratorApi2SDK {
	sdk := &UuidGeneratorApi2SDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath([]any{"__derived__", "featureorder"}, sdk.options).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *UuidGeneratorApi2SDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *UuidGeneratorApi2SDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *UuidGeneratorApi2SDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *UuidGeneratorApi2SDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

func (sdk *UuidGeneratorApi2SDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}


// Guid returns a Guid entity bound to this client.
// Idiomatic usage: client.Guid(nil).List(nil, nil) or
// client.Guid(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorApi2SDK) Guid(data map[string]any) UuidGeneratorApi2Entity {
	return NewGuidEntityFunc(sdk, data)
}


// V1n returns a V1n entity bound to this client.
// Idiomatic usage: client.V1n(nil).List(nil, nil) or
// client.V1n(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorApi2SDK) V1n(data map[string]any) UuidGeneratorApi2Entity {
	return NewV1nEntityFunc(sdk, data)
}


// V1n2 returns a V1n2 entity bound to this client.
// Idiomatic usage: client.V1n2(nil).List(nil, nil) or
// client.V1n2(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorApi2SDK) V1n2(data map[string]any) UuidGeneratorApi2Entity {
	return NewV1n2EntityFunc(sdk, data)
}


// V3n returns a V3n entity bound to this client.
// Idiomatic usage: client.V3n(nil).List(nil, nil) or
// client.V3n(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorApi2SDK) V3n(data map[string]any) UuidGeneratorApi2Entity {
	return NewV3nEntityFunc(sdk, data)
}


// V3n2 returns a V3n2 entity bound to this client.
// Idiomatic usage: client.V3n2(nil).List(nil, nil) or
// client.V3n2(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorApi2SDK) V3n2(data map[string]any) UuidGeneratorApi2Entity {
	return NewV3n2EntityFunc(sdk, data)
}


// V4n returns a V4n entity bound to this client.
// Idiomatic usage: client.V4n(nil).List(nil, nil) or
// client.V4n(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorApi2SDK) V4n(data map[string]any) UuidGeneratorApi2Entity {
	return NewV4nEntityFunc(sdk, data)
}


// V4n2 returns a V4n2 entity bound to this client.
// Idiomatic usage: client.V4n2(nil).List(nil, nil) or
// client.V4n2(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorApi2SDK) V4n2(data map[string]any) UuidGeneratorApi2Entity {
	return NewV4n2EntityFunc(sdk, data)
}


// V5n returns a V5n entity bound to this client.
// Idiomatic usage: client.V5n(nil).List(nil, nil) or
// client.V5n(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorApi2SDK) V5n(data map[string]any) UuidGeneratorApi2Entity {
	return NewV5nEntityFunc(sdk, data)
}


// V5n2 returns a V5n2 entity bound to this client.
// Idiomatic usage: client.V5n2(nil).List(nil, nil) or
// client.V5n2(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorApi2SDK) V5n2(data map[string]any) UuidGeneratorApi2Entity {
	return NewV5n2EntityFunc(sdk, data)
}


// V6n returns a V6n entity bound to this client.
// Idiomatic usage: client.V6n(nil).List(nil, nil) or
// client.V6n(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorApi2SDK) V6n(data map[string]any) UuidGeneratorApi2Entity {
	return NewV6nEntityFunc(sdk, data)
}


// V6n2 returns a V6n2 entity bound to this client.
// Idiomatic usage: client.V6n2(nil).List(nil, nil) or
// client.V6n2(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorApi2SDK) V6n2(data map[string]any) UuidGeneratorApi2Entity {
	return NewV6n2EntityFunc(sdk, data)
}


// V7n returns a V7n entity bound to this client.
// Idiomatic usage: client.V7n(nil).List(nil, nil) or
// client.V7n(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorApi2SDK) V7n(data map[string]any) UuidGeneratorApi2Entity {
	return NewV7nEntityFunc(sdk, data)
}


// V7n2 returns a V7n2 entity bound to this client.
// Idiomatic usage: client.V7n2(nil).List(nil, nil) or
// client.V7n2(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorApi2SDK) V7n2(data map[string]any) UuidGeneratorApi2Entity {
	return NewV7n2EntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *UuidGeneratorApi2SDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewUuidGeneratorApi2SDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
