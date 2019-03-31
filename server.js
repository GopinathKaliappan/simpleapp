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

    const liveTabs = [
      {
        name: 'Google News',
        url: 'https://news.google.com/?hl=ta&gl=IN&ceid=IN%3Ata',
        icon: '',
        color: 'green',
        channelImage: 'https://s3.amazonaws.com/images.seroundtable.com/t-google-news-1303475542.jpg',
        text: 'white',    
        type: '_cdata' ,
        channel: 'News18',
        language:'tamil',
        category: 'lifestyle',
        id: 101
      },
      {
        name: 'One India',
        url: 'https://tamil.oneindia.com/',
        icon: '',
        color: 'green',
        channelImage: 'https://prnews.io/content/platform/3729/logo.jpeg?1551272829',
        text: 'white',
        type: '_cdata' ,
        channel: 'News18',
        language:'tamil',
        category: 'lifestyle',
        id: 102
      },
      {
        name: 'Thina Thandhi',
        url: 'https://www.dailythanthi.com/',
        icon: '',
        color: 'green',
        channelImage: 'https://www.dailythanthi.com/Content/images/DT-Logo-Old.png',
        text: 'white',
        type: '_cdata' ,
        channel: 'News18',
        language:'tamil',
        category: 'lifestyle',
        id: 103
      },
      {
        name: 'Thina Malar',
        url: 'https://www.dinamalar.com/',
        icon: '',
        color: 'green',
        channelImage: 'https://www.ecell-iitkgp.org/img/media/Dinamalar%20Logo_lineart.jpg',
        text: 'white',
        type: '_cdata' ,
        channel: 'News18',
        language:'tamil',
        category: 'lifestyle',
        id: 104
      },
      {
        name: 'Samayam',
        url: 'https://tamil.samayam.com/',
        icon: '',
        color: 'green',
        channelImage: 'https://tamil.samayam.com/photo/66586409.cms',
        text: 'white',
        type: '_cdata' ,
        channel: 'News18',
        language:'tamil',
        category: 'lifestyle',
        id: 105
      }
    ];
    const tabs = [
    // {
    //     name: 'Live Updates',
    //     url: 'https://www.news18.com/rss/india.xml',
    //     icon: '',
    //     color: 'green',
    //     channelImage: 'https://images-na.ssl-images-amazon.com/images/I/41glolYSKtL._SY355_.png',
    //     text: 'white',
    //     type: '_cdata' ,
    //     channel: 'menu',
    //     language:'english',
    //     category: 'lifestyle',
    //     id: 100
    // },
    {
        name: 'India',
        url: 'https://www.news18.com/rss/india.xml',
        icon: '',
        color: 'purple',
        channelImage: 'https://images-na.ssl-images-amazon.com/images/I/41glolYSKtL._SY355_.png',
        text: 'white',
        type: '_cdata' ,
        channel: 'News18',
        language:'english',
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
        language:'english',
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
        language:'english',
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
        language:'english',
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
        language:'english',
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
        language:'english',
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
        channelImage: 'https://feeds.feedburner.com/Puthiyathalaimurai_India_News?format=xml',
        language:'tamil',
        category: 'movies',
        id: 36   
    },{
        name: 'Dinamalar Frontpage',
        url: 'https://feeds.feedburner.com/dinamalar/Front_page_news',
        icon: '',
        color: 'grey',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'https://releaseadvt.com/paper_image/2017.10.06_09-52-14dinamalar-LOGO.png',
        language:'tamil',
        category: 'movies',
        id: 37   
    },{
        name: 'Dinamalar அரசியல்',
        url: 'https://rss.dinamalar.com/?cat=pot1',
        icon: '',
        color: 'purple',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'https://releaseadvt.com/paper_image/2017.10.06_09-52-14dinamalar-LOGO.png',
        language:'tamil',
        category: 'movies',
        id: 37   
    },{
        name: 'Dinamalar incidents',
        url: 'https://rss.dinamalar.com/?cat=sam1',
        icon: '',
        color: 'orange',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'https://releaseadvt.com/paper_image/2017.10.06_09-52-14dinamalar-LOGO.png',
        language:'tamil',
        category: 'movies',
        id: 38   
    },{
        name: 'Dinamalar சினிமா',
        url: 'https://rss.dinamalar.com/tamilnadunews.asp',
        icon: '',
        color: 'brown',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'https://releaseadvt.com/paper_image/2017.10.06_09-52-14dinamalar-LOGO.png',
        language:'tamil',
        category: 'movies',
        id: 39   
    },{
        name: 'Dinamalar விளையாட்டு',
        url: 'https://sports.dinamalar.com/rss/',
        icon: '',
        color: 'brown',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'https://releaseadvt.com/paper_image/2017.10.06_09-52-14dinamalar-LOGO.png',
        language:'tamil',
        category: 'movies',
        id: 40   
    },{
        name: 'Dinamalar Football',
        url: 'https://sports.dinamalar.com/rss/Football',
        icon: '',
        color: 'brown',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'https://releaseadvt.com/paper_image/2017.10.06_09-52-14dinamalar-LOGO.png',
        language:'tamil',
        category: 'movies',
        id: 41   
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
    var language = request.query.language;
    let newTabs = tabs.filter(tab => tab.language.toLowerCase() === language.toLowerCase());
    response.send(newTabs);

});

app.get('/livetabs', (request, response) => {
    var language = request.query.language;
    let newTabs = liveTabs.filter(tab => tab.language.toLowerCase() === language.toLowerCase());
    response.send(newTabs);
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
          let item = JSON.parse(result).rss.channel.item;
          // var buf = new Buffer(item);
          let latestItems = item.splice(0, 40);
          console.log(latestItems.length);  
          response.send(latestItems);

        })
      });

      req.on('error', function(e) {

      });

  }).listen(PORT, () => console.log(`Listening on ${PORT}`));
  
