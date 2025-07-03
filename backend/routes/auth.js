const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json('لطفا به طور کامل فیلد هارو تکمیل کنید.');

    if (await User.findOne({ email })) return res.status(409).json('ایمیل قبلا استفاده شده است');

    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hash });
    const token = signToken(user._id);

    res.status(201).json({ token });
  } catch (err) { res.status(500).json('خطای سرور'); }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json('چنین ایمیلی یافت نشد');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json('رمز عبور اشتباه است');

    const token = signToken(user._id);
    res.json({ token });
  } catch { res.status(500).json('خطای سرور'); }
});

module.exports = router;
