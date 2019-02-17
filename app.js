//require('dotenv').config()
var express = require('express')
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var nodemailer=require('nodemailer');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
var schema = require('./schemas')
var clientLogins = schema.clientLogin;
var clientorders = schema.order;
var counterboy = schema.counters;


app.use(cors())
mongoose.connect('mongodb://dshyam337:shyamv1234@ds033047.mlab.com:33047/shoppingshuru', { useNewUrlParser: true });
var port = process.env.PORT || 3000;
app.post("/counterregister", function (req, res) {

    var form = req.body;
    console.log(req.body)

counterboy.create(form,function(err,data){
   
     if(err)
         console.log(err);
         else
         {
             return res.json(data)
         }
 })
})
app.get("/getcounter", function (req, res) {
    console.log(req.query)
    counterboy.find({'Email':req.query.Email, 'Password':req.query.Password}, function (err, data) {
        if (err)
            throw err;
        
        console.log(JSON.stringify(data))
        console.log(data.length)
        if(data.length == 0)
        return res.json({"isVerified":false})
        return res.json(data)
})
})
app.post("/register", function (req, res) {

    var form = req.body;
    console.log(req.body)

clientLogins.create(form,function(err,data){
   
     if(err)
		 console.log(err);
	 else
		 console.log("Data successfully inserted");
	     var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'theultimatedevloper@gmail.com',
                pass: 'shyamv1234'
            }
        });

        var mailOptions = {
            from: 'theultimatedevloper@gmail.com',
            to: req.body.email,
            subject: 'Subscription Mail',
            text: 'Thanks for getting registered With Shoppingshuru App . Your OTP is '+req.body.otp
        };

        transporter.sendMail(mailOptions, function (error, data) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + data.response);
                //res.send('Hey ' + obj.email + ' U are registered Successfully..!!');
                res.send('')
                res.end();
            }
        });
	 
	 return res.json({ "inserted": true });
})
})
app.get("/getOtp", function (req, res) {
    console.log(req.query)
	clientLogins.find({'email':req.query.email, 'otp':req.query.otp}, function (err, data) {
		if (err)
			throw err;
		
        console.log(JSON.stringify(data))
        console.log(data.length)
        if(data.length == 0)
        return res.json({"isVerified":false})
        return res.json({"isVerified":true})
})
})
app.get("/getorder", function (req, res) {
    console.log(req.query)
	clientorders.find({'tid':req.query.tid , 'email':req.query.email}, function (err, data) {
        if (err)
			throw err;
        else
        return res.json(data);
        
})
})
app.get("/getfullhistory", function (req, res) {
    console.log(req.query)
	clientorders.find({'tid':req.query.tid}, function (err, data) {
        if (err)
			throw err;
        else
        return res.json(data);
        
})
})
  

app.get("/historylist", function (req, res) {
    console.log(req.query)
	clientorders.find({'email':req.query.email}, function (err, data) {
        if (err)
			throw err;
        else
        return res.json(data);
        
})
})
app.get("/completeorder", function (req, res) {
    console.log(req.query)
	clientorders.find({'tid':req.query.tid , 'email':req.query.email}, function (err, data) {
        if (err)
        {
        return res.json({"isVerified":false})
			
        }
        //console.log(JSON.stringify(data))
        //console.log(data.length)
        else
        {
        console.log(res.json(data));
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'theultimatedevloper@gmail.com',
                pass: 'shyamv1234'
            }
        });

        var mailOptions = {
            from: 'theultimatedevloper@gmail.com',
            to: req.query.email,
            subject: 'Subscription Mail',
            text: 'Thank You for shopping with us!Your Payment is Processed clThank You for visiting Us'
        };

        transporter.sendMail(mailOptions, function (error, data) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + data.response);
                //res.send('Hey ' + obj.email + ' U are registered Successfully..!!');
                res.send('')
                res.end();
            }
        });
	     
    }
       
})
})

app.post("/pushorder", function (req, res) {

    var form = req.body;
    console.log(req.body)
clientorders.create(form,function(err,data){
    if(err)
		 console.log(err);
	 else
         console.log("Data successfully inserted");
         return res.json({ "inserted": true });
        })
        })
        

app.listen(process.env.PORT ||3000, () => {
    console.log("server running on 3000")
});
