const express = require('express');
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema, isCompositeType }  = require('graphql')

const app = express();
const defects = [];

app.use(bodyParser.json());

app.use('/api', graphqlHTTP({
    schema: buildSchema(`
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
    `),
    rootValue: {
        defects: () => {
            return defects
        },
        createDefect: args => {
            const defect = {
                _id: Math.random().toString(),
                title: args.defectInput.title,
                description: args.defectInput.description
            }
            defects.push(defect)
            return defect
        }
    },
    graphiql: true
}));

app.listen(3000, () => console.log('Listening on port 3000...'));