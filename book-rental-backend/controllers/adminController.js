const { User } = require('../models');

const approveOwner = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user || user.role !== 'owner') {
      return res.status(404).json({ error: 'Owner not found' });
    }

    user.isApproved = true;
    await user.save();

    res.json({ message: 'Owner approved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { approveOwner };
