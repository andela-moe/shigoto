const slackAuth = {
  verifyToken(req, res, next) {
    const token = req.body.token;

    if (!token) {
      return res.status(401).send({ text: 'Unauthorized Access' });
    }

    if (token !== process.env.SLACK_APP_TOKEN) {
      return res.status(401).send({ text: 'Invalid Token' });
    }

    next();
  }
};

module.exports = { slackAuth };
