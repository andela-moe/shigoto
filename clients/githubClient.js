const log = require('log4js').getLogger('githubClient');
const request = require('request');

const gitHubClient = {
  options: {
    baseUrl: 'https://api.github.com',
    json: true,
    headers: {
      'User-Agent': 'q-ode',
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': 'token ff4b5c9a8e8c94b6dd1469f18f3127c9da28647a'
    }
  },

  createRepository(name, callback) {
    const options = this.options;

    options.uri = '/user/repos';
    options.formData = {
      name: name
    };

    request.post(options, (error, response, body) => {
      if (!error && response.statusCode == 201) {
        callback({status: true});
      } else {
        callback({status: false, body: body});
      }
    })
  }
};

module.exports = gitHubClient;