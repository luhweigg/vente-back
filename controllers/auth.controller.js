const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Ce nom d'utilisateur est déjà pris." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès !" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Identifiants incorrects." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Identifiants incorrects." });
    }

    const token = jwt.sign(
      { userId: user._id }, 
       process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.cookie('jwt', token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      partitioned: true
    });

    res.status(200).json({ 
      message: "Connexion réussie",
      user: { id: user._id, username: user.username, money: user.money }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', '', { 
    maxAge: 1,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    partitioned: true
  });
  res.status(200).json({ message: "Déconnecté" });
};