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
            title: args.defectInput.title,
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