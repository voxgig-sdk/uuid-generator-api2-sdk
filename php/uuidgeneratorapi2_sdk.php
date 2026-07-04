<?php
declare(strict_types=1);

// UuidGeneratorApi2 SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class UuidGeneratorApi2SDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new UuidGeneratorApi2Utility();
        $this->_utility = $utility;

        $config = UuidGeneratorApi2Config::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = UuidGeneratorApi2Helpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = UuidGeneratorApi2Helpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, UuidGeneratorApi2Features::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return UuidGeneratorApi2Utility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = UuidGeneratorApi2Helpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = UuidGeneratorApi2Helpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = UuidGeneratorApi2Helpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new UuidGeneratorApi2Spec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = UuidGeneratorApi2Helpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = UuidGeneratorApi2Helpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_guid = null;

    // Idiomatic facade: $client->guid()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Guid() (PHP method
    // names are case-insensitive).
    public function guid($data = null)
    {
        require_once __DIR__ . '/entity/guid_entity.php';
        if ($data === null) {
            if ($this->_guid === null) {
                $this->_guid = new GuidEntity($this, null);
            }
            return $this->_guid;
        }
        return new GuidEntity($this, $data);
    }


    private $_v1n = null;

    // Idiomatic facade: $client->v1n()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias V1n() (PHP method
    // names are case-insensitive).
    public function v1n($data = null)
    {
        require_once __DIR__ . '/entity/v1n_entity.php';
        if ($data === null) {
            if ($this->_v1n === null) {
                $this->_v1n = new V1nEntity($this, null);
            }
            return $this->_v1n;
        }
        return new V1nEntity($this, $data);
    }


    private $_v1n2 = null;

    // Idiomatic facade: $client->v1n2()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias V1n2() (PHP method
    // names are case-insensitive).
    public function v1n2($data = null)
    {
        require_once __DIR__ . '/entity/v1n2_entity.php';
        if ($data === null) {
            if ($this->_v1n2 === null) {
                $this->_v1n2 = new V1n2Entity($this, null);
            }
            return $this->_v1n2;
        }
        return new V1n2Entity($this, $data);
    }


    private $_v3n = null;

    // Idiomatic facade: $client->v3n()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias V3n() (PHP method
    // names are case-insensitive).
    public function v3n($data = null)
    {
        require_once __DIR__ . '/entity/v3n_entity.php';
        if ($data === null) {
            if ($this->_v3n === null) {
                $this->_v3n = new V3nEntity($this, null);
            }
            return $this->_v3n;
        }
        return new V3nEntity($this, $data);
    }


    private $_v3n2 = null;

    // Idiomatic facade: $client->v3n2()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias V3n2() (PHP method
    // names are case-insensitive).
    public function v3n2($data = null)
    {
        require_once __DIR__ . '/entity/v3n2_entity.php';
        if ($data === null) {
            if ($this->_v3n2 === null) {
                $this->_v3n2 = new V3n2Entity($this, null);
            }
            return $this->_v3n2;
        }
        return new V3n2Entity($this, $data);
    }


    private $_v4n = null;

    // Idiomatic facade: $client->v4n()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias V4n() (PHP method
    // names are case-insensitive).
    public function v4n($data = null)
    {
        require_once __DIR__ . '/entity/v4n_entity.php';
        if ($data === null) {
            if ($this->_v4n === null) {
                $this->_v4n = new V4nEntity($this, null);
            }
            return $this->_v4n;
        }
        return new V4nEntity($this, $data);
    }


    private $_v4n2 = null;

    // Idiomatic facade: $client->v4n2()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias V4n2() (PHP method
    // names are case-insensitive).
    public function v4n2($data = null)
    {
        require_once __DIR__ . '/entity/v4n2_entity.php';
        if ($data === null) {
            if ($this->_v4n2 === null) {
                $this->_v4n2 = new V4n2Entity($this, null);
            }
            return $this->_v4n2;
        }
        return new V4n2Entity($this, $data);
    }


    private $_v5n = null;

    // Idiomatic facade: $client->v5n()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias V5n() (PHP method
    // names are case-insensitive).
    public function v5n($data = null)
    {
        require_once __DIR__ . '/entity/v5n_entity.php';
        if ($data === null) {
            if ($this->_v5n === null) {
                $this->_v5n = new V5nEntity($this, null);
            }
            return $this->_v5n;
        }
        return new V5nEntity($this, $data);
    }


    private $_v5n2 = null;

    // Idiomatic facade: $client->v5n2()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias V5n2() (PHP method
    // names are case-insensitive).
    public function v5n2($data = null)
    {
        require_once __DIR__ . '/entity/v5n2_entity.php';
        if ($data === null) {
            if ($this->_v5n2 === null) {
                $this->_v5n2 = new V5n2Entity($this, null);
            }
            return $this->_v5n2;
        }
        return new V5n2Entity($this, $data);
    }


    private $_v6n = null;

    // Idiomatic facade: $client->v6n()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias V6n() (PHP method
    // names are case-insensitive).
    public function v6n($data = null)
    {
        require_once __DIR__ . '/entity/v6n_entity.php';
        if ($data === null) {
            if ($this->_v6n === null) {
                $this->_v6n = new V6nEntity($this, null);
            }
            return $this->_v6n;
        }
        return new V6nEntity($this, $data);
    }


    private $_v6n2 = null;

    // Idiomatic facade: $client->v6n2()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias V6n2() (PHP method
    // names are case-insensitive).
    public function v6n2($data = null)
    {
        require_once __DIR__ . '/entity/v6n2_entity.php';
        if ($data === null) {
            if ($this->_v6n2 === null) {
                $this->_v6n2 = new V6n2Entity($this, null);
            }
            return $this->_v6n2;
        }
        return new V6n2Entity($this, $data);
    }


    private $_v7n = null;

    // Idiomatic facade: $client->v7n()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias V7n() (PHP method
    // names are case-insensitive).
    public function v7n($data = null)
    {
        require_once __DIR__ . '/entity/v7n_entity.php';
        if ($data === null) {
            if ($this->_v7n === null) {
                $this->_v7n = new V7nEntity($this, null);
            }
            return $this->_v7n;
        }
        return new V7nEntity($this, $data);
    }


    private $_v7n2 = null;

    // Idiomatic facade: $client->v7n2()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias V7n2() (PHP method
    // names are case-insensitive).
    public function v7n2($data = null)
    {
        require_once __DIR__ . '/entity/v7n2_entity.php';
        if ($data === null) {
            if ($this->_v7n2 === null) {
                $this->_v7n2 = new V7n2Entity($this, null);
            }
            return $this->_v7n2;
        }
        return new V7n2Entity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new UuidGeneratorApi2SDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
