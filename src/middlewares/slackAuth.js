const slackAuth = {
  verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ message: 'Unauthorized Access' });
    }

    if (token !== process.env.SLACK_AUTH_TOKEN) {
      return res.status(401).send({ message: 'Invalid Token' });
    }

    next();
  }
};

module.exports = slackAuth;
