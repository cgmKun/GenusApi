const express = require('express');
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')

const graphqlSchema = require('../graphql/schema.js')
const graphqlResolvers = require('../graphql/resolvers/resolver.js')

const app = express();
app.use(bodyParser.json());

app.use('/api', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}));

// MongoDB link
mongoose.connect(`mongodb://localhost:27017/${process.env.MONGO_DB}`).then(() => {
    app.listen(3000, () => console.log('Listening on port 3000...'));
}).catch(err => {
    console.log(err);
})
