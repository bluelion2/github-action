const core = require('@actions/core');
const github = require('@actions/github');

try {
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  console.log("typeof payload", typeof payload)
  const changedComment = github.context.payload.comment.body
  const prBody = github.context.payload.issue.body

  console.log('changedComment', changedComment)
  console.log('prBody', prBody)

} catch (error) {
  core.setFailed(error.message);
}