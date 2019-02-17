var mongoose = require('mongoose');
var clientLogins = mongoose.model("clientLogin", {
	"email": String,
	"otp" : String
})
var orders = mongoose.model("order",{
	"tid" : String,
	"email" : String,
	"date" : String,
	"totalprice": String,
	"totalweight":String,
	"ord" : Array
})
var counterboy = mongoose.model("counter",{
	"Email" : String,
	"Password" : String
})
module.exports = {
	clientLogin: clientLogins,
	order: orders,
	counters : counterboy
}