// ดึงคอมเมนต์ทั้งหมดของโพสต์
exports.getCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(postId) },
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(comments);
  } catch (error) {
    console.error('Error in getCommentsByPost:', error);
    res.status(400).json({ error: 'Failed to get comments: ' + error.message });
  }
};
const prisma = require('../prisma/client');

exports.createComment = async (req, res) => {
  const { postId, content } = req.body;
  console.log('req.user:', req.user);
  // แปลง userId เป็น number ถ้ามีค่า (middleware จะบังคับเป็น number อยู่แล้ว)
  const userId = req.user?.id;

  try {
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: No user ID found' });
    }
    if (!postId || !content) {
      return res.status(400).json({ error: 'postId and content are required' });
    }

    // ตรวจสอบว่า postId มีอยู่ในฐานข้อมูล
    const postExists = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
    });
    if (!postExists) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = await prisma.comment.create({
      data: {
        postId: parseInt(postId), // แปลง postId เป็น number
        userId: userId, // ส่ง userId ที่เป็น number
        content: content,
      },
      include: {
        user: true, // รวมข้อมูล user
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error in createComment:', error);
    res.status(400).json({ error: 'Failed to create comment: ' + error.message });
  }
};