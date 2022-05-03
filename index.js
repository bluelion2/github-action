const core = require('@actions/core');
const github = require('@actions/github');

try {
  const changedComment = github.context.payload.comment.body
  const prBody = github.context.payload.issue.body

  console.log('changedComment', changedComment)
  console.log('prBody', prBody)

} catch (error) {
  core.setFailed(error.message);
}