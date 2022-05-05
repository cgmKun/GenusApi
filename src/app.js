const express = require('express');
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')

const graphqlSchema = require('../graphql/schema.js')
const graphqlResolvers = require('../graphql/resolvers/resolver.js')

const app = express();
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

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
mongoose.connect(`mongodb+srv://monte:100701@genus.7qbia.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(() => {
    app.listen(8000, () => console.log('Listening on port 8000...'));
}).catch(err => {
    console.log(err);
})
