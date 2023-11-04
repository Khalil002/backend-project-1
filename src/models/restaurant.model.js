const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Address is required'],
  },
  category: {
    type: String,
    enum: ['Regular', 'Fast', 'Gourmet'],
    required: [true, 'Category is required'],
  },
  popularity: {
    type: Number,
    default: 0,
    validate: {
      validator(num) {
        return num >= 0;
      },
      message: '{VALUE} is not a valid popularity number',
    },
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'Restaurant must belong to a restaurant admin'],
    validate: {
      async validator(userId) {
        const admin = await mongoose.model('Users').findById(userId);
        if (!admin || admin.deletedAt !== null) {
          throw new Error('User not found');
        } else if (admin.type !== 'Restaurant admin') {
          throw new Error('User is not a restaurant admin');
        }
      },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Restaurants', restaurantSchema);
