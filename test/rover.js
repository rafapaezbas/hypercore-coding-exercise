const test = require('tape')
const termrover = require('../lib/rover')

test('latest should work', async (t) => {
  const result = await termrover.latest()
  t.plan(2)
  t.timeoutAfter(10000)
  t.ok(result)
  t.ok(result.images.ascii.length > 0)
})

test('index should work when index is higher than -1', async (t) => {
  const result = await termrover.index(1)
  t.plan(2)
  t.timeoutAfter(10000)
  t.ok(result)
  t.ok(result.images.ascii.length > 0)
})

test('index should not work when index is lower than 0', async (t) => {
  t.plan(1)
  t.timeoutAfter(10000)
  try {
    await termrover.index(-1)
    t.fail('should return 404')
  } catch (err) {
    t.equal(err.response.status, 404)
  }
})

test('should stream specific indexes', async (t) => {
  t.plan(4)
  t.timeoutAfter(30000)
  const iterator = termrover.stream(0, 2)
  const first = await iterator.next()
  t.equal(first.done, false)
  const second = await iterator.next()
  t.equal(second.done, false)
  const third = await iterator.next()
  t.equal(third.done, false)
  const fourth = await iterator.next()
  t.equal(fourth.done, true)
})
