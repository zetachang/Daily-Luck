var express = require("express");
var jsdom = require("jsdom");
var app = express.createServer(express.logger());
var format = function(num)
{
  if(num >= 10)return num.toString();
  else return "0" + num.toString();
};
var url = "http://mindcity.sina.com.tw/MC_data/west/MC-12horos/day/";
var map = {
  "capricorn":["1222", "0119"],
  "pisces":["0219", "0320"],
  "aries":["0321", "0419"],
  "taurus":["0420", "0520"],
  "gemini":["0521", "0621"],
  "cancer":["0622", "0722"],
  "leo": ["0723", "0822"],
  "virgo": ["0823", "0922"],
  "libra": ["0923", "1023"],
  "scorpio": ["1024", "1122"],
  "sagittarius": ["1123", "1221"],
  "aquarius": ["0120", "0218"]
};

app.get('/',function(req,res){
  var month = req.param("month"), day = req.param("day");
  //console.log("req");
  //console.log(req);
  //console.log("--->", month);
  //console.log("--->", day);
  if(month === undefined || day === undefined){
    res.send("Oops",404);
    return;
  }
  var date = month.toString() + day.toString();
  var now = new Date()
  var today = now.getFullYear() + format(now.getMonth()+1) + format(now.getDate());
  var match = "capricorn";
  for(i in map){
    if(date >= map[i][0] && date <= map[i][1]){
      console.log("Matched ", i);
      match = i;
      break;
    }
  }
  console.log(url + today + "/" + match + ".shtml\n");
  jsdom.env({html:url + today + "/" + match + ".shtml",
    done:function(errors,window){
      var content = window.document.getElementsByClassName('lotconts')[0].innerHTML.replace("<br>", "");
      res.send(content);
    }
  });
});

var port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

