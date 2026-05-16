<?php
declare(strict_types=1);

// UuidGeneratorApi2 SDK utility: prepare_path

class UuidGeneratorApi2PreparePath
{
    public static function call(UuidGeneratorApi2Context $ctx): string
    {
        $point = $ctx->point;
        $parts = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'parts');
            if (is_array($p)) {
                $parts = $p;
            }
        }
        return \Voxgig\Struct\Struct::join($parts, '/', true);
    }
}
