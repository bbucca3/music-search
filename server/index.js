const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../react-client/'));

// route for itunes music search api
app.post('/api/musicsearch', (req, res) => {
  let term = req.body.musicInput;
  let options = {
    url: `https://itunes.apple.com/search?term=${term}`
  };
  const callback = (error, response, body) => {
    if (error) {
      console.log(error)
    }
    if (!error && response.statusCode == 200) {
      let info = JSON.parse(body);
      res.send(info)
    } else {
      console.log('server music info inside else ')
      res.send(response.body)
    }
  }
  request(options, callback);
});

// helper function to escape json of unnecessary chars
const escape = (key, val) => {
  if (typeof(val) !== "string") return val;
  return val
    .replace(/[\\]/g, '')
    .replace(/[\/]/g, '/')
    .replace(/[\n]/g, '')
  ;
}

// route for lyrics search api
app.post('/api/lyricsearch', (req, res) => {
  let artist = req.body.artist;
  let song = req.body.song;
  let options = {
    url: `http://lyrics.wikia.com/api.php?func=getSong&artist=${artist}&song=${song}&fmt=json`
  };
  const callback = (error, response, body) => {
    let info = JSON.parse(JSON.stringify(response.body, escape))
    res.send(info)
  }
  request(options, callback);
});

// route for catch all when page refresh
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-client/', 'index.html'));
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});
