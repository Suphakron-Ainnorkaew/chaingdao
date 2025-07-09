const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
const userRoutes = require('./routes/users');
require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);

// ตรวจสอบว่า routes เป็นฟังก์ชันหรือไม่
console.log('authRoutes:', typeof authRoutes);
console.log('postRoutes:', typeof postRoutes);
console.log('commentRoutes:', typeof commentRoutes);
console.log('userRoutes:', typeof userRoutes);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));