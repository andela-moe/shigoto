const teams = require('./teams');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ message: 'success' });
  });
;
  app.use('/teams', teams);
};
