require('dotenv').config()
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


// must be come fom env monodb url
// mongoose.Promise = Promise;

// mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/dice',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=>console.log('mongodb connect'))
.catch(err => console.log( err ));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type: application/json');
    //res.setHeader('Access-Control-Allow-Headers', Origin, Content-Type, Accept, Authorization, X- Request-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cors());

// Routes
const contactRtl = require("./routes/contact.route");

// Controllers
const contactCtrl = require("./controllers/contact.controller");


app.use("/con",contactRtl);


const port = process.env.PORT || 5000;
const server = app.listen(port,()=> console.log(`Listening on port ${port}...`));




var Contact = mongoose.model("contact");