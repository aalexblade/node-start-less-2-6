const express = require('express');
const cors = require('cors');



const { createUsers, getUsersList, getUsersById } = require('./controllers/userController');
const { checkUserId } = require('./middlewares/usersMiddleware');

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
app.use('/api/v1/users/:id', checkUserId );

// CONTROLLERS

/**
 * Create user
 */

app.post('/api/v1/users', createUsers);

/**
 * Get user list
 */

app.get('/api/v1/users', getUsersList);

/**
 * Get user by id
 */

app.get('/api/v1/users/:id', getUsersById);

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
