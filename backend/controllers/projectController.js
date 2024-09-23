const projectService = require('../services/projectService');

exports.getAllProjects = async (req, res, next) => {
    try {
        const projects = await projectService.getAllProjects();
        res.json({
            message: 'successful',
            projects,
        });
    } catch (error) {
        next(error);
    }
};

exports.getProjectById = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await projectService.getProjectById(projectId);
        res.json({
            message: 'successful',
            project
        });
    } catch (error) {
        next(error);
    }
};

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