const uuid = require('uuid').v4;
const fs = require('fs').promises;

exports.createUsers = async (req, res) => {
  try {
    const { name, year } = req.body;

    const dataFromDB = await fs.readFile('./models.json');

    const users = JSON.parse(dataFromDB);

    const newUser = {
      name,
      year,
      id: uuid(),
    };

    users.push(newUser);

    await fs.writeFile('./models.json', JSON.stringify(users));

    res.status(201).json({
      user: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUsersList = async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile('./models.json'));

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUsersById = (req, res) => {
  try {
    const { user } = req;

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
