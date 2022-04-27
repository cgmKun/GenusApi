const Report = require('../../models/report.js');
const { transformReport } = require('./resolverHelpers.js');

module.exports = {
    reports: async () => {
        try {
            const reports = await Report.find()
            return reports.map(report => {
                return transformReport(report);
            });

        } catch (err) {
            throw err;
        }
    },
    createReport: async args => {
        try {
            const existingReport = await Report.findOne({ reportTitle: args.reportInput.reportTitle });
            if (existingReport) {
                throw new Error('Report Already Exists')
            }

            const report = new Report({
                reportTitle: args.reportInput.reportTitle,
                author: args.reportInput.author,
                submitDate: args.reportInput.submitDate
            });
            let createdReport;    

            const result = await report.save();
            createdReport = { 
                ...result._doc,
                id: result.id
            }

            return createdReport;

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}