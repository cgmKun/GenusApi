const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Group {
        _id: ID!
        groupTitle: String!
        sessionId: String!
        submitDate: String!
        defects: [Defect!]
        linkedReport: Report!
    }

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
        sessionIds: [String!]!
    }

    input GroupInput {
        groupTitle: String!
        sessionId: String!
        submitDate: String!
        defects: [ID!]!
        linkedReport: ID!
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
        linkedReport: ID!
    }

    input ReportInput {
        reportTitle: String!
        author: String!
        submitDate: String!
    }

    type RootQuery {
        defects: [Defect!]!
        defectsByReportId(reportId: ID!): [Defect!]!
        reports: [Report!]!
        groups: [Group!]!
        groupsByReportAndSessionId(reportId: ID!, sessionId: String!): [Group!]!
    }

    type RootMutation {
        createDefect(defectInput: DefectInput): Defect
        createReport(reportInput: ReportInput): Report
        createGroup(groupInput: GroupInput): Group
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
