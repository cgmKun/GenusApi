const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defectSchema = new Schema({
    issueKey: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        required: false
    },
    severity: {
        type: String,
        required: false
    },
    projectKey: {
        type: String,
        required: false
    },
    issueType: {
        type: String,
        required: true
    },
    created: {
        type: String,
        required: false
    },
    assignee: {
        type: String,
        required: false
    },
    digitalService: {
        type: String,
        required: false
    },
    summary: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    linkedReport: { 
        type: Schema.Types.ObjectId,
        ref: 'Report'
    }
});

module.exports = mongoose.model('Defect', defectSchema)
