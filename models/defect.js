const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: { 
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Defect', defectSchema)
