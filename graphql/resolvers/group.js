const Group = require('../../models/group.js');
const Report = require('../../models/report.js');
const Defect = require('../../models/defect.js')
const { transformGroup, report, defects } = require('./resolverHelpers');

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

            const linkedReport = await Report.findById({ _id: args.groupInput.linkedReport });

            if(!linkedReport) { 
                throw new Error('Report not found')
            }

            const result = await group.save();
            createdGroup = transformGroup(result);

            return createdGroup;

        } catch (err) {
            throw err;
        }
    }
}
