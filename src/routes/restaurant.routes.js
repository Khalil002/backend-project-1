const { Router } = require('express');
const router = Router();

const {
  createRestaurant,
  getRestaurantById,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurant.controller');

router.post('/', createRestaurant);
router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.patch('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

module.exports = router;
