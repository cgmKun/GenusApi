const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Defect {
        _id: ID!
        title: String!
        description: String!
    }

    input DefectInput {
        title: String!
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
