import Promise from 'bluebird';
import log4js from 'log4js';

import { gitHubClient } from '../clients/gitHubClient';
import { slackClient } from '../clients/slackClient';
import { pivotalTrackerClient } from '../clients/pivotalTrackerClient';

const log = log4js.getLogger('teamFacade');

const gitHubOrganization = process.env.GITHUB_ORGANIZATION;
const defaultGitHubUser = 'q-ode';

const teamFacade = {
  setupNewTeamAndProject(team, project){

    const slackGroups = [`${team}`, `${team}-team`, `${team}-standups`];

    // Note: Promise.all has been hacked to prevent it from failing if one fails
    return Promise.all([

        gitHubClient.createOrganizationRepository(`${team}-${project}`, gitHubOrganization),

        gitHubClient.addUserToRepository(defaultGitHubUser, `${team}-${project}`),

        slackClient.createGroups(slackGroups),

        pivotalTrackerClient.createProject(`${team}-${project}`)
      ]
        .map(promise => promise.catch(error => error))
    );
  }
};

module.exports = { teamFacade };