
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'UuidGeneratorApi2',
        slug: "uuid-generator-api2",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://toolkitvault.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      guid: {
      },

      v1n: {
      },

      v3n: {
      },

      v4n: {
      },

      v5n: {
      },

      v6n: {
      },

      v7n: {
      },

    }
  }


  entity = {
    "guid": {
      "fields": [
        {
          "name": "count",
          "req": true,
          "short": "Number of UUIDs generated",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "maxPerCall",
          "req": true,
          "short": "Maximum number of UUIDs allowed per API call",
          "type": "`$INTEGER`"
        },
        {
          "name": "uuids",
          "req": true,
          "short": "Array of generated UUIDs",
          "type": "`$ARRAY`"
        },
        {
          "name": "version",
          "req": true,
          "short": "UUID version used for generation",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/uuid-generator/guid",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "uuid-generator"
                },
                {
                  "lit": "guid"
                }
              ],
              "select": {
                "exist": [
                  "count",
                  "format"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.uuids`"
              },
              "parts": [
                "api",
                "uuid-generator",
                "guid"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/uuid-generator/guid/{count}",
              "rename": {
                "param": {
                  "count": "id"
                }
              },
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "uuid-generator"
                },
                {
                  "lit": "guid"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "format",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "uuid-generator",
                "guid",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "v1n": {
      "fields": [
        {
          "name": "count",
          "req": true,
          "short": "Number of UUIDs generated",
          "type": "`$INTEGER`"
        },
        {
          "name": "maxPerCall",
          "req": true,
          "short": "Maximum number of UUIDs allowed per API call",
          "type": "`$INTEGER`"
        },
        {
          "name": "uuids",
          "req": true,
          "short": "Array of generated UUIDs",
          "type": "`$ARRAY`"
        },
        {
          "name": "version",
          "req": true,
          "short": "UUID version used for generation",
          "type": "`$STRING`"
        }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/uuid-generator/v1",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "uuid-generator"
                },
                {
                  "lit": "v1"
                }
              ],
              "select": {
                "exist": [
                  "count",
                  "format"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.uuids`"
              },
              "parts": [
                "api",
                "uuid-generator",
                "v1"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/uuid-generator/v1/{count}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "uuid-generator"
                },
                {
                  "lit": "v1"
                },
                {
                  "var": "count"
                }
              ],
              "select": {
                "exist": [
                  "count",
                  "format"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "uuid-generator",
                "v1",
                "{count}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "v1"
          ]
        ]
      }
    },
    "v3n": {
      "fields": [
        {
          "name": "count",
          "req": true,
          "short": "Number of UUIDs generated",
          "type": "`$INTEGER`"
        },
        {
          "name": "maxPerCall",
          "req": true,
          "short": "Maximum number of UUIDs allowed per API call",
          "type": "`$INTEGER`"
        },
        {
          "name": "uuids",
          "req": true,
          "short": "Array of generated UUIDs",
          "type": "`$ARRAY`"
        },
        {
          "name": "version",
          "req": true,
          "short": "UUID version used for generation",
          "type": "`$STRING`"
        }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "name",
                    "orig": "name",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "dns",
                    "kind": "query",
                    "name": "namespace",
                    "orig": "namespace",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/uuid-generator/v3",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "uuid-generator"
                },
                {
                  "lit": "v3"
                }
              ],
              "select": {
                "exist": [
                  "count",
                  "format",
                  "name",
                  "namespace"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.uuids`"
              },
              "parts": [
                "api",
                "uuid-generator",
                "v3"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "name",
                    "orig": "name",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "dns",
                    "kind": "query",
                    "name": "namespace",
                    "orig": "namespace",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/uuid-generator/v3/{count}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "uuid-generator"
                },
                {
                  "lit": "v3"
                },
                {
                  "var": "count"
                }
              ],
              "select": {
                "exist": [
                  "count",
                  "format",
                  "name",
                  "namespace"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "uuid-generator",
                "v3",
                "{count}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "v3"
          ]
        ]
      }
    },
    "v4n": {
      "fields": [
        {
          "name": "count",
          "req": true,
          "short": "Number of UUIDs generated",
          "type": "`$INTEGER`"
        },
        {
          "name": "maxPerCall",
          "req": true,
          "short": "Maximum number of UUIDs allowed per API call",
          "type": "`$INTEGER`"
        },
        {
          "name": "uuids",
          "req": true,
          "short": "Array of generated UUIDs",
          "type": "`$ARRAY`"
        },
        {
          "name": "version",
          "req": true,
          "short": "UUID version used for generation",
          "type": "`$STRING`"
        }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/uuid-generator/v4",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "uuid-generator"
                },
                {
                  "lit": "v4"
                }
              ],
              "select": {
                "exist": [
                  "count",
                  "format"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.uuids`"
              },
              "parts": [
                "api",
                "uuid-generator",
                "v4"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/uuid-generator/v4/{count}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "uuid-generator"
                },
                {
                  "lit": "v4"
                },
                {
                  "var": "count"
                }
              ],
              "select": {
                "exist": [
                  "count",
                  "format"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "uuid-generator",
                "v4",
                "{count}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "v4"
          ]
        ]
      }
    },
    "v5n": {
      "fields": [
        {
          "name": "count",
          "req": true,
          "short": "Number of UUIDs generated",
          "type": "`$INTEGER`"
        },
        {
          "name": "maxPerCall",
          "req": true,
          "short": "Maximum number of UUIDs allowed per API call",
          "type": "`$INTEGER`"
        },
        {
          "name": "uuids",
          "req": true,
          "short": "Array of generated UUIDs",
          "type": "`$ARRAY`"
        },
        {
          "name": "version",
          "req": true,
          "short": "UUID version used for generation",
          "type": "`$STRING`"
        }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "name",
                    "orig": "name",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "dns",
                    "kind": "query",
                    "name": "namespace",
                    "orig": "namespace",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/uuid-generator/v5",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "uuid-generator"
                },
                {
                  "lit": "v5"
                }
              ],
              "select": {
                "exist": [
                  "count",
                  "format",
                  "name",
                  "namespace"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.uuids`"
              },
              "parts": [
                "api",
                "uuid-generator",
                "v5"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "name",
                    "orig": "name",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "dns",
                    "kind": "query",
                    "name": "namespace",
                    "orig": "namespace",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/uuid-generator/v5/{count}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "uuid-generator"
                },
                {
                  "lit": "v5"
                },
                {
                  "var": "count"
                }
              ],
              "select": {
                "exist": [
                  "count",
                  "format",
                  "name",
                  "namespace"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "uuid-generator",
                "v5",
                "{count}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "v5"
          ]
        ]
      }
    },
    "v6n": {
      "fields": [
        {
          "name": "count",
          "req": true,
          "short": "Number of UUIDs generated",
          "type": "`$INTEGER`"
        },
        {
          "name": "maxPerCall",
          "req": true,
          "short": "Maximum number of UUIDs allowed per API call",
          "type": "`$INTEGER`"
        },
        {
          "name": "uuids",
          "req": true,
          "short": "Array of generated UUIDs",
          "type": "`$ARRAY`"
        },
        {
          "name": "version",
          "req": true,
          "short": "UUID version used for generation",
          "type": "`$STRING`"
        }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/uuid-generator/v6",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "uuid-generator"
                },
                {
                  "lit": "v6"
                }
              ],
              "select": {
                "exist": [
                  "count",
                  "format"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.uuids`"
              },
              "parts": [
                "api",
                "uuid-generator",
                "v6"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/uuid-generator/v6/{count}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "uuid-generator"
                },
                {
                  "lit": "v6"
                },
                {
                  "var": "count"
                }
              ],
              "select": {
                "exist": [
                  "count",
                  "format"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "uuid-generator",
                "v6",
                "{count}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "v6"
          ]
        ]
      }
    },
    "v7n": {
      "fields": [
        {
          "name": "count",
          "req": true,
          "short": "Number of UUIDs generated",
          "type": "`$INTEGER`"
        },
        {
          "name": "maxPerCall",
          "req": true,
          "short": "Maximum number of UUIDs allowed per API call",
          "type": "`$INTEGER`"
        },
        {
          "name": "uuids",
          "req": true,
          "short": "Array of generated UUIDs",
          "type": "`$ARRAY`"
        },
        {
          "name": "version",
          "req": true,
          "short": "UUID version used for generation",
          "type": "`$STRING`"
        }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/uuid-generator/v7",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "uuid-generator"
                },
                {
                  "lit": "v7"
                }
              ],
              "select": {
                "exist": [
                  "count",
                  "format"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.uuids`"
              },
              "parts": [
                "api",
                "uuid-generator",
                "v7"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/uuid-generator/v7/{count}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "uuid-generator"
                },
                {
                  "lit": "v7"
                },
                {
                  "var": "count"
                }
              ],
              "select": {
                "exist": [
                  "count",
                  "format"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "uuid-generator",
                "v7",
                "{count}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "v7"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

