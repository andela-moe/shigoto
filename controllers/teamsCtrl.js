const log = require('log4js').getLogger('teamCtrl');
const githubClient = require('../clients/githubClient');
const slackClient = require('../clients/slackClient');
const pivotalTrackerClient = require('../clients/pivotalTrackerClient');

const teamsCtrl = {
  create(req, res) {
    const team = req.body.team;
    const project = req.body.project;

    const slackGroups = [`${team}`, `${team}-team`, `${team}-standups`];

    const errors = [];
    const messages = [];

    slackClient.createGroups(slackGroups, (error, body) => {
      if (!error) {

        pivotalTrackerClient.createProject(`${team}-${project}`, (error, body) => {
          if (!error) {
          } else {
            errors.push(`Pivotal Tracker: ${error}`);
          }
        });
      } else {
        errors.push(`Slack: ${error}`);
      }

      if (errors.length > 0) {
        res.status(400)
          .send({message: errors});
      } else {
        res.send({message: 'Beast ran successfully.'});
      }
    });


  }
};

module.exports = teamsCtrl;
