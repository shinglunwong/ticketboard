const Deployment = require('../models/Deployment');

exports.getDeploymentById = (id) => {
    return Deployment.findById(id);
};

exports.getDeploymentsByProjectId = async (projectId) => {
    const deployments = await Deployment.findAllByProjectId(projectId);
    return deployments;
}

exports.createDeployment = (deploymentData) => {
    return Deployment.create(deploymentData);
};

exports.updateDeployment = (id, deploymentData) => {
    return Deployment.update(id, deploymentData);
};

exports.deleteDeployment = (id) => {
    return Deployment.delete(id);
};