const shell = require('shelljs')

const getLastCommitIdForBranch = branch =>
  shell.exec(`git show-ref --heads -s ${branch}`, { silent: true }).stdout.trim()

const getLastCommonCommitForBranches = (branch1, branch2) =>
  shell.exec(`git merge-base ${branch1} ${branch2}`, { silent: true }).stdout.trim()



console.log(getLastCommitIdForBranch('master'))
console.log(getLastCommitIdForBranch('branch-1'))
console.log(getLastCommonCommitForBranches('master', 'branch-1'))