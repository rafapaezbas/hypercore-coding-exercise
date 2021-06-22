const axios = require('axios')

const termrover = {}

termrover.latest = async () => {
  const response = await requestRetry(() => axios.get('https://hiring.hypercore-protocol.org/termrover/latest'), 3, 1000)
  return response.data
}

termrover.index = async (id) => {
  const response = await requestRetry(() => axios.get('https://hiring.hypercore-protocol.org/termrover/' + id), 3, 1000)
  return response.data
}

termrover.stream = async function * (from, to) {
  let index = from
  while (index <= to) {
    yield requestRetry(() => axios.get('https://hiring.hypercore-protocol.org/termrover/' + index), 3, 1000)
    index++
  }
}

const requestRetry = async (request, times, interval) => {
  try {
    return await request()
  } catch (err) {
    if (times > 0) {
      await sleep(interval)
      return await requestRetry(request, times - 1, interval)
    } else {
      throw err
    }
  }
}

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

module.exports = termrover
