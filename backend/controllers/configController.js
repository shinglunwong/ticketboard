const configService = require('../services/configService');

exports.getAllConfigs = async (req, res, next) => {
    try {
        const configs = await configService.getAllConfigs();
        res.json({
            message: 'successful',
            configs
        });
    } catch (error) {
        next(error);
    }
}

exports.getConfigById = async (req, res, next) => {
    try {
        const configId = req.params.id;
        const config = await configService.getConfigById(configId);
        res.json({
            message: 'successful',
            config,
        });
    } catch (error) {
        next(error);
    }
}


exports.updateConfig = async (req, res, next) => {
    try {
        const configId = req.params.id;
        const configData = req.body;
        const updatedConfig = await configService.updateConfig(configId, configData);
        res.json({
            message: 'successful',
            config: updatedConfig,
        });
    } catch (error) {
        next(error);
    }
}

exports.createConfig = async (req, res, next) => {
    try {
        const configData = req.body;
        const newConfig = await configService.createConfig(configData);
        res.status(201).json({
            message: 'config created successfully',
            config: newConfig,
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteConfig = async (req, res, next) => {
    try {
        const configId = req.params.id;
        await configService.deleteConfig(configId);
        res.status(204).json({
            message: 'config deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};