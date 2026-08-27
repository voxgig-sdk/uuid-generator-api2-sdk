-- UuidGeneratorApi2 SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "UuidGeneratorApi2",
      slug = "uuid-generator-api2",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://toolkitvault.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["guid"] = {},
        ["v1n"] = {},
        ["v3n"] = {},
        ["v4n"] = {},
        ["v5n"] = {},
        ["v6n"] = {},
        ["v7n"] = {},
      },
    },
    entity = {
      ["guid"] = {
        ["fields"] = {
          {
            ["name"] = "count",
            ["req"] = true,
            ["short"] = "Number of UUIDs generated",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "maxPerCall",
            ["req"] = true,
            ["short"] = "Maximum number of UUIDs allowed per API call",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "uuids",
            ["req"] = true,
            ["short"] = "Array of generated UUIDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "version",
            ["req"] = true,
            ["short"] = "UUID version used for generation",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "guid",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/uuid-generator/guid",
                ["parts"] = {
                  "api",
                  "uuid-generator",
                  "guid",
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "format",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.uuids`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "count",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/uuid-generator/guid/{count}",
                ["parts"] = {
                  "api",
                  "uuid-generator",
                  "guid",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["count"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["v1n"] = {
        ["fields"] = {
          {
            ["name"] = "count",
            ["req"] = true,
            ["short"] = "Number of UUIDs generated",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "maxPerCall",
            ["req"] = true,
            ["short"] = "Maximum number of UUIDs allowed per API call",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "uuids",
            ["req"] = true,
            ["short"] = "Array of generated UUIDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "version",
            ["req"] = true,
            ["short"] = "UUID version used for generation",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "v1n",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/uuid-generator/v1",
                ["parts"] = {
                  "api",
                  "uuid-generator",
                  "v1",
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "format",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.uuids`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/uuid-generator/v1/{count}",
                ["parts"] = {
                  "api",
                  "uuid-generator",
                  "v1",
                  "{count}",
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "format",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v1",
            },
          },
        },
      },
      ["v3n"] = {
        ["fields"] = {
          {
            ["name"] = "count",
            ["req"] = true,
            ["short"] = "Number of UUIDs generated",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "maxPerCall",
            ["req"] = true,
            ["short"] = "Maximum number of UUIDs allowed per API call",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "uuids",
            ["req"] = true,
            ["short"] = "Array of generated UUIDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "version",
            ["req"] = true,
            ["short"] = "UUID version used for generation",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "v3n",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "name",
                      ["orig"] = "name",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "dns",
                      ["kind"] = "query",
                      ["name"] = "namespace",
                      ["orig"] = "namespace",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/uuid-generator/v3",
                ["parts"] = {
                  "api",
                  "uuid-generator",
                  "v3",
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "format",
                    "name",
                    "namespace",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.uuids`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "name",
                      ["orig"] = "name",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "dns",
                      ["kind"] = "query",
                      ["name"] = "namespace",
                      ["orig"] = "namespace",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/uuid-generator/v3/{count}",
                ["parts"] = {
                  "api",
                  "uuid-generator",
                  "v3",
                  "{count}",
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "format",
                    "name",
                    "namespace",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v3",
            },
          },
        },
      },
      ["v4n"] = {
        ["fields"] = {
          {
            ["name"] = "count",
            ["req"] = true,
            ["short"] = "Number of UUIDs generated",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "maxPerCall",
            ["req"] = true,
            ["short"] = "Maximum number of UUIDs allowed per API call",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "uuids",
            ["req"] = true,
            ["short"] = "Array of generated UUIDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "version",
            ["req"] = true,
            ["short"] = "UUID version used for generation",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "v4n",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/uuid-generator/v4",
                ["parts"] = {
                  "api",
                  "uuid-generator",
                  "v4",
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "format",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.uuids`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/uuid-generator/v4/{count}",
                ["parts"] = {
                  "api",
                  "uuid-generator",
                  "v4",
                  "{count}",
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "format",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v4",
            },
          },
        },
      },
      ["v5n"] = {
        ["fields"] = {
          {
            ["name"] = "count",
            ["req"] = true,
            ["short"] = "Number of UUIDs generated",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "maxPerCall",
            ["req"] = true,
            ["short"] = "Maximum number of UUIDs allowed per API call",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "uuids",
            ["req"] = true,
            ["short"] = "Array of generated UUIDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "version",
            ["req"] = true,
            ["short"] = "UUID version used for generation",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "v5n",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "name",
                      ["orig"] = "name",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "dns",
                      ["kind"] = "query",
                      ["name"] = "namespace",
                      ["orig"] = "namespace",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/uuid-generator/v5",
                ["parts"] = {
                  "api",
                  "uuid-generator",
                  "v5",
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "format",
                    "name",
                    "namespace",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.uuids`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "name",
                      ["orig"] = "name",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "dns",
                      ["kind"] = "query",
                      ["name"] = "namespace",
                      ["orig"] = "namespace",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/uuid-generator/v5/{count}",
                ["parts"] = {
                  "api",
                  "uuid-generator",
                  "v5",
                  "{count}",
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "format",
                    "name",
                    "namespace",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v5",
            },
          },
        },
      },
      ["v6n"] = {
        ["fields"] = {
          {
            ["name"] = "count",
            ["req"] = true,
            ["short"] = "Number of UUIDs generated",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "maxPerCall",
            ["req"] = true,
            ["short"] = "Maximum number of UUIDs allowed per API call",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "uuids",
            ["req"] = true,
            ["short"] = "Array of generated UUIDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "version",
            ["req"] = true,
            ["short"] = "UUID version used for generation",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "v6n",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/uuid-generator/v6",
                ["parts"] = {
                  "api",
                  "uuid-generator",
                  "v6",
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "format",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.uuids`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/uuid-generator/v6/{count}",
                ["parts"] = {
                  "api",
                  "uuid-generator",
                  "v6",
                  "{count}",
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "format",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v6",
            },
          },
        },
      },
      ["v7n"] = {
        ["fields"] = {
          {
            ["name"] = "count",
            ["req"] = true,
            ["short"] = "Number of UUIDs generated",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "maxPerCall",
            ["req"] = true,
            ["short"] = "Maximum number of UUIDs allowed per API call",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "uuids",
            ["req"] = true,
            ["short"] = "Array of generated UUIDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "version",
            ["req"] = true,
            ["short"] = "UUID version used for generation",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "v7n",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/uuid-generator/v7",
                ["parts"] = {
                  "api",
                  "uuid-generator",
                  "v7",
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "format",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.uuids`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/uuid-generator/v7/{count}",
                ["parts"] = {
                  "api",
                  "uuid-generator",
                  "v7",
                  "{count}",
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                    "format",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v7",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
