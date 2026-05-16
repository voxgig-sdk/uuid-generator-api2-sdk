<?php
declare(strict_types=1);

// UuidGeneratorApi2 SDK utility: result_headers

class UuidGeneratorApi2ResultHeaders
{
    public static function call(UuidGeneratorApi2Context $ctx): ?UuidGeneratorApi2Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
