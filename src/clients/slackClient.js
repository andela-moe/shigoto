import Promise from 'bluebird';
import request from 'requestretry';

const slackClient = {
  token: process.env.SLACK_TOKEN,

  options: {
    baseUrl: process.env.SLACK_BASE_API_URL,
    json: true,
    fullResponse: false,
  },

  createGroup(name) {
    return new Promise((resolve, reject) => {
      const options = this.options;

      options.url = '/groups.create';
      options.formData = { name, token: this.token };

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
