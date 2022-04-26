const express = require('express');
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')

const graphqlSchema = require('../graphql/schema.js')
const graphqlResolvers = require('../graphql/resolvers/resolver.js')

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

app.use('/api', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}));

// MongoDB link
mongoose.connect(`mongodb://localhost:27017/${process.env.MONGO_DB}`).then(() => {
    app.listen(8000, () => console.log('Listening on port 8000...'));
}).catch(err => {
    console.log(err);
})
