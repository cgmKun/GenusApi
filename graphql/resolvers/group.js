const Group = require('../../models/group.js');
const Report = require('../../models/report.js');
const Defect = require('../../models/defect.js');
const { transformGroup } = require('./resolverHelpers');

module.exports = {
    groups: async () => {
        try {
            const groups = await Group.find();
            return groups.map(group => {
                return transformGroup(group);
            });
        } catch (err) {
            throw err;
        }
    },
    groupsByReportAndSessionId: async args => {
        try {
            const groups = await Group.find({linkedReport: args.reportId, sessionId: args.sessionId});
            return groups.map(group => {
                return transformGroup(group);
            });
        } catch (err) {
            throw err;
        }
    },
    createGroup: async args => {
        try {
            const fetchedReport = await Report.findOne({ _id: args.groupInput.linkedReport });
            const fetchedDefects = await Defect.find({ _id: { $in: args.groupInput.defects } });
            const group = new Group({
                groupTitle: args.groupInput.groupTitle,
                sessionId: args.groupInput.sessionId,
                submitDate: args.groupInput.submitDate,
                defects: fetchedDefects,
                linkedReport: fetchedReport
            });
            let createdGroup

            // Validate if the Report exists
            const linkedReport = await Report.findById({ _id: args.groupInput.linkedReport });
            if(!linkedReport) { 
                throw new Error('Report not found')
            }

            // Save the group in the Database
            const result = await group.save();
            createdGroup = transformGroup(result);

            // Check if the report has already a SessionID available
            if (linkedReport.sessionIds.indexOf(args.groupInput.sessionId) == -1) {
                linkedReport.sessionIds.push(createdGroup.sessionId);
                await linkedReport.save();
            }

            return createdGroup;

        } catch (err) {
            throw err;
        }
    }
}
