const log = require('log4js').getLogger('teamCtrl');

const teamFacade = require('../facades/teamFacade');

const teamsCtrl = {
  create(req, res) {
    const team = req.body.team;
    const project = req.body.project;

    teamFacade.setupNewTeamAndProject(team, project)
      .then(message => {
        res.send(message);
      });
  }
}

module.exports = teamsCtrl;
