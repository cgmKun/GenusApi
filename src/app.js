const express = require('express');
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema, isCompositeType }  = require('graphql')
const mongoose = require('mongoose')
const Defect = require('../models/defect.js')

const app = express();
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
            return Defect.find()
            .then(defect => {
                return defect.map(defect => {
                    return {...defect._doc, _id: defect._doc._id.toString()};
                });
            })
            .catch(err => {
                throw err;
            });
        },
        createDefect: args => {
            const defect = new Defect({
                title: args.defectInput.title,
                description: args.defectInput.description
            });

            return defect.save()
            .then(result => {
                console.log(result);
                return {...result._doc, _id: result._doc._id.toString()};
            }).catch(err => {
                console.log(err);
                throw err;
            });
        }
    },
    graphiql: true
}));

// MongoDB link
mongoose.connect(`mongodb://localhost:27017/${process.env.MONGO_DB}`).then(() => {
    app.listen(3000, () => console.log('Listening on port 3000...'));
}).catch(err => {
    console.log(err);
})
