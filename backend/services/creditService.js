const Credit = require('../models/Credit');
const Project = require('../models/Project');
const db = require('../config/db');

exports.getCreditsByProjectId = (projectId) => {
    return Credit.findByProjectId(projectId);
};

exports.createCredit = async (creditData) => {
    return await db.transaction(async (trx) => {
        const [createdCredit] = await Credit.create(creditData, trx);
        const project = await Project.findByProjectId(creditData.project_id, trx);
        const currentCredits = project.credits || 0;
        const newTotalCredits = currentCredits + createdCredit.amount;
        const [updatedProject] = await Project.updateCredits(creditData.project_id, newTotalCredits, trx);

        return { createdCredit, updatedProject };
    });
};