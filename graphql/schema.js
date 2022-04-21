const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Defect {
        _id: ID!
        issueKey: String!
        status: String!
        priority: String!
        severity: String!
        projectKey: String!
        issueType: String!
        created: String!
        assignee: String!
        digitalService: String!
        summary: String!
        description: String!
        linkedReport: Report!
    }

    type Report {
        _id: ID!
        reportTitle: String!
        author: String!
        submitDate: String!
        defects: [Defect!]
    }

    input DefectInput {
        issueKey: String!
        status: String!
        priority: String!
        severity: String!
        projectKey: String!
        issueType: String!
        created: String!
        assignee: String!
        digitalService: String!
        summary: String!
        description: String!
    }

    input ReportInput {
        reportTitle: String!
        author: String!
        submitDate: String!
    }

    type RootQuery {
        defects: [Defect!]!
    }

    type RootMutation {
        createDefect(defectInput: DefectInput): Defect
        createReport(reportInput: ReportInput): Report
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
