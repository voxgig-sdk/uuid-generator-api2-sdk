<?php
declare(strict_types=1);

// UuidGeneratorApi2 SDK utility: result_body

class UuidGeneratorApi2ResultBody
{
    public static function call(UuidGeneratorApi2Context $ctx): ?UuidGeneratorApi2Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
