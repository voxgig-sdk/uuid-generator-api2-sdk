# UuidGeneratorApi2 SDK exists test

import pytest
from uuidgeneratorapi2_sdk import UuidGeneratorApi2SDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = UuidGeneratorApi2SDK.test(None, None)
        assert testsdk is not None
