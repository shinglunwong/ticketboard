const deploymentService = require('../services/deploymentService');

// exports.getAllDeployments = async (req, res, next) => {
//     const { projectId } = req.params;
//     try {
//         const deployments = await deploymentService.getAllDeployments(projectId);
//         res.json({
//             message: 'successful',
//             deployments,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

exports.getDeploymentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deployment = await deploymentService.getDeploymentById(id);
        res.json({
            message: 'successful',
            deployment
        });
    } catch (error) {
        next(error);
    }
};

exports.createDeployment = async (req, res, next) => {
    try {
        const deploymentData = req.body;
        const createdDeployment = await deploymentService.createDeployment(deploymentData);
        res.status(201).json({
            message: 'successful',
            deployment: createdDeployment,
        });
    } catch (error) {
        next(error);
    }
};

exports.updateDeployment = async (req, res, next) => {
    try {
        const deploymentId = req.params.id;
        const deploymentData = req.body;
        const updatedDeployment = await deploymentService.updateDeployment(deploymentId, deploymentData);
        res.json({
            message: 'successful',
            deployment: updatedDeployment,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteDeployment = async (req, res, next) => {
    try {
        const deploymentId = req.params.id;
        await deploymentService.deleteDeployment(deploymentId);
        res.status(204).json({
            message: 'deployment deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};