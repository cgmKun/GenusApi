const express = require('express');
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema }  = require('graphql')

const app = express();

app.use(bodyParser.json());

app.use('/api', graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }
        
        type RootMutation {
            createEvent(name: String!): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return ['Gei', 'Otro gei', 'mas geis']
        },
        createEvent: (args) => {
            const event = args.name;
            return event
        }
    },
    graphiql: true
}));

app.listen(3000, () => console.log('Listening on port 3000...'));