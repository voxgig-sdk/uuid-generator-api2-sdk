<?php
declare(strict_types=1);

// UuidGeneratorApi2 SDK context

require_once __DIR__ . '/Control.php';
require_once __DIR__ . '/Operation.php';
require_once __DIR__ . '/Spec.php';
require_once __DIR__ . '/Result.php';
require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/Error.php';
require_once __DIR__ . '/Helpers.php';

class UuidGeneratorApi2Context
{
    public string $id;
    public array $out;
    public mixed $client;
    public ?UuidGeneratorApi2Utility $utility;
    public UuidGeneratorApi2Control $ctrl;
    public array $meta;
    public ?array $config;
    public ?array $entopts;
    public ?array $options;
    public mixed $entity;
    public ?array $shared;
    public array $opmap;
    public array $data;
    public array $reqdata;
    public array $match;
    public array $reqmatch;
    public ?array $point;
    public ?UuidGeneratorApi2Spec $spec;
    public ?UuidGeneratorApi2Result $result;
    public ?UuidGeneratorApi2Response $response;
    public UuidGeneratorApi2Operation $op;

    public function __construct(array $ctxmap = [], ?self $basectx = null)
    {
        $this->id = 'C' . random_int(10000000, 99999999);
        $this->out = [];

        $this->client = UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'client') ?? ($basectx ? $basectx->client : null);
        $this->utility = UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'utility') ?? ($basectx ? $basectx->utility : null);

        $this->ctrl = new UuidGeneratorApi2Control();
        $ctrl_raw = UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'ctrl');
        if (is_array($ctrl_raw)) {
            if (array_key_exists('throw', $ctrl_raw)) {
                $this->ctrl->throw_err = $ctrl_raw['throw'];
            }
            if (isset($ctrl_raw['explain']) && is_array($ctrl_raw['explain'])) {
                $this->ctrl->explain = $ctrl_raw['explain'];
            }
            if (array_key_exists('actor', $ctrl_raw)) {
                $this->ctrl->actor = $ctrl_raw['actor'];
            }
        } elseif ($basectx !== null && $basectx->ctrl !== null) {
            $this->ctrl = $basectx->ctrl;
        }

        $m = UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'meta');
        $this->meta = is_array($m) ? $m : ($basectx ? $basectx->meta ?? [] : []);

        $cfg = UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'config');
        $this->config = is_array($cfg) ? $cfg : ($basectx ? $basectx->config : null);

        $eo = UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'entopts');
        $this->entopts = is_array($eo) ? $eo : ($basectx ? $basectx->entopts : null);

        $o = UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'options');
        $this->options = is_array($o) ? $o : ($basectx ? $basectx->options : null);

        $e = UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'entity');
        $this->entity = $e ?? ($basectx ? $basectx->entity : null);

        $s = UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'shared');
        $this->shared = is_array($s) ? $s : ($basectx ? $basectx->shared : null);

        $om = UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'opmap');
        $this->opmap = is_array($om) ? $om : ($basectx ? $basectx->opmap ?? [] : []);

        $this->data = UuidGeneratorApi2Helpers::to_map(UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'data')) ?? [];
        $this->reqdata = UuidGeneratorApi2Helpers::to_map(UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'reqdata')) ?? [];
        $this->match = UuidGeneratorApi2Helpers::to_map(UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'match')) ?? [];
        $this->reqmatch = UuidGeneratorApi2Helpers::to_map(UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'reqmatch')) ?? [];

        $pt = UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'point');
        $this->point = is_array($pt) ? $pt : ($basectx ? $basectx->point : null);

        $sp = UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'spec');
        $this->spec = ($sp instanceof UuidGeneratorApi2Spec) ? $sp : ($basectx ? $basectx->spec : null);

        $r = UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'result');
        $this->result = ($r instanceof UuidGeneratorApi2Result) ? $r : ($basectx ? $basectx->result : null);

        $rp = UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'response');
        $this->response = ($rp instanceof UuidGeneratorApi2Response) ? $rp : ($basectx ? $basectx->response : null);

        $opname = UuidGeneratorApi2Helpers::get_ctx_prop($ctxmap, 'opname') ?? '';
        $this->op = $this->resolve_op($opname);
    }

    public function resolve_op(string $opname): UuidGeneratorApi2Operation
    {
        // Cache key is `<entity>:<opname>` so two entities with the same op
        // (e.g. both have a "list") get distinct cached Operations. Keying
        // on opname alone caused the first-resolved entity's points to be
        // served to every subsequent entity's call.
        $entname = (is_object($this->entity) && method_exists($this->entity, 'get_name'))
            ? $this->entity->get_name()
            : '_';
        $cacheKey = $entname . ':' . $opname;

        if (isset($this->opmap[$cacheKey])) {
            return $this->opmap[$cacheKey];
        }
        if ($opname === '') {
            return new UuidGeneratorApi2Operation([]);
        }

        $opcfg = \Voxgig\Struct\Struct::getpath($this->config, "entity.{$entname}.op.{$opname}");

        $input = ($opname === 'update' || $opname === 'create') ? 'data' : 'match';

        $points = [];
        if (is_array($opcfg)) {
            $t = \Voxgig\Struct\Struct::getprop($opcfg, 'points');
            if (is_array($t)) {
                $points = $t;
            }
        }

        $op = new UuidGeneratorApi2Operation([
            'entity' => $entname,
            'name' => $opname,
            'input' => $input,
            'points' => $points,
        ]);
        $this->opmap[$cacheKey] = $op;
        return $op;
    }

    public function make_error(string $code, string $msg): UuidGeneratorApi2Error
    {
        return new UuidGeneratorApi2Error($code, $msg, $this);
    }
}
