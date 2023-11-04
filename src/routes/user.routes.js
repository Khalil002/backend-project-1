const { Router } = require('express');
const router = Router();

const {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

router.post('/create/', createUser);
router.post('/', getUser);
router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
