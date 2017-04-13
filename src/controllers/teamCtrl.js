import rollbar from 'rollbar';

import { teamFacade } from '../facades/teamFacade';

rollbar.init(process.env.ROLLBAR_ACCESS_TOKEN);

const teamsCtrl = {
  create(req, res) {
    rollbar.reportMessage(`Request: ${req.body.text}`);
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
