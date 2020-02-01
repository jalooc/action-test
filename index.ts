import * as core from '@actions/core'
import * as github from '@actions/github'
import * as shell from 'shelljs'

const getLastCommitForBranch = branch =>
  shell.exec(`git show-ref --heads -s ${branch}`, { silent: true }).stdout.trim()

const getLastCommonCommitForBranches = (branch1, branch2) =>
  shell.exec(`git merge-base ${branch1} ${branch2}`, { silent: true }).stdout.trim()

try {
  const targetBranch = github.context.payload.pull_request.base.ref
  const sourceBranch = github.context.payload.pull_request.head.ref

  const targetBranchLastCommit = getLastCommitForBranch(targetBranch)
  const sourceBranchLastCommit = getLastCommitForBranch(sourceBranch)

  const lastCommonCommit = getLastCommonCommitForBranches(targetBranch, sourceBranch)

  console.log('Detected target branch:', targetBranch)
  console.log('Detected source branch:', sourceBranch)

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
} catch (error) {
  core.setFailed(error.message)
}