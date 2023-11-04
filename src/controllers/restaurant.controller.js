const Restaurant = require('../models/restaurant.model');

async function createRestaurant(req, res) {
  const { name, category, address, admin } = req.body;
  try {
    const newRestaurant = new Restaurant({ name, category, address, admin });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
    console.log('Restaurant created');
  } catch (e) {
    res.status(500).json({ message: e.message });
    console.log('Error while running createRestaurant(req, res)');
  }
}

async function getRestaurants(req, res) {
  const { name, category } = req.query;

  const query = { deletedAt: null };
  if (name) query.name = { $regex: name, $options: 'i' };
  if (category) query.category = category;

  try {
    const restaurants = await Restaurant.find(query).sort({ popularity: -1 });
    if (restaurants.length === 0) {
      res.status(404).json({ error: 'restaurant not found' });
      console.log('No restaurants found');
    } else {
      res.status(200).json(restaurants);
      console.log('Restaurants found');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log('Error while running getRestaurants(req, res)');
  }
}

async function getRestaurantById(req, res) {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id);
    if (restaurant.length === 0 || restaurant.deletedAt !== null) {
      res.status(404).json({ error: 'restaurant not found' });
      console.log('Restaurant not found (id)');
    } else {
      res.status(200).json(restaurant);
      console.log('Restaurant found');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log('Error while running getRestaurantById(req, res)');
  }
}

async function updateRestaurant(req, res) {
  const { id } = req.params;
  const { name, address, category, popularity } = req.body;
  const update = { name, address, category, popularity, updatedAt: Date.now() };
  try {
    const restaurant = await Restaurant.findOneAndUpdate({ _id: id, deletedAt: null }, update, {
      new: true,
    });
    if (restaurant === null || restaurant.length === 0) {
      res.status(404).json({ error: 'restaurant not found' });
      console.log('Restaurant not found (update)');
    } else {
      res.status(200).json(restaurant);
      console.log('Restaurant updated');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log('Error while running updateRestaurant(req, res)');
  }
}

async function deleteRestaurant(req, res) {
  const { id } = req.params;
  const update = { deletedAt: Date.now(), updatedAt: Date.now() };
  try {
    const restaurant = await Restaurant.findOneAndUpdate({ _id: id, deletedAt: null }, update, {
      new: true,
    });
    if (restaurant === null || restaurant.length === 0) {
      res.status(404).json({ error: 'restaurant not found' });
      console.log('Restaurant not found (delete)');
    } else {
      res.status(200).json(restaurant);
      console.log('Restaurant deleted');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log('Error while running deleteRestaurant(req, res)');
  }
}

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
