const Promise = require('bluebird');
const log = require('log4js').getLogger('pivotalTrackerClient');
const request = require('requestretry');

const baseUrl = process.env.PIVOTAL_TRACKER_BASE_API_URL;
const token = process.env.PIVOTAL_TRACKER_TOKEN;
const accountId = process.env.PIVOTAL_TRACKER_ACCOUNT_ID;

const options = {
  baseUrl: baseUrl,
  json: true,
  fullResponse: false,
  headers: {
    'Content-Type': 'application/json',
    'X-TrackerToken': token
  }
};

const pivotalTrackerClient = {
  createProject(name) {
    return new Promise((resolve, reject) => {
      let opt = {};
      opt = Object.assign(opt, options);

      opt.uri = '/projects';
      opt.formData = {
        name: name,
        account_id: accountId
      };

      request.post(opt)
        .then(body => {
          return body.kind !== 'error' ? resolve('Pivotal Tracker: successful.') : reject(`Pivotal Tracker: ${body.general_problem}`);
        })
        .catch(error => {
          reject(error);
        });

    });
  }

};

module.exports = pivotalTrackerClient;