const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('mongodb');

const app = express();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

//middleware
app.use(bodyParser.json());
app.use(session({secret: 'sssssssshhhhhhhhhhhhhhh', resave:false, saveUninitialized:true}));
app.use(cors());

const investment = require('./routes/api/investment.js');

app.use('/investments', investment);

//Handle production 
if(process.env.NODE_ENV === 'production') {
    //static folder
    app.use(express.static(__dirname + '/public'));

    //Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));