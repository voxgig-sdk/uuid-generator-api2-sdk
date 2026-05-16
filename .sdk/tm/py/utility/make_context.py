# UuidGeneratorApi2 SDK utility: make_context

from core.context import UuidGeneratorApi2Context


def make_context_util(ctxmap, basectx):
    return UuidGeneratorApi2Context(ctxmap, basectx)
