const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios')

try {
  const changedComment = github.context.payload.comment.body
  const prBody = github.context.payload.issue.body
  const jiraToken = core.getInput('jira-token')

  // preview url
  // /review.+(https?\S+\.vercel\.app)/
  // jira url
  // /(https?:\/\/freewheelin\.atlassian\.net\/browse\/(\S+\-[0-9]+))/
  
  const vercelRegExp = changedComment.match(/review.+(https?\S+\.vercel\.app)/)
  const jiraRegExp = prBody.match(/(https?:\/\/freewheelin\.atlassian\.net\/browse\/(\S+\-[0-9]+))/)
  
  if (vercelRegExp && jiraRegExp) {
    const [,vercelUrl] = vercelRegExp
    const [, jiraUrl,issueKey] = jiraRegExp
  
    if (vercelUrl && jiraUrl) {
      
      const auth = `Basic ${Buffer.from(
        `ksh0228@mathflat.com:${jiraToken}`
      ).toString('base64')}`
  
      console.log('auth', auth)
      const body = `{
        "body": {
          "type": "doc",
          "version": 1,
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Hello world",
                  "marks": [
                    {
                      "type": "link",
                      "attrs": {
                        "href": "http://atlassian.com",
                        "title": "Atlassian"
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      }`;

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
  }
 
} catch (error) {
  core.setFailed(error.message);
}