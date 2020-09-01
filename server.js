// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let recievedDate = req.params.date_string;
  if (/\d{5,}/.test(recievedDate)) {
    intDate = parseInt(recievedDate);
    res.json({ 
      unix: recievedDate,
      utc: new Date(intDate).toUTCString() 
    });
  }
  let finalDate = new Date(recievedDate);
  if (finalDate.toString() === "Invalid Date") {
    res.json({
      error: "Invaid Date"
    });
  } else {
    res.json({
      unix: finalDate.valueOf(),
      utc: finalDate.toUTCString()
    });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});