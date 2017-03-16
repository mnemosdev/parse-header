var express = require("express");
var useragent = require("useragent");

var app = express();

app.all("/", function(req, res){
	console.log(req.headers["x-forwarded-for"]);
	var agent = useragent.parse(req.headers["user-agent"]);
	var regex = /\((.*?)\)/;
	var obj = {
		"ip" : req.headers["x-forwarded-for"] || req.connection.remoteAddress,
		"locale" : req.get("Accept-Language").split(",")[0],
		"user-agent" : req.get("User-Agent").match(regex)[0],
		"os" : agent.os.family
	};
	res.json(obj);
});

app.listen(process.env.PORT || 3003, function(){
	console.log("listening");
});
