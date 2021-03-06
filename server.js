const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get("/api/timestamp", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let recievedDate = req.params.date_string;
    if (/\d{5,}/.test(recievedDate)) {
    let intDate = parseInt(recievedDate);
      res.json({ 
        unix: recievedDate,
        utc: new Date(intDate).toUTCString() 
      });
    } else {
      let finalDate = new Date(recievedDate);
      if (finalDate.toString() === "Invalid Date") {
      console.log("runs");
        res.json({
          error: "Invalid Date"
        });
      } else {
        res.json({
          unix: finalDate.valueOf(),
          utc: finalDate.toUTCString()
        });
      }
    }
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});