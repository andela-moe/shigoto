const log = require('log4js').getLogger('pivotalTrackerClient');
const request = require('request');

const baseUrl = process.env.PIVOTAL_TRACKER_BASE_API_URL;
const token = process.env.PIVOTAL_TRACKER_TOKEN;
const accountId = process.env.PIVOTAL_TRACKER_ACCOUNT_ID;

const options = {
  baseUrl: baseUrl,
  json: true,
  headers: {
    'Content-Type': 'application/json',
    'X-TrackerToken': token
  }
};

const pivotalTrackerClient = {
  createProject(name, callback) {
    let opt = {};
    opt = Object.assign(opt, options);

    opt.uri = '/projects';
    opt.formData = {
      name: name,
      account_id: accountId
    };

    request.post(opt, (error, response, body) => {

      if (!error && response.statusCode == 200 && body.id) {
        callback(null, body);
      } else {
        callback(body.error, body);
      }
    })
  }

};

module.exports = pivotalTrackerClient;