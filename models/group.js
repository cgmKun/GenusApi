const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema(
    {
        groupTitle: {
            type: String,
            required: true
        },
        sessionId: {
            type: String,
            required: true
        },
        submitDate: {
            type: String,
            required: true
        },
        defects: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Defect'
            }
        ],
        keywords: [
            {
                type: String,
                required: true
            }
        ],
        linkedReport: { 
            type: Schema.Types.ObjectId,
            ref: 'Report'
        },
    }
);

module.exports = mongoose.model('Group', groupSchema);
