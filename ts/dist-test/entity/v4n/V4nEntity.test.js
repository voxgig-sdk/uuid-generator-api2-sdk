"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('V4nEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when UUID_GENERATOR_API2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('UUID_GENERATOR_API2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.UuidGeneratorApi2SDK.test();
        const ent = testsdk.V4n();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.UUID_GENERATOR_API2_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'v4n.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "count", "req": true, "short": "Number of UUIDs generated", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "maxPerCall", "req": true, "short": "Maximum number of UUIDs allowed per API call", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "uuids", "req": true, "short": "Array of generated UUIDs", "type": "`$ARRAY`", "index$": 2 }, { "active": true, "name": "version", "req": true, "short": "UUID version used for generation", "type": "`$STRING`", "index$": 3 }], "name": "v4n", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 1, "kind": "query", "name": "count", "orig": "count", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": "default", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /api/uuid-generator/v4", "json": "{\"operationId\":\"generateV4UuidQuery\",\"parameters\":[{\"description\":\"Number of UUIDs to generate (alternative query parameter: 'n')\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"default\":1,\"maximum\":200,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Output format for UUIDs\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"default\",\"enum\":[\"default\",\"uppercase\",\"braced\",\"braced-uppercase\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"multipleUuids\":{\"summary\":\"Multiple UUID v4\",\"value\":{\"count\":10,\"maxPerCall\":200,\"uuids\":[\"6b8f8b8c-7f1a-4f4e-9d2e-1a3d9f8d2c01\",\"7c9e9c9d-8e2b-5f5f-ae3f-2b4e0e9e3d12\",\"8d0f0d0e-9f3c-6e6e-bf4e-3c5f1f0f4e23\",\"9e1e1e1f-0e4d-7f7f-ce5f-4d6e2e1e5f34\",\"0f2f2f2e-1f5e-8e8e-df6e-5e7f3f2f6e45\",\"1e3e3e3d-2e6f-9f9f-ee7f-6f8e4e3e7f56\",\"2f4f4f4c-3f7e-0e0e-ff8e-7f9f5f4f8e67\",\"3e5e5e5b-4e8d-1f1f-ee9f-8e0e6e5e9f78\",\"4f6f6f6a-5f9c-2e2e-dfae-9f1f7f6f0e89\",\"5e7e7e79-6e0b-3f3f-cebf-0e2e8e7e1f90\"],\"version\":\"v4\"}},\"singleUuid\":{\"summary\":\"Single UUID v7\",\"value\":{\"count\":1,\"maxPerCall\":200,\"uuids\":[\"018d5e8a-7b9c-7890-abcd-ef1234567890\"],\"version\":\"v7\"}}},\"schema\":{\"properties\":{\"count\":{\"description\":\"Number of UUIDs generated\",\"example\":10,\"type\":\"integer\"},\"maxPerCall\":{\"description\":\"Maximum number of UUIDs allowed per API call\",\"example\":200,\"type\":\"integer\"},\"uuids\":{\"description\":\"Array of generated UUIDs\",\"example\":[\"6b8f8b8c-7f1a-4f4e-9d2e-1a3d9f8d2c01\"],\"items\":{\"format\":\"uuid\",\"type\":\"string\"},\"type\":\"array\"},\"version\":{\"description\":\"UUID version used for generation\",\"example\":\"v4\",\"type\":\"string\"}},\"required\":[\"version\",\"count\",\"maxPerCall\",\"uuids\"],\"type\":\"object\"}}},\"description\":\"Successful UUID generation\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"invalidVersion\":{\"summary\":\"Invalid version\",\"value\":{\"error\":true,\"message\":\"Invalid version. Use v1|v2|v3|v4|v5|v6|v7|guid\",\"statusCode\":400,\"statusMessage\":\"Invalid version. Use v1|v2|v3|v4|v5|v6|v7|guid\",\"url\":\"https://toolkitvault.com/api/uuid-generator/v0\"}}},\"schema\":{\"properties\":{\"error\":{\"description\":\"Indicates an error occurred\",\"example\":true,\"type\":\"boolean\"},\"message\":{\"description\":\"Detailed error message\",\"example\":\"Invalid version. Use v1|v2|v3|v4|v5|v6|v7|guid\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"},\"statusMessage\":{\"description\":\"HTTP status message\",\"example\":\"Invalid version. Use v1|v2|v3|v4|v5|v6|v7|guid\",\"type\":\"string\"},\"url\":{\"description\":\"The requested URL that caused the error\",\"example\":\"https://toolkitvault.com/api/uuid-generator/v0\",\"type\":\"string\"}},\"required\":[\"error\",\"url\",\"statusCode\",\"statusMessage\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"429\":{\"content\":{\"application/json\":{\"example\":{\"error\":true,\"message\":\"Too Many Requests\",\"statusCode\":429,\"statusMessage\":\"Too Many Requests\",\"url\":\"https://toolkitvault.com/api/uuid-generator/v4\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Indicates an error occurred\",\"example\":true,\"type\":\"boolean\"},\"message\":{\"description\":\"Detailed error message\",\"example\":\"Invalid version. Use v1|v2|v3|v4|v5|v6|v7|guid\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"},\"statusMessage\":{\"description\":\"HTTP status message\",\"example\":\"Invalid version. Use v1|v2|v3|v4|v5|v6|v7|guid\",\"type\":\"string\"},\"url\":{\"description\":\"The requested URL that caused the error\",\"example\":\"https://toolkitvault.com/api/uuid-generator/v0\",\"type\":\"string\"}},\"required\":[\"error\",\"url\",\"statusCode\",\"statusMessage\",\"message\"],\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/uuid-generator/v4", "segments": [{ "lit": "api" }, { "lit": "uuid-generator" }, { "lit": "v4" }], "select": { "exist": ["count", "format"] }, "transform": { "req": "`reqdata`", "res": "`body.uuids`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "count", "orig": "count", "reqd": true, "type": "`$INTEGER`", "index$": 0 }], "query": [{ "active": true, "example": "default", "kind": "query", "name": "format", "orig": "format", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /api/uuid-generator/v4/{count}", "json": "{\"operationId\":\"generateV4UuidPath\",\"parameters\":[{\"description\":\"Number of UUIDs to generate\",\"in\":\"path\",\"name\":\"count\",\"required\":true,\"schema\":{\"maximum\":200,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Output format for UUIDs\",\"in\":\"query\",\"name\":\"format\",\"required\":false,\"schema\":{\"default\":\"default\",\"enum\":[\"default\",\"uppercase\",\"braced\",\"braced-uppercase\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"multipleUuids\":{\"summary\":\"Multiple UUID v4\",\"value\":{\"count\":10,\"maxPerCall\":200,\"uuids\":[\"6b8f8b8c-7f1a-4f4e-9d2e-1a3d9f8d2c01\",\"7c9e9c9d-8e2b-5f5f-ae3f-2b4e0e9e3d12\",\"8d0f0d0e-9f3c-6e6e-bf4e-3c5f1f0f4e23\",\"9e1e1e1f-0e4d-7f7f-ce5f-4d6e2e1e5f34\",\"0f2f2f2e-1f5e-8e8e-df6e-5e7f3f2f6e45\",\"1e3e3e3d-2e6f-9f9f-ee7f-6f8e4e3e7f56\",\"2f4f4f4c-3f7e-0e0e-ff8e-7f9f5f4f8e67\",\"3e5e5e5b-4e8d-1f1f-ee9f-8e0e6e5e9f78\",\"4f6f6f6a-5f9c-2e2e-dfae-9f1f7f6f0e89\",\"5e7e7e79-6e0b-3f3f-cebf-0e2e8e7e1f90\"],\"version\":\"v4\"}},\"singleUuid\":{\"summary\":\"Single UUID v7\",\"value\":{\"count\":1,\"maxPerCall\":200,\"uuids\":[\"018d5e8a-7b9c-7890-abcd-ef1234567890\"],\"version\":\"v7\"}}},\"schema\":{\"properties\":{\"count\":{\"description\":\"Number of UUIDs generated\",\"example\":10,\"type\":\"integer\"},\"maxPerCall\":{\"description\":\"Maximum number of UUIDs allowed per API call\",\"example\":200,\"type\":\"integer\"},\"uuids\":{\"description\":\"Array of generated UUIDs\",\"example\":[\"6b8f8b8c-7f1a-4f4e-9d2e-1a3d9f8d2c01\"],\"items\":{\"format\":\"uuid\",\"type\":\"string\"},\"type\":\"array\"},\"version\":{\"description\":\"UUID version used for generation\",\"example\":\"v4\",\"type\":\"string\"}},\"required\":[\"version\",\"count\",\"maxPerCall\",\"uuids\"],\"type\":\"object\"}}},\"description\":\"Successful UUID generation\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"invalidVersion\":{\"summary\":\"Invalid version\",\"value\":{\"error\":true,\"message\":\"Invalid version. Use v1|v2|v3|v4|v5|v6|v7|guid\",\"statusCode\":400,\"statusMessage\":\"Invalid version. Use v1|v2|v3|v4|v5|v6|v7|guid\",\"url\":\"https://toolkitvault.com/api/uuid-generator/v0\"}}},\"schema\":{\"properties\":{\"error\":{\"description\":\"Indicates an error occurred\",\"example\":true,\"type\":\"boolean\"},\"message\":{\"description\":\"Detailed error message\",\"example\":\"Invalid version. Use v1|v2|v3|v4|v5|v6|v7|guid\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"},\"statusMessage\":{\"description\":\"HTTP status message\",\"example\":\"Invalid version. Use v1|v2|v3|v4|v5|v6|v7|guid\",\"type\":\"string\"},\"url\":{\"description\":\"The requested URL that caused the error\",\"example\":\"https://toolkitvault.com/api/uuid-generator/v0\",\"type\":\"string\"}},\"required\":[\"error\",\"url\",\"statusCode\",\"statusMessage\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"429\":{\"content\":{\"application/json\":{\"example\":{\"error\":true,\"message\":\"Too Many Requests\",\"statusCode\":429,\"statusMessage\":\"Too Many Requests\",\"url\":\"https://toolkitvault.com/api/uuid-generator/v4\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Indicates an error occurred\",\"example\":true,\"type\":\"boolean\"},\"message\":{\"description\":\"Detailed error message\",\"example\":\"Invalid version. Use v1|v2|v3|v4|v5|v6|v7|guid\",\"type\":\"string\"},\"statusCode\":{\"description\":\"HTTP status code\",\"example\":400,\"type\":\"integer\"},\"statusMessage\":{\"description\":\"HTTP status message\",\"example\":\"Invalid version. Use v1|v2|v3|v4|v5|v6|v7|guid\",\"type\":\"string\"},\"url\":{\"description\":\"The requested URL that caused the error\",\"example\":\"https://toolkitvault.com/api/uuid-generator/v0\",\"type\":\"string\"}},\"required\":[\"error\",\"url\",\"statusCode\",\"statusMessage\",\"message\"],\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/uuid-generator/v4/{count}", "segments": [{ "lit": "api" }, { "lit": "uuid-generator" }, { "lit": "v4" }, { "var": "count" }], "select": { "exist": ["count", "format"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["v4"]] }, "key$": "v4n", "name__orig": "v4n", "Name": "V4n", "name_": "v4n", "name-": "v4n", "NAME": "V4N", "index$": 3 }, { "active": true, "entity": "v4n", "key$": "BasicV4nFlow", "kind": "basic", "name": "BasicV4nFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "v4n_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "v4n_ref01", "srcdatavar": "v4n_ref01_data", "suffix": "_dt0" }, "match": { "id": "v4n01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-v4n_ref01" } }], "index$": 1 }] }, 'V4n');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let v4n_ref01_data = Object.values(setup.data.existing.v4n)[0];
        // LIST
        const v4n_ref01_ent = client.V4n();
        const v4n_ref01_match = {};
        const v4n_ref01_list = (await v4n_ref01_ent.list(v4n_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/v4n/V4nTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.UuidGeneratorApi2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['v4n01', 'v4n02', 'v4n03', 'v401', 'v402', 'v403'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'UUID_GENERATOR_API2_TEST_V4N_ENTID': idmap,
        'UUID_GENERATOR_API2_TEST_LIVE': 'FALSE',
        'UUID_GENERATOR_API2_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['UUID_GENERATOR_API2_TEST_V4N_ENTID'];
    const live = 'TRUE' === env.UUID_GENERATOR_API2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['UUID_GENERATOR_API2_TEST_V4N_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.UuidGeneratorApi2SDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.UUID_GENERATOR_API2_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=V4nEntity.test.js.map