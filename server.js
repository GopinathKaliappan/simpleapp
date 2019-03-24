const express = require('express');
const Parser = require('rss-parser');
const convert = require('xml-js');


process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});
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
        color: 'purple',
        channelImage: 'https://images-na.ssl-images-amazon.com/images/I/41glolYSKtL._SY355_.png',
        text: 'white',
        type: '_cdata' ,
        channel: 'News18',
        language:'engish',
        category: 'lifestyle',
        id: 30
    },
    {
        name: 'World',
        url: 'https://www.news18.com/rss/world.xml',
        icon: '',
        color: '#C70039',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
           channelImage: 'https://images-na.ssl-images-amazon.com/images/I/41glolYSKtL._SY355_.png',
        language:'engish',
        category: 'world',
        id: 31
    },
    {
        name: 'Cricket',
        url: 'https://www.news18.com/rss/cricketnext.xml',
        icon: '',
        color: '#900C3F',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'https://images-na.ssl-images-amazon.com/images/I/41glolYSKtL._SY355_.png',
        language:'engish',
        category: 'cricet',
        id: 32
    },

    {
        name: 'Life Style',
        url: 'https://www.news18.com/rss/lifestyle.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'https://images-na.ssl-images-amazon.com/images/I/41glolYSKtL._SY355_.png',
        language:'engish',
        category: 'lifestyle',
        id: 33
    },
    {
        name: 'Business',
        url: 'https://www.huffpost.com/section/business/feed',
        icon: '',
        color: '#4A235A',
        text: 'white',
        type: '_cdata',
        channel: 'Huffington Post',
        channelImage: 'https://keratoconusinserts.com/wp-content/uploads/revslider/janbbwsite/press-logo-huffington-post.png',
        language:'engish',
        category: 'business',
        id: 34
    },
    {
        name: 'Movies',
        url: 'https://www.news18.com/rss/movies.xml',
        icon: '',
        color: 'grey',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'https://images-na.ssl-images-amazon.com/images/I/41glolYSKtL._SY355_.png',
        language:'engish',
        category: 'movies',
        id: 35    
    },{
        name: 'One India',
        url: 'https://tamil.oneindia.com/rss/tamil-art-culture-fb.xml',
        icon: '',
        color: 'grey',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'http://feeds.feedburner.com/Puthiyathalaimurai_India_News?format=xml',
        language:'engish',
        category: 'movies',
        id: 36   
    }
  ];
  // const tabs = [
  //   {
  //       name: 'India',
  //       url: 'https://www.news18.com/rss/india.xml',
  //       icon: '',
  //       color: '#FF5733',
  //       text: 'white',
  //       channel: 'News18',
  //       category: 'India',
  //       url: '/images/news18.png',
  //       language: 'English'
  //   },
  //   {
  //       name: 'World',
  //       url: 'https://www.news18.com/rss/world.xml',
  //       icon: '',
  //       color: '#C70039',
  //       text: 'white',
  //       channel: 'News18',
  //       category: 'World',
  //       url: '/images/news18.png',
  //       language: 'English'
  //   },
  //   {
  //       name: 'Cricket',
  //       url: 'https://www.news18.com/rss/cricketnext.xml',
  //       icon: '',
  //       color: '#900C3F',
  //       text: 'white',
  //       channel: 'News18',
  //       category: 'Cricket',
  //       url: '/images/news18.png',
  //       language: 'English'
  //   },

  //   {
  //       name: 'Life Style',
  //       url: 'https://www.news18.com/rss/lifestyle.xml',
  //       icon: '',
  //       color: '#922B21',
  //       text: 'white',
  //       channel: 'News18',
  //       category: 'Life_style',
  //       url: '/images/news18.png',
  //       language: 'English'
  //   },
  //   {
  //       name: 'Fashion',
  //       url: 'https://www.thehindu.com/life-and-style/fashion/feeder/default.rss',
  //       icon: '',
  //       color: '#4A235A',
  //       text: 'white',
  //       channel: 'News18',
  //       category: 'Fashion',
  //       url: '/images/news18.png',
  //       language: 'English'
  //   },
  //   {
  //       name: '',
  //       url: 'https://www.news18.com/rss/movies.xml',
  //       icon: '',
  //       color: '#FF5733',
  //       text: 'white',
  //       channel: 'News18',
  //       category: 'Movies',
  //       url: '/images/news18.png',
  //       language: 'English'        
  //   },
  // ];
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/tabs', (request, response) => {
    response.send(tabs);

});
app.get('/tabsbycategory', (request, response) => {
    let newTabs = tabs.filter(tab => tab[request.query.key].toLowerCase() === request.query.category.toLowerCase());
    response.send(newTabs);
});

app.get('/', (request, response) => {
      var url = request.query.url;
      var data;
      var req = https.get(url, function(res) {
      var count = request.query.count;  
      var page = request.query.page;  

        // Buffer the body entirely for processing as a whole.
        var bodyChunks = [];
        res.on('data', function(chunk) {
          // You can process streamed parts here...
          bodyChunks.push(chunk);
        }).on('end', function() {
          var body = Buffer.concat(bodyChunks);

          data = body;
          var result = convert.xml2json(data, {compact: true, spaces: 4});
            response.end(result);

        })
      });

      req.on('error', function(e) {

      });

  }).listen(PORT, () => console.log(`Listening on ${PORT}`));
  
