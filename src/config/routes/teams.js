import router from 'express';
import { teamsCtrl } from '../../controllers/teamCtrl';

const teamsRouter = router.Router();

teamsRouter.route('/new')
  .post(teamsCtrl.create);

module.exports = { teamsRouter };
