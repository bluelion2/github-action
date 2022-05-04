const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios')
const Buffer = require('buffer')


const action = axios.create({
  baseUrl: 'https://freewheelin.atlassian.net/rest/api/3',
  headers: {
    'Authorization': `Basic ${Buffer.from(
      'ksh0228@mathflat.com:G46Tsw7PCPTgv9OJUGmM8AB5'
    ).toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
})

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
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper.",
            "type": "text"
          }
        ]
      }
    ]
  }
}`;



try {
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  console.log("typeof payload", typeof payload)
  const changedComment = github.context.payload.comment.body
  const prBody = github.context.payload.issue.body

  console.log('changedComment', changedComment)
  console.log('prBody', prBody)
  
  // const jiraUrl = (() => {
  //   const index = prBody.slice('https')
  //   if (!index) return 
  //   return prBody.slice(index, prBody.length)
  // })()
  
  // if (jiraUrl) {
  //   console.log('jiraUrl', jiraUrl)
  // }

  // https://freewheelin.atlassian.net/browse/MATH2SP-431
  const issueKey =  'MATH2SP-431'

  action.post(`/issue/${issueKey}/comment`, { body })


} catch (error) {
  core.setFailed(error.message);
}