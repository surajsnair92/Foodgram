var express = require('express');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var app = express();
// const Zomato = require('zomato.js');
// var zomato = require('zomato');
 var IPinfo = require('get-ipinfo');
//
// // const z = new Zomato('167c084567684c2076a14d3c0b36bc29');
// var z = zomato.createClient({
//     userKey: '167c084567684c2076a14d3c0b36bc29' //as obtained from [Zomato API](https://developers.zomato.com/apis)
// });

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
    secret: "process.env.SECRET",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const Zomato = require('zomato.js');
const z = new Zomato('5bb962f10d9be2c7cb48691db0fd67f3');


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require("./assignment/app.js")(app);
require("./project/app.js")(app, z, IPinfo);

var port = process.env.PORT || 3000;

app.listen(port);