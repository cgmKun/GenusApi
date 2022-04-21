const Defect = require('../../models/defect.js');
const Report = require('../../models/report.js');

const defects = async defectIds => {
    try {
        const defects = await Defect.find({ _id: { $in: defectIds }});
        defects.map( defect => {
            return {
                ...defect._doc,
                _id: defect.id,
                linkedReport: report.bind(this, defect.linkedReport)
            };
        });

        return defects;

    } catch (err) {
        throw err;
    }
}

const report = async reportId => {
    try {
        const report = await Report.findById(reportId);
        return {
            ...report._doc,
            _id: report.id,
            defects: defects.bind(this, report._doc.defects)
        };

    } catch (err) {
        throw err;
    }
}

module.exports = { 
    defects: async () => {
        try {
            const defects = await Defect.find();
            return defects.map(defect => {
                return {
                    ...defect._doc,
                    _id: defect.id,
                    linkedReport: report.bind(this, defect._doc.linkedReport)
                };
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
            createdDefect = {
                ...result._doc,
                id: result._doc._id.toString(),
                linkedReport: report.bind(this, result._doc.linkedReport)
            };

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
};
