import * as core from '@actions/core'
import * as github from '@actions/github'
import shell from 'shell-exec'

const getLastCommitForBranch = async branch =>
  (await shell(`git show-ref --heads -s ${branch}`)).stdout.trim()

const getLastCommonCommitForBranches = async (branch1, branch2) =>
  (await shell(`git merge-base ${branch1} ${branch2}`)).stdout.trim()

const targetBranch = github.context.payload.pull_request.base.ref
const sourceBranch = github.context.payload.pull_request.head.ref

console.log('Detected target branch:', targetBranch)
console.log('Detected source branch:', sourceBranch)

Promise.all([
  getLastCommitForBranch(targetBranch),
  getLastCommitForBranch(sourceBranch),
]).then(([targetBranchLastCommit, sourceBranchLastCommit]) =>
  getLastCommonCommitForBranches(targetBranch, sourceBranch).then(lastCommonCommit => {
    console.log('Detected last commit on target branch:', targetBranchLastCommit)
    console.log('Detected last commit on source branch:', sourceBranchLastCommit)

    const isBranchRebased = targetBranchLastCommit === lastCommonCommit

    console.log(
      'Last common commit is:',
      lastCommonCommit,
      ', so',
      isBranchRebased ? 'branch is already rebased' : 'rebase is required.',
    )

    if (!isBranchRebased) core.setFailed(`Branch $${sourceBranch} has to be rebased on ${targetBranch}`)
  })
).catch(e => core.setFailed(e.message))
