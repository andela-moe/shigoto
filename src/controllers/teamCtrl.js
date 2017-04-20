import { teamFacade } from '../facades/teamFacade';

const teamsCtrl = {
  create(req, res) {
    const payload = req.body.text;
    const setupInfo = payload.split(' ');

    if (setupInfo.length !== 2) {
      res.status(400).send({ text: 'Invalid Request' });
    }

    const team = setupInfo[0];
    const project = setupInfo[1];

    teamFacade.setupNewTeamAndProject(team, project)
      .then((message) => {
        res.send({ text: message.join('\n') });
      });
  }
};

module.exports = { teamsCtrl };
