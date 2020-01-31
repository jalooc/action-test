import * as core from '@actions/core'
import * as github from '@actions/github'

const run = async () => {
  try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet')
    console.log(`Hello ${nameToGreet}!`)
    const time = (new Date()).toTimeString()
    core.setOutput("time", time)

    console.log(JSON.stringify(github.context, undefined, 2))

  } catch (error) {
    core.setFailed(error.message)
  }
}

run()