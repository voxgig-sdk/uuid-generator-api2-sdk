<?php
declare(strict_types=1);

// UuidGeneratorApi2 SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class UuidGeneratorApi2MakeContext
{
    public static function call(array $ctxmap, ?UuidGeneratorApi2Context $basectx): UuidGeneratorApi2Context
    {
        return new UuidGeneratorApi2Context($ctxmap, $basectx);
    }
}
