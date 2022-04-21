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

    type RootQuery {
        defects: [Defect!]!
    }

    type RootMutation {
        createDefect(defectInput: DefectInput): Defect
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
