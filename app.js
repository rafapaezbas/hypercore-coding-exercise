const yargs = require('yargs')
const termrover = require('./lib/rover')

const argv = yargs
  .usage('$0 [--index number || --slideshow number]')
  .options({
    index: {
      description: 'Display image with specific index',
      type: 'number',
      conflicts: 'slideshow'
    },
    slideshow: {
      description: 'Display slideshow of all images with specified milliseconds interval',
      type: 'number',
      conflicts: 'index'
    }
  }).version('0.0.1').help().argv

const printIndex = async (index) => {
  try {
    const response = await termrover.index(index)
    printPicture(response)
  } catch (err) {
    printError(err)
  }
}

const printStream = async (interval) => {
  const from = 0
  const to = (await termrover.latest()).index
  const iterator = termrover.stream(from, to)
  for await (const i of iterator) {
    printPicture(i.data)
    await sleep(interval)
  }
}

const formatMetadata = (metadata) => {
  return '\n Id: ' + metadata.id + ' Camera name: ' + metadata.camera.name + ' Earth date: ' + metadata.earth_date
}

const printPicture = (response) => {
  console.log(response.images.ascii)
  console.log(formatMetadata(response.metadata))
}

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const printError = (err) => {
  console.log('Error: ' + err.config.url + ' returned code ' + err.response.status + ' (' + err.response.statusText + ')')
}

if (argv.index !== undefined && !isNaN(argv.index)) {
  printIndex(argv.index)
} else if (argv.slideshow !== undefined && !isNaN(argv.slideshow)) {
  printStream(argv.slideshow)
} else {
  yargs.showHelp()
}
