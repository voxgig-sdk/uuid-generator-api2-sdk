# UuidGeneratorApi2 SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import UuidGeneratorApi2Utility
from core.spec import UuidGeneratorApi2Spec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import UuidGeneratorApi2BaseFeature
from features import _make_feature


class UuidGeneratorApi2SDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = UuidGeneratorApi2Utility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return UuidGeneratorApi2Utility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = UuidGeneratorApi2Spec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    def Guid(self, data=None) -> "GuidEntity":
        """Entity factory: client.Guid().list() / client.Guid().load({"id": ...})."""
        from entity.guid_entity import GuidEntity
        return GuidEntity(self, data)


    def V1n(self, data=None) -> "V1nEntity":
        """Entity factory: client.V1n().list() / client.V1n().load({"id": ...})."""
        from entity.v1n_entity import V1nEntity
        return V1nEntity(self, data)


    def V1n2(self, data=None) -> "V1n2Entity":
        """Entity factory: client.V1n2().list() / client.V1n2().load({"id": ...})."""
        from entity.v1n2_entity import V1n2Entity
        return V1n2Entity(self, data)


    def V3n(self, data=None) -> "V3nEntity":
        """Entity factory: client.V3n().list() / client.V3n().load({"id": ...})."""
        from entity.v3n_entity import V3nEntity
        return V3nEntity(self, data)


    def V3n2(self, data=None) -> "V3n2Entity":
        """Entity factory: client.V3n2().list() / client.V3n2().load({"id": ...})."""
        from entity.v3n2_entity import V3n2Entity
        return V3n2Entity(self, data)


    def V4n(self, data=None) -> "V4nEntity":
        """Entity factory: client.V4n().list() / client.V4n().load({"id": ...})."""
        from entity.v4n_entity import V4nEntity
        return V4nEntity(self, data)


    def V4n2(self, data=None) -> "V4n2Entity":
        """Entity factory: client.V4n2().list() / client.V4n2().load({"id": ...})."""
        from entity.v4n2_entity import V4n2Entity
        return V4n2Entity(self, data)


    def V5n(self, data=None) -> "V5nEntity":
        """Entity factory: client.V5n().list() / client.V5n().load({"id": ...})."""
        from entity.v5n_entity import V5nEntity
        return V5nEntity(self, data)


    def V5n2(self, data=None) -> "V5n2Entity":
        """Entity factory: client.V5n2().list() / client.V5n2().load({"id": ...})."""
        from entity.v5n2_entity import V5n2Entity
        return V5n2Entity(self, data)


    def V6n(self, data=None) -> "V6nEntity":
        """Entity factory: client.V6n().list() / client.V6n().load({"id": ...})."""
        from entity.v6n_entity import V6nEntity
        return V6nEntity(self, data)


    def V6n2(self, data=None) -> "V6n2Entity":
        """Entity factory: client.V6n2().list() / client.V6n2().load({"id": ...})."""
        from entity.v6n2_entity import V6n2Entity
        return V6n2Entity(self, data)


    def V7n(self, data=None) -> "V7nEntity":
        """Entity factory: client.V7n().list() / client.V7n().load({"id": ...})."""
        from entity.v7n_entity import V7nEntity
        return V7nEntity(self, data)


    def V7n2(self, data=None) -> "V7n2Entity":
        """Entity factory: client.V7n2().list() / client.V7n2().load({"id": ...})."""
        from entity.v7n2_entity import V7n2Entity
        return V7n2Entity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "UuidGeneratorApi2SDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from entity.guid_entity import GuidEntity
    from entity.v1n_entity import V1nEntity
    from entity.v1n2_entity import V1n2Entity
    from entity.v3n_entity import V3nEntity
    from entity.v3n2_entity import V3n2Entity
    from entity.v4n_entity import V4nEntity
    from entity.v4n2_entity import V4n2Entity
    from entity.v5n_entity import V5nEntity
    from entity.v5n2_entity import V5n2Entity
    from entity.v6n_entity import V6nEntity
    from entity.v6n2_entity import V6n2Entity
    from entity.v7n_entity import V7nEntity
    from entity.v7n2_entity import V7n2Entity
