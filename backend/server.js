require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');
const diaryRoutes = require('./routes/diary');

const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors({
  // origin: ["http://localhost:5173", "http://localhost:8081", "https://my-diary-lake.vercel.app"],
  origin: true,
  credentials: true,
}));


app.get('/api/private', auth, (req, res) => res.json('ok'));
app.use('/api/auth', authRoutes);
app.use('/api/diary', diaryRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Mongo connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀  API ready on http://localhost:${process.env.PORT}`)
    );
  })
  .catch(console.error);
