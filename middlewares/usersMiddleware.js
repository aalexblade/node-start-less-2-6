const fs = require('fs').promises;

exports.checkUserId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const dataFromDB = await fs.readFile('./models.json');
    const users = JSON.parse(dataFromDB);
    const user = users.find((user) => user.id === id);

    if (!user) {
      return res.status(404).json({
        msg: 'User does not exist...',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
  }
};
