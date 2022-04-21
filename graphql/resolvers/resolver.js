const Defect = require('../../models/defect.js')

module.exports = { 
    defects: async () => {
        try {
            const defects = await Defect.find();
            return defects.map(defect => {
                return {
                    ...defect._doc,
                    _id: defect.id
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
            description: args.defectInput.description
        });
        let createdDefect;

        try {
            const result = await defect.save();
            createdDefect = {
                ...result._doc,
                id: result._doc._id.toString()
            };

            return createdDefect;

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};
