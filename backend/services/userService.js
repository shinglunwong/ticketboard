const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getAllUsers = () => {
    return User.findAllUsers();
}

exports.getUserById = (id) => {
    return User.findById(id);
}

exports.updateUser = (id, userData) => {
    // hash password before updating
    if (userData.password && userData.password.length > 0) {
        userData.password = bcrypt.hashSync(userData.password, 10);
    }
    return User.update(id, userData);
}

exports.createUser = (userData) => {
    // hash password before creating
    console.log(userData);
    userData.password = bcrypt.hashSync(userData.password, 10);
    return User.create(userData);
}

exports.deleteUser = (id) => {
    return User.delete(id);
}
