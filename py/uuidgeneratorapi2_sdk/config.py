# UuidGeneratorApi2 SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "UuidGeneratorApi2",
            "slug": "uuid-generator-api2",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://toolkitvault.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "guid": {},
                "v1n": {},
                "v3n": {},
                "v4n": {},
                "v5n": {},
                "v6n": {},
                "v7n": {},
            },
        },
        "entity": {
      "guid": {
        "fields": [
          {
            "name": "count",
            "req": True,
            "short": "Number of UUIDs generated",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "maxPerCall",
            "req": True,
            "short": "Maximum number of UUIDs allowed per API call",
            "type": "`$INTEGER`",
          },
          {
            "name": "uuids",
            "req": True,
            "short": "Array of generated UUIDs",
            "type": "`$ARRAY`",
          },
          {
            "name": "version",
            "req": True,
            "short": "UUID version used for generation",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "guid",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/uuid-generator/guid",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "uuid-generator",
                  },
                  {
                    "lit": "guid",
                  },
                ],
                "select": {
                  "exist": [
                    "count",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.uuids`",
                },
                "parts": [
                  "api",
                  "uuid-generator",
                  "guid",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/uuid-generator/guid/{count}",
                "rename": {
                  "param": {
                    "count": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "uuid-generator",
                  },
                  {
                    "lit": "guid",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "format",
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "uuid-generator",
                  "guid",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "v1n": {
        "fields": [
          {
            "name": "count",
            "req": True,
            "short": "Number of UUIDs generated",
            "type": "`$INTEGER`",
          },
          {
            "name": "maxPerCall",
            "req": True,
            "short": "Maximum number of UUIDs allowed per API call",
            "type": "`$INTEGER`",
          },
          {
            "name": "uuids",
            "req": True,
            "short": "Array of generated UUIDs",
            "type": "`$ARRAY`",
          },
          {
            "name": "version",
            "req": True,
            "short": "UUID version used for generation",
            "type": "`$STRING`",
          },
        ],
        "name": "v1n",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/uuid-generator/v1",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "uuid-generator",
                  },
                  {
                    "lit": "v1",
                  },
                ],
                "select": {
                  "exist": [
                    "count",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.uuids`",
                },
                "parts": [
                  "api",
                  "uuid-generator",
                  "v1",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "count",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/uuid-generator/v1/{count}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "uuid-generator",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "var": "count",
                  },
                ],
                "select": {
                  "exist": [
                    "count",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "uuid-generator",
                  "v1",
                  "{count}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "v1",
            ],
          ],
        },
      },
      "v3n": {
        "fields": [
          {
            "name": "count",
            "req": True,
            "short": "Number of UUIDs generated",
            "type": "`$INTEGER`",
          },
          {
            "name": "maxPerCall",
            "req": True,
            "short": "Maximum number of UUIDs allowed per API call",
            "type": "`$INTEGER`",
          },
          {
            "name": "uuids",
            "req": True,
            "short": "Array of generated UUIDs",
            "type": "`$ARRAY`",
          },
          {
            "name": "version",
            "req": True,
            "short": "UUID version used for generation",
            "type": "`$STRING`",
          },
        ],
        "name": "v3n",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "dns",
                      "kind": "query",
                      "name": "namespace",
                      "orig": "namespace",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/uuid-generator/v3",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "uuid-generator",
                  },
                  {
                    "lit": "v3",
                  },
                ],
                "select": {
                  "exist": [
                    "count",
                    "format",
                    "name",
                    "namespace",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.uuids`",
                },
                "parts": [
                  "api",
                  "uuid-generator",
                  "v3",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "count",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "dns",
                      "kind": "query",
                      "name": "namespace",
                      "orig": "namespace",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/uuid-generator/v3/{count}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "uuid-generator",
                  },
                  {
                    "lit": "v3",
                  },
                  {
                    "var": "count",
                  },
                ],
                "select": {
                  "exist": [
                    "count",
                    "format",
                    "name",
                    "namespace",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "uuid-generator",
                  "v3",
                  "{count}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "v3",
            ],
          ],
        },
      },
      "v4n": {
        "fields": [
          {
            "name": "count",
            "req": True,
            "short": "Number of UUIDs generated",
            "type": "`$INTEGER`",
          },
          {
            "name": "maxPerCall",
            "req": True,
            "short": "Maximum number of UUIDs allowed per API call",
            "type": "`$INTEGER`",
          },
          {
            "name": "uuids",
            "req": True,
            "short": "Array of generated UUIDs",
            "type": "`$ARRAY`",
          },
          {
            "name": "version",
            "req": True,
            "short": "UUID version used for generation",
            "type": "`$STRING`",
          },
        ],
        "name": "v4n",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/uuid-generator/v4",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "uuid-generator",
                  },
                  {
                    "lit": "v4",
                  },
                ],
                "select": {
                  "exist": [
                    "count",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.uuids`",
                },
                "parts": [
                  "api",
                  "uuid-generator",
                  "v4",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "count",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/uuid-generator/v4/{count}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "uuid-generator",
                  },
                  {
                    "lit": "v4",
                  },
                  {
                    "var": "count",
                  },
                ],
                "select": {
                  "exist": [
                    "count",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "uuid-generator",
                  "v4",
                  "{count}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "v4",
            ],
          ],
        },
      },
      "v5n": {
        "fields": [
          {
            "name": "count",
            "req": True,
            "short": "Number of UUIDs generated",
            "type": "`$INTEGER`",
          },
          {
            "name": "maxPerCall",
            "req": True,
            "short": "Maximum number of UUIDs allowed per API call",
            "type": "`$INTEGER`",
          },
          {
            "name": "uuids",
            "req": True,
            "short": "Array of generated UUIDs",
            "type": "`$ARRAY`",
          },
          {
            "name": "version",
            "req": True,
            "short": "UUID version used for generation",
            "type": "`$STRING`",
          },
        ],
        "name": "v5n",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "dns",
                      "kind": "query",
                      "name": "namespace",
                      "orig": "namespace",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/uuid-generator/v5",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "uuid-generator",
                  },
                  {
                    "lit": "v5",
                  },
                ],
                "select": {
                  "exist": [
                    "count",
                    "format",
                    "name",
                    "namespace",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.uuids`",
                },
                "parts": [
                  "api",
                  "uuid-generator",
                  "v5",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "count",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "dns",
                      "kind": "query",
                      "name": "namespace",
                      "orig": "namespace",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/uuid-generator/v5/{count}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "uuid-generator",
                  },
                  {
                    "lit": "v5",
                  },
                  {
                    "var": "count",
                  },
                ],
                "select": {
                  "exist": [
                    "count",
                    "format",
                    "name",
                    "namespace",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "uuid-generator",
                  "v5",
                  "{count}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "v5",
            ],
          ],
        },
      },
      "v6n": {
        "fields": [
          {
            "name": "count",
            "req": True,
            "short": "Number of UUIDs generated",
            "type": "`$INTEGER`",
          },
          {
            "name": "maxPerCall",
            "req": True,
            "short": "Maximum number of UUIDs allowed per API call",
            "type": "`$INTEGER`",
          },
          {
            "name": "uuids",
            "req": True,
            "short": "Array of generated UUIDs",
            "type": "`$ARRAY`",
          },
          {
            "name": "version",
            "req": True,
            "short": "UUID version used for generation",
            "type": "`$STRING`",
          },
        ],
        "name": "v6n",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/uuid-generator/v6",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "uuid-generator",
                  },
                  {
                    "lit": "v6",
                  },
                ],
                "select": {
                  "exist": [
                    "count",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.uuids`",
                },
                "parts": [
                  "api",
                  "uuid-generator",
                  "v6",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "count",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/uuid-generator/v6/{count}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "uuid-generator",
                  },
                  {
                    "lit": "v6",
                  },
                  {
                    "var": "count",
                  },
                ],
                "select": {
                  "exist": [
                    "count",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "uuid-generator",
                  "v6",
                  "{count}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "v6",
            ],
          ],
        },
      },
      "v7n": {
        "fields": [
          {
            "name": "count",
            "req": True,
            "short": "Number of UUIDs generated",
            "type": "`$INTEGER`",
          },
          {
            "name": "maxPerCall",
            "req": True,
            "short": "Maximum number of UUIDs allowed per API call",
            "type": "`$INTEGER`",
          },
          {
            "name": "uuids",
            "req": True,
            "short": "Array of generated UUIDs",
            "type": "`$ARRAY`",
          },
          {
            "name": "version",
            "req": True,
            "short": "UUID version used for generation",
            "type": "`$STRING`",
          },
        ],
        "name": "v7n",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/uuid-generator/v7",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "uuid-generator",
                  },
                  {
                    "lit": "v7",
                  },
                ],
                "select": {
                  "exist": [
                    "count",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.uuids`",
                },
                "parts": [
                  "api",
                  "uuid-generator",
                  "v7",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "count",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/uuid-generator/v7/{count}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "uuid-generator",
                  },
                  {
                    "lit": "v7",
                  },
                  {
                    "var": "count",
                  },
                ],
                "select": {
                  "exist": [
                    "count",
                    "format",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "uuid-generator",
                  "v7",
                  "{count}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "v7",
            ],
          ],
        },
      },
    },
    }
