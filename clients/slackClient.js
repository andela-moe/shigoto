const Promise = require('bluebird');
const log = require('log4js').getLogger('slackClient');
const request = require('requestretry');

const baseUrl = process.env.SLACK_BASE_API_URL;
const token = process.env.SLACK_TOKEN;

const slackClient = {
  createGroup(name) {
    return new Promise((resolve, reject) => {
      const options = {
        baseUrl: baseUrl,
        json: true,
        fullResponse: false,
        uri: '/groups.create',
        formData: {
          token: token,
          name: name
        }
      };

      request.post(options)
        .then(body => {
          if (body.ok) {
            resolve();
          } else {
            reject(body.error);
          }
        })
        .catch(error => {
          reject(error);
        });
    })
  },

  createGroups(names) {
    return new Promise((resolve, reject) => {
      Promise.map(names, name => {
        this.createGroup(name)
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  }
};

module.exports = slackClient;