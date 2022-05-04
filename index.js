const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios')

const issueKey =  'MATH2SP-431'



try {
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);

  // console.log("typeof payload", typeof payload)
  const changedComment = github.context.payload.comment.body
  const prBody = github.context.payload.issue.body

  console.log('changedComment', changedComment)
  console.log('prBody', prBody)
  // fetch(`https://freewheelin.atlassian.net/rest/api/3/issue/${issueKey}/comment`, {
  //   headers: {
  //     'Authorization': `Basic ${Buffer.from(
  //       'ksh0228@mathflat.com:G46Tsw7PCPTgv9OJUGmM8AB5'
  //     ).toString('base64')}`,
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body
  // })

  // preview url
  // /review.+(https?\S+\.vercel\.app)/
  // jira url
  // /(https?:\/\/freewheelin\.atlassian\.net\/browse\/(\S+\-[0-9]+))/
  const [, vercelUrl] = changedComment.match(/review.+(https?\S+\.vercel\.app)/)

  const [, jiraUrl,issueKey] = prBody.match(/(https?:\/\/freewheelin\.atlassian\.net\/browse\/(\S+\-[0-9]+))/)
  console.log('jiraUrl', jiraUrl)
  console.log('vercelUrl', vercelUrl)
  if (vercelUrl && jiraUrl) {
    
    const auth = `Basic ${Buffer.from(
      'ksh0228@mathflat.com:ieyv6sldxxY1D8Z81UEaAB12'
    ).toString('base64')}`

    console.log('auth', auth)
    const body = `{
      "visibility": {
        "identifier": "Administrators",
        "type": "role",
        "value": "Administrators"
      },
      "body": {
        "type": "doc",
        "version": 1,
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "text": "preview url : ${vercelUrl}",
                "type": "text"
              }
            ]
          }
        ]
      }
    }`;

    console.log('body', body)

    const action = axios.create({
      baseURL: 'https://freewheelin.atlassian.net/rest/api/3',
      headers: {
        'Authorization': auth,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })

    action.post(`/issue/${issueKey}/comment`, body)
  }
} catch (error) {
  core.setFailed(error.message);
}