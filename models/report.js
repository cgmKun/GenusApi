const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    reportTitle: {
        type: String,
        required: true
    },
    author: { 
        type: String,
        required: true
    },
    submitDate: { 
        type: String,
        required: true
    },
    sessionIds: [
        {
            type: String,
            required: true
        }
    ],
    defects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Defect'
        }
    ]
});

module.exports = mongoose.model('Report', reportSchema);
