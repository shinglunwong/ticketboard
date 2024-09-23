const ErrorResponse = require('../utils/errorResponse');
const Project = require('../models/Project');

exports.getAllProjects = () => {
    return Project.findAll();
};

exports.getProjectById = (id) => {
    return Project.findById(id);
};

exports.createProject = (ticketData) => {
    return Project.create(ticketData);
};

exports.updateProject = (id, ticketData) => {
    return Project.update(id, ticketData);
};

exports.deleteProject = (id) => {
    return Project.delete(id);
};