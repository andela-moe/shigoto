import { teamsRouter } from './teams';

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ message: 'success' });
  });

  app.use('/teams', teamsRouter);
};
