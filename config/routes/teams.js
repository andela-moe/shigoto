const router = require('express').Router();
const teamsCtrl = require('../../controllers/teamsCtrl');

router.route('/new')
  .post(teamsCtrl.create);


module.exports = router;
