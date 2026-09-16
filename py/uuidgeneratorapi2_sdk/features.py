# UuidGeneratorApi2 SDK feature factory

from uuidgeneratorapi2_sdk.feature.base_feature import UuidGeneratorApi2BaseFeature
from uuidgeneratorapi2_sdk.feature.ratelimit_feature import UuidGeneratorApi2RatelimitFeature
from uuidgeneratorapi2_sdk.feature.retry_feature import UuidGeneratorApi2RetryFeature
from uuidgeneratorapi2_sdk.feature.test_feature import UuidGeneratorApi2TestFeature
from uuidgeneratorapi2_sdk.feature.timeout_feature import UuidGeneratorApi2TimeoutFeature


_FEATURES = {
    "base": lambda: UuidGeneratorApi2BaseFeature(),
    "ratelimit": lambda: UuidGeneratorApi2RatelimitFeature(),
    "retry": lambda: UuidGeneratorApi2RetryFeature(),
    "test": lambda: UuidGeneratorApi2TestFeature(),
    "timeout": lambda: UuidGeneratorApi2TimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
