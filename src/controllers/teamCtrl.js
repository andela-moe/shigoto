import log4js from 'log4js';
import { teamFacade } from '../facades/teamFacade';

const log = log4js.getLogger('teamFacade');

const teamsCtrl = {
  create(req, res) {
    log.info(req);
    const team = req.body.team;
    const project = req.body.project;

    teamFacade.setupNewTeamAndProject(team, project)
      .then((message) => {
        res.send(message);
      });
  }
};

module.exports = { teamsCtrl };
