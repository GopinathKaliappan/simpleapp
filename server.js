const express = require('express');
const Parser = require('rss-parser');
const convert = require('xml-js');


// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 3000;
const FEED_LIST = [
  'https://css-tricks.com/feed/',
  'https://codepen.io/posts/feed',
  'https://blog.safia.rocks/rss',
  'https://hnrss.org/frontpage',
  'https://tj.ie/feed.rss',
  'http://github-trends.ryotarai.info/rss/github_trends_javascript_daily.rss'
];

let app = express();

var https = require('https');




app.get('/', (request, response) => {
      var url = request.query.url;
      var data;
      var req = https.get(url, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));

        // Buffer the body entirely for processing as a whole.
        var bodyChunks = [];
        res.on('data', function(chunk) {
          // You can process streamed parts here...
          bodyChunks.push(chunk);
        }).on('end', function() {
          var body = Buffer.concat(bodyChunks);
          console.log('BODY: ' + body);
          data = body;
          var result = convert.xml2json(data, {compact: true, spaces: 4});
          response.end(result);
          // ...and/or process the entire body here.
        })
      });

      req.on('error', function(e) {
        console.log('ERROR: ' + e.message);
      });

  }).listen(PORT, () => console.log(`Listening on ${PORT}`));
  
