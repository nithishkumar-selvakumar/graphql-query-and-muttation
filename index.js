const express = require('express')
const {graphqlHTTP}= require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
app = express();
mongoose.connect('mongodb://localhost:27017/final-graphql',{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection.once('open',()=>{
    console.log('database created successfuly done!!')
}) 

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))


app.listen(3000,()=>{
    console.log("server started !!")
})