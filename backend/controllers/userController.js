const userService = require('../services/userService');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json({
            message: 'successful',
            users
        });
    } catch (error) {
        next(error);
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        res.json({
            message: 'successful',
            user
        });
    } catch (error) {
        next(error);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await userService.updateUser(userId, userData);
        res.json({
            message: 'successful',
            user: updatedUser,
        });
    } catch (error) {
        next(error);
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        res.status(201).json({
            message: 'user created successfully',
            user: newUser,
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        await userService.deleteUser(userId);
        res.status(204).json({
            message: 'user deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};