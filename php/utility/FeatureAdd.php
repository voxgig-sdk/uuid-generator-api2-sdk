<?php
declare(strict_types=1);

// UuidGeneratorApi2 SDK utility: feature_add

class UuidGeneratorApi2FeatureAdd
{
    public static function call(UuidGeneratorApi2Context $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
