package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "UuidGeneratorApi2",
			"slug": "uuid-generator-api2",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://toolkitvault.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"guid": map[string]any{},
				"v1n": map[string]any{},
				"v3n": map[string]any{},
				"v4n": map[string]any{},
				"v5n": map[string]any{},
				"v6n": map[string]any{},
				"v7n": map[string]any{},
			},
		},
		"entity": map[string]any{
			"guid": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "count",
						"req": true,
						"short": "Number of UUIDs generated",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "maxPerCall",
						"req": true,
						"short": "Maximum number of UUIDs allowed per API call",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "uuids",
						"req": true,
						"short": "Array of generated UUIDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "version",
						"req": true,
						"short": "UUID version used for generation",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "guid",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/uuid-generator/guid",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "uuid-generator",
									},
									map[string]any{
										"lit": "guid",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.uuids`",
								},
								"parts": []any{
									"api",
									"uuid-generator",
									"guid",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "count",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/uuid-generator/guid/{count}",
								"rename": map[string]any{
									"param": map[string]any{
										"count": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "uuid-generator",
									},
									map[string]any{
										"lit": "guid",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"uuid-generator",
									"guid",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"v1n": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "count",
						"req": true,
						"short": "Number of UUIDs generated",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "maxPerCall",
						"req": true,
						"short": "Maximum number of UUIDs allowed per API call",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "uuids",
						"req": true,
						"short": "Array of generated UUIDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "version",
						"req": true,
						"short": "UUID version used for generation",
						"type": "`$STRING`",
					},
				},
				"name": "v1n",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/uuid-generator/v1",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "uuid-generator",
									},
									map[string]any{
										"lit": "v1",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.uuids`",
								},
								"parts": []any{
									"api",
									"uuid-generator",
									"v1",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "count",
											"orig": "count",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/uuid-generator/v1/{count}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "uuid-generator",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"var": "count",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"uuid-generator",
									"v1",
									"{count}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v1",
						},
					},
				},
			},
			"v3n": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "count",
						"req": true,
						"short": "Number of UUIDs generated",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "maxPerCall",
						"req": true,
						"short": "Maximum number of UUIDs allowed per API call",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "uuids",
						"req": true,
						"short": "Array of generated UUIDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "version",
						"req": true,
						"short": "UUID version used for generation",
						"type": "`$STRING`",
					},
				},
				"name": "v3n",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "dns",
											"kind": "query",
											"name": "namespace",
											"orig": "namespace",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/uuid-generator/v3",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "uuid-generator",
									},
									map[string]any{
										"lit": "v3",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"format",
										"name",
										"namespace",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.uuids`",
								},
								"parts": []any{
									"api",
									"uuid-generator",
									"v3",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "count",
											"orig": "count",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "dns",
											"kind": "query",
											"name": "namespace",
											"orig": "namespace",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/uuid-generator/v3/{count}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "uuid-generator",
									},
									map[string]any{
										"lit": "v3",
									},
									map[string]any{
										"var": "count",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"format",
										"name",
										"namespace",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"uuid-generator",
									"v3",
									"{count}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v3",
						},
					},
				},
			},
			"v4n": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "count",
						"req": true,
						"short": "Number of UUIDs generated",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "maxPerCall",
						"req": true,
						"short": "Maximum number of UUIDs allowed per API call",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "uuids",
						"req": true,
						"short": "Array of generated UUIDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "version",
						"req": true,
						"short": "UUID version used for generation",
						"type": "`$STRING`",
					},
				},
				"name": "v4n",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/uuid-generator/v4",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "uuid-generator",
									},
									map[string]any{
										"lit": "v4",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.uuids`",
								},
								"parts": []any{
									"api",
									"uuid-generator",
									"v4",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "count",
											"orig": "count",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/uuid-generator/v4/{count}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "uuid-generator",
									},
									map[string]any{
										"lit": "v4",
									},
									map[string]any{
										"var": "count",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"uuid-generator",
									"v4",
									"{count}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v4",
						},
					},
				},
			},
			"v5n": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "count",
						"req": true,
						"short": "Number of UUIDs generated",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "maxPerCall",
						"req": true,
						"short": "Maximum number of UUIDs allowed per API call",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "uuids",
						"req": true,
						"short": "Array of generated UUIDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "version",
						"req": true,
						"short": "UUID version used for generation",
						"type": "`$STRING`",
					},
				},
				"name": "v5n",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "dns",
											"kind": "query",
											"name": "namespace",
											"orig": "namespace",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/uuid-generator/v5",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "uuid-generator",
									},
									map[string]any{
										"lit": "v5",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"format",
										"name",
										"namespace",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.uuids`",
								},
								"parts": []any{
									"api",
									"uuid-generator",
									"v5",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "count",
											"orig": "count",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "name",
											"orig": "name",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "dns",
											"kind": "query",
											"name": "namespace",
											"orig": "namespace",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/uuid-generator/v5/{count}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "uuid-generator",
									},
									map[string]any{
										"lit": "v5",
									},
									map[string]any{
										"var": "count",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"format",
										"name",
										"namespace",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"uuid-generator",
									"v5",
									"{count}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v5",
						},
					},
				},
			},
			"v6n": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "count",
						"req": true,
						"short": "Number of UUIDs generated",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "maxPerCall",
						"req": true,
						"short": "Maximum number of UUIDs allowed per API call",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "uuids",
						"req": true,
						"short": "Array of generated UUIDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "version",
						"req": true,
						"short": "UUID version used for generation",
						"type": "`$STRING`",
					},
				},
				"name": "v6n",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/uuid-generator/v6",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "uuid-generator",
									},
									map[string]any{
										"lit": "v6",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.uuids`",
								},
								"parts": []any{
									"api",
									"uuid-generator",
									"v6",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "count",
											"orig": "count",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/uuid-generator/v6/{count}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "uuid-generator",
									},
									map[string]any{
										"lit": "v6",
									},
									map[string]any{
										"var": "count",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"uuid-generator",
									"v6",
									"{count}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v6",
						},
					},
				},
			},
			"v7n": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "count",
						"req": true,
						"short": "Number of UUIDs generated",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "maxPerCall",
						"req": true,
						"short": "Maximum number of UUIDs allowed per API call",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "uuids",
						"req": true,
						"short": "Array of generated UUIDs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "version",
						"req": true,
						"short": "UUID version used for generation",
						"type": "`$STRING`",
					},
				},
				"name": "v7n",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/uuid-generator/v7",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "uuid-generator",
									},
									map[string]any{
										"lit": "v7",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.uuids`",
								},
								"parts": []any{
									"api",
									"uuid-generator",
									"v7",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "count",
											"orig": "count",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/uuid-generator/v7/{count}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "uuid-generator",
									},
									map[string]any{
										"lit": "v7",
									},
									map[string]any{
										"var": "count",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"uuid-generator",
									"v7",
									"{count}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v7",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
