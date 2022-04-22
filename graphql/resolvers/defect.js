const Defect = require('../../models/defect.js');
const Report = require('../../models/report.js');
const { transformDefect } = require('./resolverHelpers');

module.exports = {
    defects: async () => {
        try {
            const defects = await Defect.find();
            return defects.map(defect => {
                return transformDefect(defect);
            });

        } catch (err) {
            throw err
        }
    },
    createDefect: async args => {
        const defect = new Defect({
            issueKey: args.defectInput.issueKey,
            status: args.defectInput.status,
            priority: args.defectInput.priority,
            severity: args.defectInput.severity,
            projectKey: args.defectInput.projectKey,
            issueType: args.defectInput.issueType,
            created: args.defectInput.created,
            assignee: args.defectInput.assignee,
            digitalService: args.defectInput.digitalService,
            summary: args.defectInput.summary,
            description: args.defectInput.description,
            linkedReport: '6260b1b57f5686e2d0482767'
        });
        let createdDefect;

        try {
            const result = await defect.save();
            createdDefect = transformDefect(result);

            const linkedReport = await Report.findById('6260b1b57f5686e2d0482767');

            if(!linkedReport) { 
                throw new Error('Report not found')
            }

            linkedReport.defects.push(createdDefect);
            await linkedReport.save();

            return createdDefect;

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};
