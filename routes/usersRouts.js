const { Router } = require('express');

const { createUsers, getUsersList, getUsersById } = require('../controllers/userController');
const { checkUserId } = require('../middlewares/usersMiddleware');

const router = Router();

router.post('/', createUsers);
router.get('/', getUsersList);
router.get('/:id', checkUserId, getUsersById);

module.exports = router;
