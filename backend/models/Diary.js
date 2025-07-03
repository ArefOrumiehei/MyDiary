const { Schema, model, Types } = require('mongoose');

const DiarySchema = new Schema({
  user:   { type: Types.ObjectId, ref: 'User', required: true },

  date:   { type: String, required: true },

  title:  { type: String, default: '' },
  text:   { type: String, default: '' },

  tags:   [{ type: String, index: true }],
  mood:   { type: String, enum: ['neutral','happy','sad'], default: 'neutral' }
},
{ timestamps: true }
);

DiarySchema.index({ user: 1, date: 1 }, { unique: true });

DiarySchema.index({ title: 'text', text: 'text' });

module.exports = model('Diary', DiarySchema);
