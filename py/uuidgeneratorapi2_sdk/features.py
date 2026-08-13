# UuidGeneratorApi2 SDK feature factory

from uuidgeneratorapi2_sdk.feature.base_feature import UuidGeneratorApi2BaseFeature
from uuidgeneratorapi2_sdk.feature.test_feature import UuidGeneratorApi2TestFeature


def _make_feature(name):
    features = {
        "base": lambda: UuidGeneratorApi2BaseFeature(),
        "test": lambda: UuidGeneratorApi2TestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
