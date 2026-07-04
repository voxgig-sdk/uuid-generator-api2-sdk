package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/uuid-generator-api2-sdk/go"
	"github.com/voxgig-sdk/uuid-generator-api2-sdk/go/core"

	vs "github.com/voxgig-sdk/uuid-generator-api2-sdk/go/utility/struct"
)

func TestV4n2Entity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.V4n2(nil)
		if ent == nil {
			t.Fatal("expected non-nil V4n2Entity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := v4n2BasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "v4n2." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set UUIDGENERATORAPI__TEST_V_N__ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		v4n2Ref01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.v4n2", setup.data)))
		var v4n2Ref01Data map[string]any
		if len(v4n2Ref01DataRaw) > 0 {
			v4n2Ref01Data = core.ToMapAny(v4n2Ref01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = v4n2Ref01Data

		// LOAD
		v4n2Ref01Ent := client.V4n2(nil)
		v4n2Ref01MatchDt0 := map[string]any{}
		v4n2Ref01DataDt0Loaded, err := v4n2Ref01Ent.Load(v4n2Ref01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if v4n2Ref01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func v4n2BasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "v4n2", "V4n2TestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read v4n2 test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse v4n2 test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"v4n201", "v4n202", "v4n203", "v401", "v402", "v403"},
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
	entidEnvRaw := os.Getenv("UUIDGENERATORAPI__TEST_V_N__ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"UUIDGENERATORAPI__TEST_V_N__ENTID": idmap,
		"UUIDGENERATORAPI__TEST_LIVE":      "FALSE",
		"UUIDGENERATORAPI__TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["UUIDGENERATORAPI__TEST_V_N__ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["UUIDGENERATORAPI__TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
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
