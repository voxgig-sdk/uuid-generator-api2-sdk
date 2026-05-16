package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/uuid-generator-api2-sdk"
	"github.com/voxgig-sdk/uuid-generator-api2-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestV7nEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.V7n(nil)
		if ent == nil {
			t.Fatal("expected non-nil V7nEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := v7nBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "v7n." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set UUIDGENERATORAPI__TEST_V_N_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		v7nRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.v7n", setup.data)))
		var v7nRef01Data map[string]any
		if len(v7nRef01DataRaw) > 0 {
			v7nRef01Data = core.ToMapAny(v7nRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = v7nRef01Data

		// LIST
		v7nRef01Ent := client.V7n(nil)
		v7nRef01Match := map[string]any{}

		v7nRef01ListResult, err := v7nRef01Ent.List(v7nRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, v7nRef01ListOk := v7nRef01ListResult.([]any)
		if !v7nRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", v7nRef01ListResult)
		}

	})
}

func v7nBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "v7n", "V7nTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read v7n test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse v7n test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"v7n01", "v7n02", "v7n03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("UUIDGENERATORAPI__TEST_V_N_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"UUIDGENERATORAPI__TEST_V_N_ENTID": idmap,
		"UUIDGENERATORAPI__TEST_LIVE":      "FALSE",
		"UUIDGENERATORAPI__TEST_EXPLAIN":   "FALSE",
		"UUIDGENERATORAPI__APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["UUIDGENERATORAPI__TEST_V_N_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["UUIDGENERATORAPI__TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["UUIDGENERATORAPI__APIKEY"],
			},
			extra,
		})
		client = sdk.NewUuidGeneratorApi2SDK(core.ToMapAny(mergedOpts))
	}

	live := env["UUIDGENERATORAPI__TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["UUIDGENERATORAPI__TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
