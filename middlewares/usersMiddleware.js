const fs = require('fs').promises;

exports.checkUserId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id.length < 10) throw Error('Invalid id');

    const dataFromDB = await fs.readFile('./models.json');
    const users = JSON.parse(dataFromDB);
    const user = users.find((item) => item.id === id);

    if (!user) {
      return res.status(404).json({
        msg: 'User does not exist...',
      });
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
