<?php
declare(strict_types=1);

// V7n entity test

require_once __DIR__ . '/../uuidgeneratorapi2_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class V7nEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = UuidGeneratorApi2SDK::test(null, null);
        $ent = $testsdk->V7n(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "v7n" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = UuidGeneratorApi2SDK::test($seed, null);
        $seen = iterator_to_array($base->V7n(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = UuidGeneratorApi2Config::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = UuidGeneratorApi2SDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->V7n(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = v7n_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "v7n." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set UUID_GENERATOR_API2_TEST_V7N_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $v7n_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.v7n")));
        $v7n_ref01_data = null;
        if (count($v7n_ref01_data_raw) > 0) {
            $v7n_ref01_data = Helpers::to_map($v7n_ref01_data_raw[0][1]);
        }

        // LIST
        $v7n_ref01_ent = $client->V7n(null);
        $v7n_ref01_match = [];

        $v7n_ref01_list_result = $v7n_ref01_ent->list($v7n_ref01_match, null);
        $this->assertIsArray($v7n_ref01_list_result);

        // LOAD
        $v7n_ref01_match_dt0 = [];
        $v7n_ref01_data_dt0_loaded = $v7n_ref01_ent->load($v7n_ref01_match_dt0, null);
        $this->assertNotNull($v7n_ref01_data_dt0_loaded);

    }
}

function v7n_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/v7n/V7nTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = UuidGeneratorApi2SDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["v7n01", "v7n02", "v7n03", "v701", "v702", "v703"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("UUID_GENERATOR_API2_TEST_V7N_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "UUID_GENERATOR_API2_TEST_V7N_ENTID" => $idmap,
        "UUID_GENERATOR_API2_TEST_LIVE" => "FALSE",
        "UUID_GENERATOR_API2_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["UUID_GENERATOR_API2_TEST_V7N_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["UUID_GENERATOR_API2_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new UuidGeneratorApi2SDK(Helpers::to_map($merged_opts));
    }

    $live = $env["UUID_GENERATOR_API2_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["UUID_GENERATOR_API2_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
