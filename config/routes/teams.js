const router = require('express').Router();
const teamsCtrl = require('../../controllers/teamCtrl');

router.route('/new')
  .post(teamsCtrl.create);


module.exports = router;
