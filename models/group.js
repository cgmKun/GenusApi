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
        defects: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Defect'
            }
        ],
        linkedReport: { 
            type: Schema.Types.ObjectId,
            ref: 'Report'
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Group', groupSchema);
