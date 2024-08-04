// const { User } = require('../models');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { Op } = require('sequelize');
// const { AbilityBuilder, Ability } = require('@casl/ability');

// const register = async (req, res) => {
//   const { username, email, password, role } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }

//     const token = jwt.sign({ userId: user.id, role: user.role }, 'your_jwt_secret', {
//       expiresIn: '1h',
//     });

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// const getAbility = (user) => {
//     const { can, cannot, build } = new AbilityBuilder(Ability);
  
//     if (user.role === 'admin') {
//       can('manage', 'all');
//     } else if (user.role === 'owner') {
//       can('manage', 'Book', { ownerId: user.id });
//       cannot('approve', 'Book');
//     } else {
//       can('read', 'Book', { status: 'available' });
//     }
  
//     return build();
//   };
  
//   module.exports = { register, login, getAbility };
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { AbilityBuilder, Ability } = require('@casl/ability');


// Register function
const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with hashed password
    const user = await User.create({ username, email, password: hashedPassword, role });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAbility = (user) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.role === 'admin') {
    can('manage', 'all');
  } else if (user.role === 'owner') {
    can('manage', 'Book', { ownerId: user.id });
    cannot('approve', 'Book');
  } else {
    can('read', 'Book', { status: 'available' });
  }

  return build();
};

module.exports = { register, login, getAbility };
