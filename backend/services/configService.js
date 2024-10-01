const Config = require('../models/Config');
const db = require('../config/db');

exports.getAllConfigs = () => {
    return Config.findAll();
}

exports.getConfigById = (id) => {
    return Config.findById(id);
}

exports.createConfig = (configData) => {
    return Config.create(configData);
}

exports.updateConfig = (id, configData) => {
    return Config.update(id, configData);
}

exports.deleteConfig = (id) => {
    return Config.delete(id);
}
