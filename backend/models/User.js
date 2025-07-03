const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email:    { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt:{ type: Date, default: Date.now }
});

module.exports = model('User', UserSchema);
