<?php
declare(strict_types=1);

// UuidGeneratorApi2 SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class UuidGeneratorApi2Features
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new UuidGeneratorApi2BaseFeature();
            case "test":
                return new UuidGeneratorApi2TestFeature();
            default:
                return new UuidGeneratorApi2BaseFeature();
        }
    }
}
