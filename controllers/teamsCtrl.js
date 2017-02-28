const log = require('log4js').getLogger('teamCtrl');

const githubClient = require('../clients/githubClient');
const slackClient = require('../clients/slackClient');
const pivotalTrackerClient = require('../clients/pivotalTrackerClient');

const teamsCtrl = {
  create(req, res) {
    const team = req.body.team;
    const project = req.body.project;

    const slackGroups = [`${team}`, `${team}-team`, `${team}-standups`];

    const messages = [];
    const errors = [];

    githubClient.createOrganizationRepository(`${team}-${project}`, 'testqode')
      .then(() => {
        messages.push('GitHub: repo created successfully.')
      })
      .catch(error => {
        errors.push(`GitHub: ${error}`)
      });

    slackClient.createGroups(slackGroups)
      .then(() => {
        messages.push(`Slack: ${slackGroups.join(', ')} created successfully.`)
      })
      .catch(error => {
        errors.push(error);
      });

    pivotalTrackerClient.createProject(`${team}-${project}`)
      .then(body => {
        messages.push(`Pivotal Tracker: successful.`);
      })
      .catch(error => {
        errors.push(`Pivotal Tracker: ${error.general_problem}`);
      });


  }
}

module.exports = teamsCtrl;
