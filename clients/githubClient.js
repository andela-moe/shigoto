const Promise = require('bluebird');
const log = require('log4js').getLogger('githubClient');
const request = require('requestretry');

const gitHubClient = {

  options: {
    baseUrl: process.env.GITHUB_API_BASE_URL,
    fullResponse: false,
    json: true,
    headers: {
      'User-Agent': process.env.GITHUB_USER_AGENT,
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${process.env.GITHUB_USER_TOKEN}`
    }
  },

  createRepository(name) {
    const options = this.options;

    options.uri = '/user/repos';
    options.body = {
      name: name
    };

    request.post(options)
      .then(response => {
        log.info(response);
      })
      .catch(error => {
        log.error(error);
      });
  },

  createOrganizationRepository(name, organization) {
    return new Promise((resolve, reject) => {
      const options = this.options;

      options.uri = `/orgs/${organization}/repos`;
      options.body = {
        name: name
      };

      request.post(options)
        .then(response => {

          if (response.errors) {
            reject(response.errors
              .map(error => error.message)
              .join(' ,'));
          } else {
            resolve();
          }
        })
        .catch(error => {
          log.error(error);
        });
    });
  }
};

module.exports = gitHubClient;