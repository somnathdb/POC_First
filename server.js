const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const dinner = require('./routes/add_dinner');
const vendor = require('./routes/vendor');
const passport = require('passport');
// const categories = require('./routes/api/categories');

const app = express();


// Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//DB CONFIG

const db = require('./config/keys').mongoURI;

// Connect to mogodb
mongoose
 .connect(db, { useNewUrlParser: true })
 .then(() => console.log('mongoDB Connected'))
 .catch( err => console.log(err));



app.get('/', (req, res) => res.send('hello'));




//Passport Middleware
app.use(passport.initialize());

// passport Config
require('./config/passport')(passport);


// USE ROUTES

app.use('/user', user);
app.use('/dinner',dinner);
app.use('/vendor',vendor);
// app.use('/api/category', categories);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}` ));