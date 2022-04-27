const Defect = require('../../models/defect.js');
const Report = require('../../models/report.js');

const defects = async defectIds => {
    try {
        const defects = await Defect.find({ _id: { $in: defectIds }});
        return defects.map( defect => {
            return transformDefect(defect);
        });

    } catch (err) {
        throw err;
    }
}

const report = async reportId => {
    try {
        const report = await Report.findById(reportId);
        return transformReport(report);

    } catch (err) {
        throw err;
    }
}

const transformReport = report => {
    return {
        ...report._doc,
        _id: report.id,
        defects: defects.bind(this, report._doc.defects)
    };
}

const transformDefect = defect => {
    return {
        ...defect._doc,
        _id: defect.id,
        linkedReport: report.bind(this, defect.linkedReport)
    };
}

exports.defects = defects;
exports.report = report;
exports.transformDefect = transformDefect;
exports.transformReport = transformReport;
