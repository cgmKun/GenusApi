const Group = require('../../models/group.js');
const Report = require('../../models/report.js');
const { report, defects, transformDefect } = require('./resolverHelpers');

module.exports = {
    groups: async () => {
        try {
            const groups = await Group.find();
            return groups.map(group => {
                return {
                    ...group._doc,
                    _id: group.id,
                    defects: defects.bind(this, group._doc.defects),
                    linkedReport: report.bind(this, group._doc.linkedReport)
                };
            });
        } catch (err) {
            throw err;
        }
    },
    createGroup: async args => {
        try {
            const fetchedReport = await Report.findOne({ _id: args.groupInput.reportId });
            const group = new Group({
                groupTitle: args.groupInput.groupTitle,
                sessionId: args.groupInput.sessionId,
                linkedReport: fetchedReport
            });
            let createdGroup

            const linkedReport = await Report.findById({ _id: args.groupInput.reportId });

            if(!linkedReport) { 
                throw new Error('Report not found')
            }

            const result = await group.save();
            createdGroup = transformDefect(result);

            return createdGroup;

        } catch (err) {
            throw err;
        }
    }
}
