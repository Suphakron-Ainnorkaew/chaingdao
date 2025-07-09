const prisma = require('../prisma/client');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // สร้างชื่อไฟล์ใหม่แบบ unique พร้อมนามสกุลเดิม
    const ext = path.extname(file.originalname) || '.jpg';
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + ext);
  }
});
const upload = multer({ storage });

exports.createPost = async (req, res) => {
  upload.array('images', 8)(req, res, async () => {
    const { content } = req.body;
    const images = req.files.map((file) => ({ imageUrl: `/uploads/${file.filename}` }));
    try {
      const post = await prisma.post.create({
        data: {
          userId: req.user.id,
          content,
          images: { create: images },
        },
        include: { 
          user: { select: { id: true, name: true } }, 
          images: true,
          likes: true,
          comments: { include: { user: { select: { id: true, name: true } } } }
        },
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.error('Error in createPost:', error);
    }
  });
};

exports.getRecentPosts = async (req, res) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  try {
    const posts = await prisma.post.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      include: { 
        user: { select: { id: true, name: true } }, 
        images: true, 
        likes: true, 
        comments: { include: { user: { select: { id: true, name: true } } } }
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error('Error in getRecentPosts:', error);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { 
        user: { select: { id: true, name: true } }, 
        images: true, 
        likes: true, 
        comments: { include: { user: { select: { id: true, name: true } } } }
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error('Error in getAllPosts:', error);
  }
};

exports.getPostById = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
      include: { 
        user: { select: { id: true, name: true } }, 
        images: true, 
        likes: true, 
        comments: { include: { user: { select: { id: true, name: true } } } }
      },
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error('Error in getPostById:', error);
  }
};

exports.likePost = async (req, res) => {
  const { postId } = req.params;
  try {
    // ตรวจสอบว่า req.user มีอยู่
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }

    // ตรวจสอบว่า post มีอยู่
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // ตรวจสอบว่า user เคย like โพสต์นี้แล้วหรือไม่
    const existingLike = await prisma.like.findFirst({
      where: {
        postId: parseInt(postId),
        userId: req.user.id,
      },
    });
    if (existingLike) {
      return res.status(400).json({ error: 'User already liked this post' });
    }

    // สร้าง like โดยใช้ postId โดยตรง
    const like = await prisma.like.create({
      data: {
        postId: parseInt(postId),
        userId: req.user.id,
      },
    });

    // ดึงข้อมูลโพสต์ที่อัปเดต
    const updatedPost = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
      include: { 
        user: { select: { id: true, name: true } }, 
        images: true, 
        likes: true, 
        comments: { include: { user: { select: { id: true, name: true } } } }
      },
    });

    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error('Error in likePost:', error);
  }
};

exports.commentPost = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  try {
    // ตรวจสอบว่า req.user มีอยู่
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }

    // ตรวจสอบว่า post มีอยู่
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = await prisma.comment.create({
      data: {
        postId: parseInt(postId),
        userId: req.user.id,
        content,
      },
      include: { user: { select: { id: true, name: true } } },
    });

    // ดึงข้อมูลโพสต์ที่อัปเดต
    const updatedPost = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
      include: { 
        user: { select: { id: true, name: true } }, 
        images: true, 
        likes: true, 
        comments: { include: { user: { select: { id: true, name: true } } } }
      },
    });

    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error('Error in commentPost:', error);
  }
};

module.exports = exports;