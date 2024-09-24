const Project = require('../models/Project');

exports.getAllProjects = (user) => {
    if (user.role === 'admin') {
        return Project.findAll();
    } else {
        return Project.findAllProjectsByUserId(user.id);
    }
};

exports.getProjectById = async (projectId, user) => {
    if (user.role === 'admin') {
        return Project.findByProjectId(projectId);
    } else {
        // User can only see projects they are assigned to
        const project = await Project.findByProjectId(projectId);
        if (!project) {
            throw new Error('Project not found');
        }
        if (project.user_id !== user.id) {
            throw new Error('Unauthorized');
        }
        return Project.findByProjectIdWithUserId(projectId, user.id);
    }
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