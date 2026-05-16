<?php
declare(strict_types=1);

// UuidGeneratorApi2 SDK utility: prepare_body

class UuidGeneratorApi2PrepareBody
{
    public static function call(UuidGeneratorApi2Context $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
