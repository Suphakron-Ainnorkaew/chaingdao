const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { email, password, name, birthDate, age, gender } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        birthDate: new Date(birthDate),
        age,
        gender,
      },
      select: { id: true, name: true, email: true },
    });
    console.log('Register: user =', user);
    if (!user.id) {
      return res.status(500).json({ error: 'User ID missing after registration' });
    }
    const token = jwt.sign(
      { id: Number(user.id), name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(400).json({ error: 'Registration failed: ' + error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, password: true },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Login: user =', user);
    if (!user.id) {
      return res.status(500).json({ error: 'User ID missing after login' });
    }
    const token = jwt.sign(
      { id: Number(user.id), name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ user: { id: user.id, name: user.name }, token });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(400).json({ error: 'Login failed: ' + error.message });
  }
};

exports.verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Error in verifyToken:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};