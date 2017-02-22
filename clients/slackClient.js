const log = require('log4js').getLogger('slackClient');
const async = require('async');
const request = require('request');

const baseUrl = process.env.SLACK_BASE_API_URL;
const token = process.env.SLACK_TOKEN;

const slackClient = {
  createGroup(name, callback) {
    const options = {
      baseUrl: baseUrl,
      json: true,
      uri: '/groups.create',
      formData: {
        token: token,
        name: name
      }
    };

    request.post(options, (error, response, body) => {

      if (!error && response.statusCode == 200 && body.ok) {
        callback(null, body);
      } else {
        callback(body.error, body);
      }
    })
  },

  createGroups(names, callback) {
    async.map(names, this.createGroup, (error, response) => {
      if (!error) {
        callback(null, response);
      } else {
        callback(error, response);
      }
    });
  }
};

module.exports = slackClient;