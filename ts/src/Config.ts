
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://toolkitvault.com',

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      guid: {
      },

      v1n: {
      },

      v1n2: {
      },

      v3n: {
      },

      v3n2: {
      },

      v4n: {
      },

      v4n2: {
      },

      v5n: {
      },

      v5n2: {
      },

      v6n: {
      },

      v6n2: {
      },

      v7n: {
      },

      v7n2: {
      },

    }
  }


  entity = {
    "guid": {
      "fields": [
        {
          "name": "count",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "max_per_call",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "uuid",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "version",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "guid",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/uuid-generator/guid",
              "parts": [
                "api",
                "uuid-generator",
                "guid"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "load": {
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
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/uuid-generator/guid/{count}",
              "parts": [
                "api",
                "uuid-generator",
                "guid",
                "{id}"
              ],
              "rename": {
                "param": {
                  "count": "id"
                }
              },
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "max_per_call",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "uuid",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "version",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "v1n",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/uuid-generator/v1",
              "parts": [
                "api",
                "uuid-generator",
                "v1"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "v1n2": {
      "fields": [
        {
          "name": "count",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "max_per_call",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "uuid",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "version",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "v1n2",
      "op": {
        "load": {
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
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/uuid-generator/v1/{count}",
              "parts": [
                "api",
                "uuid-generator",
                "v1",
                "{count}"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "max_per_call",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "uuid",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "version",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "v3n",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "name",
                    "orig": "name",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "dns",
                    "kind": "query",
                    "name": "namespace",
                    "orig": "namespace",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/uuid-generator/v3",
              "parts": [
                "api",
                "uuid-generator",
                "v3"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "v3n2": {
      "fields": [
        {
          "name": "count",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "max_per_call",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "uuid",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "version",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "v3n2",
      "op": {
        "load": {
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
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "name",
                    "orig": "name",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "dns",
                    "kind": "query",
                    "name": "namespace",
                    "orig": "namespace",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/uuid-generator/v3/{count}",
              "parts": [
                "api",
                "uuid-generator",
                "v3",
                "{count}"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "max_per_call",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "uuid",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "version",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "v4n",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/uuid-generator/v4",
              "parts": [
                "api",
                "uuid-generator",
                "v4"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "v4n2": {
      "fields": [
        {
          "name": "count",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "max_per_call",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "uuid",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "version",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "v4n2",
      "op": {
        "load": {
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
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/uuid-generator/v4/{count}",
              "parts": [
                "api",
                "uuid-generator",
                "v4",
                "{count}"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "max_per_call",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "uuid",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "version",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "v5n",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "name",
                    "orig": "name",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "dns",
                    "kind": "query",
                    "name": "namespace",
                    "orig": "namespace",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/uuid-generator/v5",
              "parts": [
                "api",
                "uuid-generator",
                "v5"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "v5n2": {
      "fields": [
        {
          "name": "count",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "max_per_call",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "uuid",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "version",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "v5n2",
      "op": {
        "load": {
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
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "name",
                    "orig": "name",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "dns",
                    "kind": "query",
                    "name": "namespace",
                    "orig": "namespace",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/uuid-generator/v5/{count}",
              "parts": [
                "api",
                "uuid-generator",
                "v5",
                "{count}"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "max_per_call",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "uuid",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "version",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "v6n",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/uuid-generator/v6",
              "parts": [
                "api",
                "uuid-generator",
                "v6"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "v6n2": {
      "fields": [
        {
          "name": "count",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "max_per_call",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "uuid",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "version",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "v6n2",
      "op": {
        "load": {
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
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/uuid-generator/v6/{count}",
              "parts": [
                "api",
                "uuid-generator",
                "v6",
                "{count}"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "max_per_call",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "uuid",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "version",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "v7n",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/uuid-generator/v7",
              "parts": [
                "api",
                "uuid-generator",
                "v7"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "v7n2": {
      "fields": [
        {
          "name": "count",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "max_per_call",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "uuid",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "version",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "v7n2",
      "op": {
        "load": {
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
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "example": "default",
                    "kind": "query",
                    "name": "format",
                    "orig": "format",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/api/uuid-generator/v7/{count}",
              "parts": [
                "api",
                "uuid-generator",
                "v7",
                "{count}"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
  config
}

