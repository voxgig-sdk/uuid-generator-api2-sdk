# V4n entity test

require "minitest/autorun"
require "json"
require_relative "../UuidGeneratorApi2_sdk"
require_relative "runner"

class V4nEntityTest < Minitest::Test
  def test_create_instance
    testsdk = UuidGeneratorApi2SDK.test(nil, nil)
    ent = testsdk.V4n(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = v4n_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "v4n." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set UUIDGENERATORAPI__TEST_V_N_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    v4n_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.v4n")))
    v4n_ref01_data = nil
    if v4n_ref01_data_raw.length > 0
      v4n_ref01_data = Helpers.to_map(v4n_ref01_data_raw[0][1])
    end

    # LIST
    v4n_ref01_ent = client.V4n(nil)
    v4n_ref01_match = {}

    v4n_ref01_list_result, err = v4n_ref01_ent.list(v4n_ref01_match, nil)
    assert_nil err
    assert v4n_ref01_list_result.is_a?(Array)

  end
end

def v4n_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "v4n", "V4nTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = UuidGeneratorApi2SDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["v4n01", "v4n02", "v4n03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["UUIDGENERATORAPI__TEST_V_N_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "UUIDGENERATORAPI__TEST_V_N_ENTID" => idmap,
    "UUIDGENERATORAPI__TEST_LIVE" => "FALSE",
    "UUIDGENERATORAPI__TEST_EXPLAIN" => "FALSE",
    "UUIDGENERATORAPI__APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["UUIDGENERATORAPI__TEST_V_N_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["UUIDGENERATORAPI__TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["UUIDGENERATORAPI__APIKEY"],
      },
      extra || {},
    ])
    client = UuidGeneratorApi2SDK.new(Helpers.to_map(merged_opts))
  end

  live = env["UUIDGENERATORAPI__TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["UUIDGENERATORAPI__TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
