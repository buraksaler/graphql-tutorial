const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();
var cors = require('cors');
app.use(cors());

mongoose.connect('mongodb://localhost:27017');
mongoose.connection.once('open', () => {
  console.log('connected to database');
})



app.use('/graphql', graphqlHTTP({

  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});


