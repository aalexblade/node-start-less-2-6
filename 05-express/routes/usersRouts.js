const { Router } = require('express');

const { createUsers, getUsersList, getUsersById } = require('../controllers/userController');
const { checkUserId } = require('../middlewares/usersMiddleware');

const router = Router();

router.post('/', createUsers);
router.get('/', getUsersList);

router.get('/:id', checkUserId, getUsersById);

// router.route('/').post(createUsers).get(getUsersList);

// router.use('/:id', checkUserId);
// router
// .route('/:id')
// .get(getUsersById)
// .patch(getUsersById)
// .delete(getUsersById);

module.exports = router;
