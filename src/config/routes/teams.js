import router from 'express';
import { teamsCtrl } from '../../controllers/teamCtrl';
import { slackAuth } from '../../middlewares/slackAuth';

const teamsRouter = router.Router();

teamsRouter.route('/new')
  .post(slackAuth.verifyToken, teamsCtrl.create);

module.exports = { teamsRouter };
