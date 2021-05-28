const axios = require('axios')

const termrover = () => {}

termrover.latest = async () => {
  const response = await axios.get('https://hiring.hypercore-protocol.org/termrover/latest')
  return response.data
}

termrover.index = async (id) => {
  const response = await axios.get('https://hiring.hypercore-protocol.org/termrover/' + id)
  return response.data
}

termrover.stream = async function * (from, to) {
  let index = from
  while (index <= to) {
    yield axios.get('https://hiring.hypercore-protocol.org/termrover/' + index)
    index++
  }
}

module.exports = termrover
