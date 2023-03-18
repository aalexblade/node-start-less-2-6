const express = require('express');
const cors = require('cors');
const uuid = require('uuid').v4;
const fs = require('fs').promises;

const app = express();

// REST
/**
 * POST /users - create new users
 * GET /users - get users list
 * GET /users/userId - get one user (by id)
 * PUT/PUTCH /users/userId - update user by id
 * DELETE /users/userId - delete user by id
 */

app.use(cors());
app.use(express.json());

// MIDDLEWARES
/**
 * global middleware
 */
app.use((req, res, next) => {
  req.time = new Date().toLocaleString('uk-UA');

  next();
});

/**
 *Check if user exists
 */
app.use('/api/v1/users/:id', async (req, res, next) => {
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
});

// CONTROLLERS

/**
 * Create user
 */

app.post('/api/v1/users', async (req, res) => {
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
});

/**
 * Get user list
 */

app.get('/api/v1/users', async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile('./models.json'));

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * Get user by id
 */

app.get('/api/v1/users/:id', (req, res) => {
  try {
    // const { id } = req.params;

    // const dataFromDB = await fs.readFile('./models.json');
    // const users = JSON.parse(dataFromDB);
    // const user = users.find((user) => user.id === id);
    const { user } = req;

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * Update user by id
 */
app.patch('./api/users/:id', (req, res) => { });

/**
 * Delete user by id
 */
app.delete('./api/users/:id', (req, res) => {

    res.sendStatus(204);
 });

// SERVER
const port = 3000;

app.listen(port, () => {
  console.log(`Server up and running on port: ${port}`);
});
