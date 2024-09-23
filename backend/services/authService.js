const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwtUtil = require('../utils/jwtUtil');

exports.login = async (email, password) => {
    const user = await User.findByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Invalid password');
    }

    const token = jwtUtil.generateToken({ id: user.id, role: user.role });
    return { user, token };
};
