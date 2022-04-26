const defectResolver = require('./defect.js');
const reportResolver = require('./report');
const groupResolver = require('./group');

const rootResolver = {
    ...defectResolver,
    ...reportResolver,
    ...groupResolver
};

module.exports = rootResolver;
