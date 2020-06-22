const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const mongoose = require('mongoose');
const routes = require('./routes/storyRoutes');
const CommentRoutes = require('./routes/commentRoutes');

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

const db_uri = process.env.MONGODB_URI;
mongoose.connect(db_uri, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true});

mongoose.connection
    .on('connected', () => {
        console.log(`MongoDB Atlas database connection establised successfully`);
})
    .on('err', (err) => {
        console.log(`Error while connecting to database: ${err}`);
});

app.use('/',routes);
app.use('/comments',CommentRoutes);


module.exports = app;