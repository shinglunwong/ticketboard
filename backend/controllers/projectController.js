const projectService = require('../services/projectService');
const ticketService = require('../services/ticketService');
const deploymentService = require('../services/deploymentService');

exports.getAllProjects = async (req, res, next) => {
    const { user } = req;
    try {
        const projects = await projectService.getAllProjects(user);
        res.json({
            message: 'successful',
            projects,
        });
    } catch (error) {
        next(error);
    }
};

exports.getProjectById = async (req, res, next) => {
    const { user } = req;
    try {
        const projectId = req.params.id;
        const project = await projectService.getProjectById(projectId, user);
        res.json({
            message: 'successful',
            project
        });
    } catch (error) {
        next(error);
    }
};

exports.getTicketsByProjectId = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const tickets = await ticketService.getTicketsByProjectId(projectId);
        res.json({
            message: 'successful',
            tickets,
        });
    } catch (error) {
        next(error);
    }
}

exports.getDeploymentsByProjectId = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const deployments = await deploymentService.getDeploymentsByProjectId(projectId);
        res.json({
            message: 'successful',
            deployments,
        });
    } catch (error) {
        next(error);
    }
}

exports.createProject = async (req, res, next) => {
    try {
        const projectData = req.body;
        const createdProject = await projectService.createProject(projectData);
        res.status(201).json({
            message: 'successful',
            project: createdProject,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProject = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const projectData = req.body;
        const updatedProject = await projectService.updateProject(projectId, projectData);
        res.json({
            message: 'successful',
            project: updatedProject,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteProject = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        await projectService.deleteProject(projectId);
        res.status(204).json({
            message: 'project deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};