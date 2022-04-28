const Group = require('../../models/group.js');
const Report = require('../../models/report.js');
const Defect = require('../../models/defect.js');
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
            // Check if report already exists
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
    },
    deleteReport: async args => {
        try {
            // Check if report exists, if report does not exist, throw error
            const existingReport = await Report.findOne({ _id: args.reportId });
            if (!existingReport) { 
                throw new Error('Report Does Not Exist');
            }

            // Response
            let createdReport = transformReport(existingReport);

            //Fetch related Defects
            await Defect.deleteMany({ _id: { $in: existingReport.defects}});
            await Group.deleteMany({ linkedReport: existingReport.id , sessionId: {$in: existingReport.sessionIds}});
            await Report.deleteOne({ _id: args.reportId});

            return createdReport;

        } catch (err) {
            throw err;
        }
    }
}