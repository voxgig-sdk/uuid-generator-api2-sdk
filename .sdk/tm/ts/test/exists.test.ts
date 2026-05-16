
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UuidGeneratorApi2SDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await UuidGeneratorApi2SDK.test()
    equal(null !== testsdk, true)
  })

})
