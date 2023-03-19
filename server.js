const express = require('express');
const cors = require('cors');

const usersRouts = require('./routes/usersRouts');
// const { checkUserId } = require('./middlewares/usersMiddleware');

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
// app.use('/api/v1/users/:id', checkUserId);

app.use('/api/v1/users', usersRouts);

// CONTROLLERS
// app.post('/api/v1/users', createUsers);
// app.get('/api/v1/users', getUsersList);
// app.get('/api/v1/users/:id', getUsersById);

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

app.use((err, req, res, next)=> {
  res.status(500).json({
    msg: err.message,
  });
});

// SERVER
const port = 3000;

app.listen(port, () => {
  console.log(`Server up and running on port: ${port}`);
});
