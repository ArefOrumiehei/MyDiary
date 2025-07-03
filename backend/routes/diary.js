const router  = require('express').Router();
const auth    = require('../middleware/auth');
const Diary   = require('../models/Diary');

// GET /api/diary/search?query=فلان
router.get('/search', auth, async (req, res) => {
  const { query='' } = req.query;
  if (!query) return res.json([]);

  const regex = new RegExp(query.trim(), 'i');
  const docs = await Diary.find({
    user: req.user.id,
    $or: [
      { title: { $regex: regex } },
      { tags:  { $in: [regex] } }
    ]
  }).limit(30).sort({ date: -1 });

  res.json(docs);
});


// GET  /api/diary/:date
router.get('/:date', auth, async (req, res) => {
  const doc = await Diary.findOne({ user: req.user.id, date: req.params.date });
  if (!doc) return res.status(404).json('برای امروز خاطره ای نوشته نشده است');
  res.json(doc);
});

// POST /api/diary
router.post('/', auth, async (req, res) => {
  const { date, title='', text='', tags=[], mood='neutral' } = req.body;

  const cleanTags = [...new Set(tags.map(t => t.trim().toLowerCase()))];

  const doc = await Diary.findOneAndUpdate(
    { user: req.user.id, date },
    { $set: { title, text, mood, tags: cleanTags } },
    { new: true, upsert: true }
  );

  res.status(201).json(doc);
});

// DELETE /api/diary/:date
router.delete('/:date', auth, async (req, res) => {
  await Diary.deleteOne({ user: req.user.id, date: req.params.date });
  res.json('deleted');
});

module.exports = router;
