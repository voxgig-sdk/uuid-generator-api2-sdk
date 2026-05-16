<?php
declare(strict_types=1);

// UuidGeneratorApi2 SDK base feature

class UuidGeneratorApi2BaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(UuidGeneratorApi2Context $ctx, array $options): void {}
    public function PostConstruct(UuidGeneratorApi2Context $ctx): void {}
    public function PostConstructEntity(UuidGeneratorApi2Context $ctx): void {}
    public function SetData(UuidGeneratorApi2Context $ctx): void {}
    public function GetData(UuidGeneratorApi2Context $ctx): void {}
    public function GetMatch(UuidGeneratorApi2Context $ctx): void {}
    public function SetMatch(UuidGeneratorApi2Context $ctx): void {}
    public function PrePoint(UuidGeneratorApi2Context $ctx): void {}
    public function PreSpec(UuidGeneratorApi2Context $ctx): void {}
    public function PreRequest(UuidGeneratorApi2Context $ctx): void {}
    public function PreResponse(UuidGeneratorApi2Context $ctx): void {}
    public function PreResult(UuidGeneratorApi2Context $ctx): void {}
    public function PreDone(UuidGeneratorApi2Context $ctx): void {}
    public function PreUnexpected(UuidGeneratorApi2Context $ctx): void {}
}
