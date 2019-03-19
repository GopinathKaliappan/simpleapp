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

  const tabs = [
    {
        name: 'India',
        url: 'https://www.news18.com/rss/india.xml',
        icon: '',
        color: '#FF5733',
        text: 'white',
        channel: 'News18',
        category: 'India',
        url: '/images/news18.png'
    },
    {
        name: 'Word',
        url: 'https://www.news18.com/rss/world.xml',
        icon: '',
        color: '#C70039',
        text: 'white',
        channel: 'News18',
        category: 'World',
        url: '/images/news18.png'
    },
    {
        name: 'Cricket',
        url: 'https://www.news18.com/rss/cricketnext.xml',
        icon: '',
        color: '#900C3F',
        text: 'white',
        channel: 'News18',
        category: 'Cricket',
        url: '/images/news18.png'
    },

    {
        name: 'Life Style',
        url: 'https://www.news18.com/rss/lifestyle.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        channel: 'News18',
        category: 'Life_style',
        url: '/images/news18.png'
    },
    {
        name: 'Fashion',
        url: 'https://www.thehindu.com/life-and-style/fashion/feeder/default.rss',
        icon: '',
        color: '#4A235A',
        text: 'white',
        channel: 'News18',
        category: 'Fashion',
        url: '/images/news18.png'
    },
    {
        name: '',
        url: 'https://www.news18.com/rss/movies.xml',
        icon: '',
        color: '#FF5733',
        text: 'white',
        channel: 'News18',
        category: 'Movies',
        url: '/images/news18.png'        
    },
  ];


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
  
app.get('/tabs:type', (request, response) => {
    

}).listen(PORT, () => console.log(`Listening on ${PORT}`));
  