const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defectSchema = new Schema({
    issueKey: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true
    },
    projectKey: {
        type: String,
        required: true
    },
    issueType: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: true
    },
    assignee: {
        type: String,
        required: true
    },
    digitalService: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Defect', defectSchema)
