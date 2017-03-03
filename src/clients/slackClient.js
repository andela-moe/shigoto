import Promise from 'bluebird';
import request from 'requestretry';

const baseUrl = process.env.SLACK_BASE_API_URL;
const token = process.env.SLACK_TOKEN;

const slackClient = {
  createGroup(name) {
    return new Promise((resolve, reject) => {
      const options = {
        baseUrl,
        json: true,
        fullResponse: false,
        uri: '/groups.create',
        formData: { token, name }
      };

      request.post(options)
        .then((body) => {
          if (body.ok) {
            resolve();
          } else {
            reject(body.error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  createGroups(names) {
    return new Promise((resolve, reject) => {
      Promise.map(names, (name) => {
        this.createGroup(name)
          .then(() => {
            resolve(`Slack: ${names.join(', ')} created successfully.`);
          })
          .catch((error) => {
            reject(`Slack: ${error}`);
          });
      });
    });
  }
};

module.exports = { slackClient };
