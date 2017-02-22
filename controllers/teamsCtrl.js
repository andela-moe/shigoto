const log = require('log4js').getLogger('teamCtrl');
const githubClient = require('../clients/githubClient');
const slackClient = require('../clients/slackClient');

const teamsCtrl = {
  create(req, res) {
    const team = req.body.team;
    const project = req.body.project;

    const teams = [`${team}`, `${team}-team`, `${team}-standups`];

    slackClient.createGroups(teams, (error, body) => {

      if (!error) {
        res.send({message: 'Groups created successfully.'});
      } else {
        res.status(400)
          .send({message: error});
      }
    });
  }
};

module.exports = teamsCtrl;
