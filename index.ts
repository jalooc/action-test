import * as core from '@actions/core'
import * as github from '@actions/github'
import git from 'nodegit'

const getLastCommitOidForBranch = (repo, branch) =>
  repo.getBranchCommit(branch).then(commit => commit.toString())

;(async () => {
  try {
    const targetBranch = github.context.payload.pull_request.base.ref
    const sourceBranch = github.context.payload.pull_request.head.ref

    console.log('Detected target branch:', targetBranch)
    console.log('Detected source branch:', sourceBranch)

    await git.Repository.open('.').then(async repo => {
      const [targetBranchLastCommit, sourceBranchLastCommit] = await Promise.all([
        getLastCommitOidForBranch(repo, targetBranch),
        getLastCommitOidForBranch(repo, sourceBranch)
      ])

      console.log('Detected last commit on target branch:', targetBranchLastCommit)
      console.log('Detected last commit on source branch:', sourceBranchLastCommit)

      const lastCommonCommit = (await git.Merge.base(repo, targetBranchLastCommit, sourceBranchLastCommit)).toString()

      const isBranchRebased = targetBranchLastCommit === lastCommonCommit

      console.log(
        'Last common commit is:',
        lastCommonCommit,
        ', so',
        isBranchRebased ? 'branch is already rebased' : 'rebase is required',
      )

      if (!isBranchRebased) core.setFailed(`Branch $${sourceBranch} has to be rebased on ${targetBranch}`)
    })

  } catch (error) {
    core.setFailed(error.message)
  }
})()