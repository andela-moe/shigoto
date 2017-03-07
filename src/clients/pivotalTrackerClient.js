import Promise from 'bluebird';
import log4js from 'log4js';
import request from 'requestretry';

const pivotalTrackerClient = {
  baseUrl: process.env.PIVOTAL_TRACKER_BASE_API_URL,
  token: process.env.PIVOTAL_TRACKER_TOKEN,
  accountId: process.env.PIVOTAL_TRACKER_ACCOUNT_ID,

  options: {
    baseUrl: this.baseUrl,
    json: true,
    fullResponse: false,
    headers: {
      'Content-Type': 'application/json',
      'X-TrackerToken': this.token
    }
  },

  createProject(name) {
    return new Promise((resolve, reject) => {
      const options = this.options;

      options.uri = '/projects';
      options.formData = {
        name,
        account_id: this.accountId
      };

      request.post(options)
        .then(body => (body.kind !== 'error' ?
          resolve('Pivotal Tracker: successful.')
            : reject(`Pivotal Tracker: ${body.general_problem}`)
        ))
        .catch((error) => {
          reject(error);
        });
    });
  },

};

module.exports = { pivotalTrackerClient };
