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
    defectsByReportId: async args => {
        try {
            const defects = await Defect.find({linkedReport: args.reportId});
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
            linkedReport: args.defectInput.linkedReport
        });
        let createdDefect;

        try {
            const result = await defect.save();
            createdDefect = transformDefect(result);

            const linkedReport = await Report.findById(result.linkedReport);

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
    },
    createDefects: async args => {
        const defects = args.defects.map(defect => {
            return new Defect({
                issueKey: defect.issueKey,
                status: defect.status,
                priority: defect.priority,
                severity: defect.severity,
                projectKey: defect.projectKey,
                issueType: defect.issueType,
                created: defect.created,
                assignee: defect.assignee,
                digitalService: defect.digitalService,
                summary: defect.summary,
                description: defect.description,
                linkedReport: defect.linkedReport
            });
        })

        try {
            const results = defects.map(async defect => {
                const result = await defect.save();
                const createdDefect = result;
                const linkedReport = await Report.findById(result.linkedReport);

                if(!linkedReport) { 
                    throw new Error('Report not found')
                }

                linkedReport.defects.push(createdDefect);
                await linkedReport.save();
                return createdDefect;
            });

            return results;

        } catch (err) {
            throw err;
        }
    }
};
