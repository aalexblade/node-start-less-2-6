const fs = require('fs').promises;

const { AppError, catchAsync } = require('../utils');

exports.checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // if (id.length < 10) throw Error('Invalid id');
  if (id.length < 10) {
    return next(new AppError(404, 'Invalid ID...'));
  }

  const dataFromDB = await fs.readFile('./models.json');

  // throw new Error('DB failed...');//симулювємо що наша база данних впала

  const users = JSON.parse(dataFromDB);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return next(new AppError(404, 'User does not exist'));
  }

  req.user = user;

  next();
});
