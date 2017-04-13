import Promise from 'bluebird';
import request from 'requestretry';

const pivotalTrackerClient = {
  accountId: process.env.PIVOTAL_TRACKER_ACCOUNT_ID,

  options: {
    baseUrl: process.env.PIVOTAL_TRACKER_BASE_API_URL,
    json: true,
    fullResponse: false,
    headers: {
      'Content-Type': 'application/json',
      'X-TrackerToken': process.env.PIVOTAL_TRACKER_TOKEN
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
          resolve(body.id)
            : reject(`Pivotal Tracker: ${body.general_problem}`)
        ))
        .catch((error) => {
          reject(error);
        });
    });
  },

  addUserToProject(projectId, userEmail = 'adebayo.adesanya@andela.com') {
    return new Promise((resolve, reject) => {
      const options = this.options;

      options.uri = `/projects/${projectId}/memberships`;
      options.formData = {
        email: userEmail,
        role: 'owner'
      };

      request.post(options)
        .then(body => (body.kind !== 'error' ?
          resolve('Pivotal Tracker: user added successfully.') :
          reject(`Pivotal Tracker: ${body.general_problem}`)))
        .catch((error) => {
          reject(error);
        });
    });
  },

  createProjectAndAddUser(projectName) {
    return new Promise((resolve, reject) => {
      this.createProject(projectName)
        .then((projectId) => {
          this.addUserToProject(projectId)
            .then(() => {
              resolve('Pivotal Tracker: successful');
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

};

module.exports = { pivotalTrackerClient };
