const express = require('express');
const Parser = require('rss-parser');
const convert = require('xml-js');
const path = require('path');
const mongoose = require('mongoose');
const rp = require('request-promise');

// Page Scrapper
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

const scrape = require('website-scraper');



const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
let app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('public'));
// mongoose.connect('mongodb://vicky:king$vicky1@ds159998.mlab.com:59998/jjj', {useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb://king:Gopi$vicky1@ds159998.mlab.com:59998/jjj', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
// mongoose.connect('mongodb://Gopinath:Gopi$vicky1@ds027896.mlab.com:27896/jjj', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

// const Tabs = new Schema({
//   name: String,
//   url: String,
//   color: String,
//   type: String,
//   channel: String,
//   channelImage: String,
//   language: String,
//   category: String,
//   id: Number
// });

// const MyModel = mongoose.model('Tabs', Tabs);






process.on('uncaughtException', function (err) {
  // console.error(err);
  
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





app.get('/axios-scrape', function(req,res) {

    const axios = require('axios');
    const cheerio = require('cheerio');

    const url = req.query.url;
    // console.log(url);    

    axios(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        const statsTable = $('.statsTableContainer > tr');
        const topPremierLeagueScorers = [];
        const headers = [];
        const titleHeader = $('h1' );
        const description = $('#article_body' ).text();
        const images = $('img');
        const metas = $('p');
        const meta = [];
        const imgs = [];
        // res.send(titleHeader);
        // const title = $('.post-full-title');
        titleHeader.each(function() {
                const tit = $(this).text();
                headers.push({tit});
        })     
        metas.each(function() {
            const ii = $(this).text();
            meta.push(ii);                         
        })
        images.each(function(){
            let imgURl = $(this).attr('src');
            imgs.push(imgURl);
        })

        statsTable.each(function () {
          const rank = $(this).find('.rank > strong').text();
          const playerName = $(this).find('.playerName > strong').text();
          const nationality = $(this).find('.playerCountry').text();
          const goals = $(this).find('.mainStat').text();

          topPremierLeagueScorers.push({
            rank,
            name: playerName,
            nationality,
            goals,
          });
        });

        res.send({headers, description, meta});
      })
      .catch(console.error);
});

app.get('/tabsdata', async(request, response) => {
    var language = request.query.language;
    let data = [];
    MyModel.find({ language: language }, await function (err, docs) {
            data = docs;
            response.send(data);
  // console.log(docs.toString("utf8"));
    });    
});

app.get('/add', async (req,res) => {
    res.send({
      add: false,
      review: false
    });
})


// const options = {
//   url: `https://tamil.oneindia.com/news/chennai/subasri-death-issue-ex-aiadmk-councilor-escaped-362912.html`,
//   transform: function (body) {
//     return cheerio.load(body);
//   }
// };

app.get('/scrape', async function(req, res){

//       const axios = require('axios');

//     const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';
// app.get('/gethtml', async(request, response) => {
//     axios(url)
//       .then(response => {
//         const html = response.data;
//         res.send(html);
//       })
//       .catch(console.error);
// });
    // rp(options)
    // .then(function (data) {
    //     console.log(data);
    //     // REQUEST SUCCEEDED: DO SOMETHING
    // })
    // .catch(function (err) {
    //     // REQUEST FAILED: ERROR OF SOME KIND
    // });
    // scrape(options).then((result)=> {
    //    res.send(result);     
    // });
   var optionss = {
    uri: 'https://tamil.oneindia.com/news/chennai/subasri-death-issue-ex-aiadmk-councilor-escaped-362912.html',
    simple: false    //  <---  <---  <---  <---
};
 


rp(optionss)
    .then(await function (body) {
          res.send(body);
          // console.log('afd sdffgdsfd sdf 100');
          data = body;
          var result = convert.xml2json(data, {compact: true, spaces: 4});
          // let item = JSON.parse(result).rss.channel.item;
          // var buf = new Buffer(item);
          // let latestItems = item.splice(0, 40);
          // console.log(latestItems.length);  
          res.send(res);
        // Request succeeded but might as well be a 404
        // Usually combined with resolveWithFullResponse = true to check response.statusCode
    })
    .catch(function (err) {
        // console.log(err);
        // console.log('afd sdffgdsfd sdf err');
        // Request failed due to technical reasons...
    });
    
})
var https = require('https');
var http = require('http');

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
        name: 'BBC Tamil',
        url: 'https://www.bbc.com/tamil',
        icon: '',
        color: 'green',
        channelImage: 'http://fmradios.in/wp-content/uploads/2015/07/BBC-Tamil-News-Radio-Live-Streaming-Online.jpg',
        text: 'white',    
        type: '_cdata' ,
        channel: 'BBC',
        language:'tamil',
        category: 'lifestyle',
        id: 102
      },
      {
        name: 'Puthiyathalaimurai',
        url: 'http://www.puthiyathalaimurai.com/',
        icon: '',
        color: 'green',
        channelImage: 'https://enabled.in/wp/wp-content/uploads/2016/09/Puthiya-Thalaimurai-Tv-Online_200x90.png',
        text: 'white',    
        type: '_cdata' ,
        channel: 'BBC',
        language:'tamil',
        category: 'lifestyle',
        id: 103
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
        id: 105
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
        id: 106
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
        id: 107
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
        id: 108
      },{
        name: 'Fox News',
        url: 'https://www.foxnews.com/',
        icon: '',
        color: 'green',
        channelImage: 'http://shootcutdeliver.com/wp-content/uploads/2013/06/fox_news_logo_a_l3.png',
        text: 'white',    
        type: '_cdata' ,
        channel: 'Fox',
        language:'english',
        category: 'news',
        id: 109
      },
      {
        name: 'CNN News',
        url: 'https://edition.cnn.com/',
        icon: '',
        color: 'green',
        channelImage: 'https://cdn.cnn.com/cnn/.e/img/3.0/global/misc/cnn-logo.png',
        text: 'white',    
        type: '_cdata' ,
        channel: 'CNN',
        language:'english',
        category: 'news',
        id: 110
      },
      {
        name: 'BBC News',
        url: 'https://www.bbc.com/news',
        icon: '',
        color: 'green',
        channelImage: 'https://www.pngkey.com/png/detail/222-2228618_bbc-logo-remake-by-minderiayoutuber-on-deviant-bbc.png',
        text: 'white',    
        type: '_cdata' ,
        channel: 'BBC',
        language:'english',
        category: 'news',
        id: 111
      },
      {
        name: 'SKY News',
        url: 'https://news.sky.com/',
        icon: '',
        color: 'green',
        channelImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Sky-news-logo.png',
        text: 'white',    
        type: '_cdata' ,
        channel: 'BBC',
        language:'english',
        category: 'news',
        id: 112
      },
      {
        name: 'Google News',
        url: 'https://news.google.co.in/',
        icon: '',
        color: 'green',
        channelImage: 'https://s3.amazonaws.com/images.seroundtable.com/t-google-news-1303475542.jpg',
        text: 'white',    
        type: '_cdata' ,
        channel: 'Google',
        language:'english',
        category: 'news',
        id: 113
      },
      {
        name: 'MSNBC',
        url: 'https://www.msnbc.com/',
        icon: '',
        color: 'green',
        channelImage: 'https://media3.s-nbcnews.com/i/assets/msnbc-color-square-dvt.png',
        text: 'white',    
        type: '_cdata' ,
        channel: 'MSNBC',
        language:'english',
        category: 'news',
        id: 114
      }, {
        name: 'Euro News',
        url: 'https://www.euronews.com/',
        icon: '',
        color: 'green',
        channelImage: 'https://static.euronews.com/articles/332964/880x495_332964.jpg',
        text: 'white',    
        type: '_cdata' ,
        channel: 'Euronews',
        language:'english',
        category: 'news',
        id: 115
      },{
        name: 'OneIndia Malayalam',
        url: 'https://malayalam.oneindia.com/',
        icon: '',
        color: 'green',
        channelImage: 'https://malayalam.oneindia.com/images/malayalam-oneindia-logo.svg',
        text: 'white',    
        type: '_cdata' ,
        channel: 'oneindia',
        language:'മലയാള',
        category: 'news',
        id: 116
      },{
        name: 'Asianet Malayalam',
        url: 'https://malayalam.oneindia.com/',
        icon: '',
        color: 'green',
        channelImage: 'https://static.asianetnews.com/v1/images/malyalam-new-logo.svg',
        text: 'white',    
        type: '_cdata' ,
        channel: 'Asianet',
        language:'മലയാള',
        category: 'news',
        id: 117
      },{
        name: 'Asianet Malayalam',
        url: 'https://malayalam.oneindia.com/',
        icon: '',
        color: 'green',
        channelImage: 'https://static.asianetnews.com/v1/images/malyalam-new-logo.svg',
        text: 'white',    
        type: '_cdata' ,
        channel: 'Asianet',
        language:'മലയാള',
        category: 'news',
        id: 117
      },        
    ];

    const liveStream = [
      {
        name: 'Puthiyathalaimurai',
        url: 'https://www.youtube.com/embed/hPY6UVVXEUY',
        icon: '',
        color: 'green',
        channelImage: 'https://agaramnews.herokuapp.com/static/channel/newen.png',
        text: 'white',    
        type: '_cdata' ,
        channel: 'Puthiyathalaimurai',
        language:'tamil',
        category: 'lifestyle',
        id: 103
      },
      {
        name: 'Sun Live',
        url: 'https://www.youtube.com/embed/tolWDbC_2iQ',
        icon: '',
        color: 'green',
        channelImage: 'https://agaramnews.herokuapp.com/static/channel/sun.png',
        text: 'white',
        type: '_cdata' ,
        channel: 'Sun News',
        language:'tamil',
        category: 'lifestyle',
        id: 106
      },
      {
        name: 'Polimer Tv',
        url: 'https://www.youtube.com/embed/iV9P-K9mv6E',
        icon: '',
        color: 'green',
        channelImage: 'https://agaramnews.herokuapp.com/static/channel/polimer.jpg',
        text: 'white',
        type: '_cdata' ,
        channel: 'Polimer',
        language:'tamil',
        category: 'lifestyle',
        id: 107
      },
      {
        name: 'News7',
        url: 'https://www.youtube.com/embed/BbWPxNT1ACg',
        icon: '',
        color: 'green',
        channelImage: 'https://agaramnews.herokuapp.com/static/channel/news7.jpg',
        text: 'white',
        type: '_cdata' ,
        channel: 'News7',
        language:'tamil',
        category: 'lifestyle',
        id: 108
      },{
        name: 'SKY News Live',
        url: 'https://www.youtube.com/embed/lrX6ktLg8WQ',
        icon: '',
        color: 'green',
        channelImage: 'https://agaramnews.herokuapp.com/static/channel/sky.png',
        text: 'white',    
        type: '_cdata' ,
        channel: 'SKY',
        language:'english',
        category: 'news',
        id: 109
      },
      {
        name: 'CNN News',
        // url: 'https://www.youtube.com/embed/EWgWFS0BC-U',
        url: 'https://www.youtube.com/embed/7-mZ9WspnvM',
        icon: '',
        color: 'green',
        channelImage: 'https://agaramnews.herokuapp.com/static/channel/cnn.jpg',
        text: 'white',    
        type: '_cdata' ,
        channel: 'CNN',
        language:'english',
        category: 'news',
        id: 110
      },
       {
        name: 'Euro News',
        url: 'https://www.youtube.com/embed/7t04Mv8_5sM',
        icon: '',
        color: 'green',
        channelImage: 'https://agaramnews.herokuapp.com/static/channel/euro.jpg',
        text: 'white',    
        type: '_cdata' ,
        channel: 'Euronews',
        language:'english',
        category: 'news',
        id: 115
      }
      // {
      //   name: 'Asianet Malayalam',
      //   url: 'https://www.youtube.com/embed/H9mXFeGsGEE',
      //   icon: '',
      //   color: 'green',
      //   channelImage: 'https://agaramnews.herokuapp.com/static/channel/asianet.png',
      //   text: 'white',    
      //   type: '_cdata' ,
      //   channel: 'Asianet',
      //   language:'മലയാള',
      //   category: 'news',
      //   id: 117
      // }        
    ];



    const languages = [{
        label: 'English',
        value: 'english',
        id: 'english'
    },{
        label: 'தமிழ்',
        value: 'tamil',
        id: 'tamil'
    },{
        label: 'മലയാള',
        value: 'മലയാള',
        id: 'മലയാള'
    },{
        label: 'हिंदी',
        value: 'hindi',
        id: 'hindi'
    },
    {
        label: 'తెలుగు',
        value: 'telugu',
        id: 'telugu'
    },{
        label: 'All',
        value: 'all',
        id: 'all'
    }];
    const tabs = [
    {
        name: 'தமிழகம்',
        url: 'https://tamil.samayam.com/state%20news/rssfeedsection/48069549.cms',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'tamilnadu',
        language:'tamil',
        category: 'தமிழகம்',
        id: 80
    },    
    {
        name: 'Movies',
        url: 'https://www.news18.com/rss/movies.xml',
        icon: '',
        color: 'grey',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'movies',
        language:'english',
        category: 'movies',
        id: 35    
    },{
        name: '1 இந்தியா',
        url: 'https://tamil.oneindia.com/rss/tamil-art-culture-fb.xml',
        icon: '',
        color: 'grey',
        text: 'white',
        type: '_cdata',
        channel: '1 இந்தியா',
        channelImage: 'india',
        language:'tamil',
        category: 'movies',
        id: 36   
    },{
        name: 'கலாச்சாரம்',
        url: 'https://tamil.oneindia.com/rss/tamil-art-culture-fb.xml',
        icon: '',
        color: 'brown',
        text: 'white',
        type: '_cdata',
        channel: 'OneIndia',
        channelImage: 'culture',
        language:'tamil',
        category: 'culture',
        id: 43   
    },{
        name: 'நகைச்சுவை',
        url: 'https://tamil.oneindia.com/rss/tamil-jokes-fb.xml',
        icon: '',
        color: 'brown',
        text: 'white',
        type: '_cdata',
        channel: 'OneIndia',
        channelImage: 'tcomedy',
        language:'tamil',
        category: 'jokes',
        id: 44   
    },{
        name: 'Motivational',
        url: 'https://tamil.oneindia.com/rss/tamil-motivational-stories-fb.xml',
        icon: '',
        color: 'brown',
        text: 'white',
        type: '_cdata',
        channel: 'OneIndia',
        channelImage: 'motivational',
        language:'tamil',
        category: 'jokes',
        id: 45   
    },{
        name: 'OneIndia News',
        url: 'https://tamil.oneindia.com/rss/tamil-news-fb.xml',
        icon: '',
        color: 'brown',
        text: 'white',
        type: '_cdata',
        channel: 'OneIndia',
        channelImage: 'news',
        language:'tamil',
        category: 'jokes',
        id: 46   
    },{
        name: 'Jobs',
        url: 'https://tamil.oneindia.com/rss/tamil-jobs-fb.xml',
        icon: '',
        color: 'brown',
        text: 'white',
        type: '_cdata',
        channel: 'OneIndia',
        channelImage: 'jobs',
        language:'tamil',
        category: 'jokes',
        id: 47   
    }
     ,{
        name: 'Nasa News',
        url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'sunset',
        language:'english',
        category: 'Space & Research',
        id: 88
    },{
        name: 'Aeronautics',
        url: 'https://www.nasa.gov/rss/dyn/aeronautics.rss',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'world',
        language:'english',
        category: 'Aeronautics',
        id: 91
    },
    {
        name: 'Life Style',
        url: 'https://www.news18.com/rss/lifestyle.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'lifestyle',
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
        channelImage: 'business',
        language:'english',
        category: 'business',
        id: 34
    },
    {
        name: 'Space & Education',
        url: 'https://www.nasa.gov/rss/dyn/educationnews.rss',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'innovation',
        language:'english',
        category: 'Space & Education',
        id: 89
    },{
        name: 'Space Photography',
        url: 'https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'sunset',
        language:'english',
        category: 'Space Photography',
        id: 90
    },{
        name: 'ESPN',
        url: 'https://www.espn.com/espn/rss/news',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'football',
        language:'english',
        category: 'Sports',
        id: 92
    },    
    {
        name: 'Comedy',
        url: 'https://www.huffpost.com/section/comedy/feed',
        icon: '',
        color: 'brown',
        text: 'white',
        type: '_cdata',
        channel: 'Huffington Post',
        channelImage: 'jokes',
        language:'english',
        category: 'jokes',
        id: 48  
    },    
    {
        name: 'Home and Living',
        url: 'https://www.huffpost.com/section/huffpost-home/feed',
        icon: '',
        color: 'brown',
        text: 'white',
        type: '_cdata',
        channel: 'Huffington Post',
        channelImage: 'homeandliving',
        language:'english',
        category: 'homeandliving',
        id: 49  
    },{
        name: 'Travel',
        url: 'https://www.huffpost.com/section/travel/feed',
        icon: '',
        color: 'brown',
        text: 'white',
        type: '_cdata',
        channel: 'Huffington Post',
        channelImage: 'travel',
        language:'english',
        category: 'Travel',
        id: 50  
    },{
        name: 'Women',
        url: 'https://www.huffpost.com/section/women/feed',
        icon: '',
        color: 'brown',
        text: 'white',
        type: '_cdata',
        channel: 'Huffington Post',
        channelImage: 'women',
        language:'english',
        category: 'Travel',
        id: 51  
    },{
        name: 'World Huffington',
        url: 'https://www.huffpost.com/section/world-news/feed',
        icon: '',
        color: 'brown',
        text: 'white',
        type: '_cdata',
        channel: 'Huffington Post',
        channelImage: 'world',
        language:'english',
        category: 'Travel',
        id: 53
    },
    {
        name: 'India',
        url: 'https://www.news18.com/rss/india.xml',
        icon: '',
        color: 'purple',
        channelImage: 'india',
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
           channelImage: 'world',
        language:'english',
        category: 'world',
        id: 31
    },
    {
        name: 'Abroad',
        url: 'https://malayalam.oneindia.com/rss/malayalam-abroad-fb.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'abroad_malayalam',
        language:'മലയാള',
        category: 'abroad',
        id: 54
    },
    {
        name: 'Alappuzha',
        url: 'https://malayalam.oneindia.com/rss/malayalam-alappuzha-fb.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'alappuzha_malayalam',
        language:'മലയാള',
        category: 'alappuzha',
        id: 55
    },
    {
        name: 'Astroloy',
        url: 'https://malayalam.oneindia.com/rss/malayalam-astrology-fb.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'astroloy_malayalam',
        language:'മലയാള',
        category: 'astroloy',
        id: 56
    },
    {
        name: 'Ernakulam',
        url: 'https://malayalam.oneindia.com/rss/malayalam-ernakulam-fb.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'ernakulam',
        language:'മലയാള',
        category: 'ernakulam_malayalam',
        id: 57
    },
    {
        name: 'Womens',
        url: 'https://malayalam.oneindia.com/rss/malayalam-women-fb.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'women',
        language:'മലയാള',
        category: 'malayalam_womens',
        id: 58
    },
    {
        name: 'Social Media',
        url: 'https://malayalam.oneindia.com/rss/malayalam-social-media-fb.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'social_media',
        language:'മലയാള',
        category: 'social_media',
        id: 59
    },
    {
        name: 'इनोवेशन',
        url: 'https://hindi.news18.com/rss/khabar/business/innovation.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'innovation',
        language:'hindi',
        category: 'इनोवेशन',
        id: 60
    },
     {
        name: 'उत्तर प्रदेश',
        url: 'https://hindi.news18.com/rss/khabar/uttar-pradesh/uttar-pradesh.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'uttarpradesh',
        language:'hindi',
        category: 'उत्तर प्रदेश',
        id: 61
    },
     {
        name: 'उत्तराखंड',
        url: 'https://hindi.news18.com/rss/khabar/uttarakhand/uttarakhand.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'uttarakhand',
        language:'hindi',
        category: 'उत्तर प्रदेश',
        id: 62
    }  , {
        name: 'एसेसरीज़',
        url: 'https://hindi.news18.com/rss/khabar/tech/accessories.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'accessories',
        language:'hindi',
        category: 'एसेसरीज़',
        id: 63
    } , {
        name: 'ऑनलाइन बिज़नेस',
        url: 'https://hindi.news18.com/rss/khabar/business/online-business.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'online_business',
        language:'hindi',
        category: 'ऑनलाइन बिज़नेस',
        id: 64
    } , {
        name: 'करियर',
        url: 'https://hindi.news18.com/rss/khabar/career/career-career.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'career',
        language:'hindi',
        category: 'करियर',
        id: 65
    } , {
        name: 'कल्चर',
        url: 'https://hindi.news18.com/rss/khabar/lifestyle/culture.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'culture_india',
        language:'hindi',
        category: 'कल्चर',
        id: 66
    },{
        name: 'क्राइम',
        url: 'https://hindi.news18.com/rss/khabar/crime/crime.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'crime',
        language:'hindi',
        category: 'क्राइम',
        id: 68
    } , {
        name: 'क्रिकेट',
        url: 'https://hindi.news18.com/rss/khabar/sports/cricket.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'cricket',
        language:'hindi',
        category: 'क्रिकेट',
        id: 69
    },{
        name: 'ट्रेंड्स',
        url: 'https://hindi.news18.com/rss/khabar/lifestyle/trends.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'trends',
        language:'hindi',
        category: 'ट्रेंड्स',
        id: 70
    } ,{
        name: 'पैसा बनाओ',
        url: 'https://hindi.news18.com/rss/khabar/business/money-making-tips.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'money_making_tips',
        language:'hindi',
        category: 'पैसा बनाओ',
        id: 71
    },{
        name: 'फ़िल्म रिव्यू',
        url: 'https://hindi.news18.com/rss/khabar/entertainment/film-review.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'movies',
        language:'hindi',
        category: 'फ़िल्म रिव्यू',
        id: 72
    },
    {
        name: 'फुटबॉल',
        url: 'https://hindi.news18.com/rss/khabar/sports/football.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'football',
        language:'hindi',
        category: 'फुटबॉल',
        id: 73
    },
    {
        name: 'Bollywood',
        url: 'https://hindi.news18.com/rss/khabar/entertainment/bollywood.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: 'News18',
        channelImage: 'bollywood',
        language:'hindi',
        category: 'Bollywood',
        id: 74
    },
   
    {
        name: 'முக்கிய செய்திகள்',
        url: 'https://tamil.samayam.com/rssfeedstopstories.cms',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'breaking',
        language:'tamil',
        category: 'முக்கிய செய்திகள்',
        id: 76
    },
    {
        name: 'இந்தியா',
        url: 'https://tamil.samayam.com/india%20news/rssfeedsection/45939413.cms',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'india_tamil',
        language:'tamil',
        category: 'இந்தியா',
        id: 77
    } ,{
        name: 'தங்கம் & வெள்ளி விலை',
        url: 'https://tamil.samayam.com/gold%20rate%20silver%20rate%20today/rssfeedsection/65120219.cms',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'gold',
        language:'tamil',
        category: 'தங்கம் & வெள்ளி விலை',
        id: 78
    }
     ,{
        name: 'பெட்ரோல் & டீசல் விலை',
        url: 'https://tamil.samayam.com/petrol%20price%20diesel%20price%20today/rssfeedsection/65120203.cms',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'petrol',
        language:'tamil',
        category: 'பெட்ரோல் & டீசல் விலை',
        id: 79
    },
    {
        name: 'அரசியல் செய்திகள்',
        url: 'https://rss.dinamalar.com/?cat=ara1',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'politics',
        language:'tamil',
        category: 'அரசியல் செய்திகள்',
        id: 82
    },{
        name: 'பொது செய்திகள்',
        url: 'https://rss.dinamalar.com/?cat=pot1',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'enter',
        language:'tamil',
        category: 'பொது செய்திகள்',
        id: 83
    }
    ,{
        name: 'உலக செய்திகள்',
        url: 'https://rss.dinamalar.com/?cat=INL1',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'world',
        language:'tamil',
        category: 'உலக செய்திகள்',
        id: 84
    },{
        name: 'తెలుగు Astroloy',
        url: 'https://telugu.oneindia.com/rss/telugu-jyotishyam-fb.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'astroloy_malayalam',
        language:'telugu',
        category: 'తెలుగు Astroloy',
        id: 85
    },
    // {
    //     name: 'తెలుగు Education',
    //     url: 'https://www.sakshieducation.com/rssEducation.aspx',
    //     icon: '',
    //     color: '#922B21',
    //     text: 'white',
    //     type: '_cdata',
    //     channel: '',
    //     channelImage: 'online_business',
    //     language:'telugu',
    //     category: 'తెలుగు Education',
    //     id: 88
    // },
    {
        name: 'తెలుగు News',
        url: 'https://telugu.oneindia.com/rss/telugu-news-fb.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'lifestyle',
        language:'telugu',
        category: 'తెలుగు News',
        id: 86
    },{
        name: 'తెలుగు Today',
        url: 'https://telugu.oneindia.com/rss/telugu-talk-of-the-day-fb.xml',
        icon: '',
        color: '#922B21',
        text: 'white',
        type: '_cdata',
        channel: '',
        channelImage: 'enter',
        language:'telugu',
        category: 'తెలుగు Today',
        id: 87
    }
  ];




app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

http.createServer(function (request, response) {
    // console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

})



app.get('/tabs', (request, response) => {
    var language = request.query.language;
    newTabs = [];
    if(language === 'all') {
      newTabs = tabs;  
    } else {
      newTabs = tabs.filter(tab => tab.language.toLowerCase() === language.toLowerCase());  
    }
    
    newTabs[0].languages = languages; 
    response.send(newTabs);

});

app.get('/livetabs', (request, response) => {
    var language = request.query.language;
    if(language === 'all') {
      newTabs = liveTabs;
      newTabs[0].languages = languages;
      response.send(newTabs);  
    } else {
      let newTabs = liveTabs.filter(tab => tab.language.toLowerCase() === language.toLowerCase());
      newTabs[0].languages = languages;
      response.send(newTabs);  
    }    
});
app.get('/live-stream', (request, response) => {
    var language = request.query.language;
    let newStream = [];
    if(language === 'all') {
      newStream = liveStream;
      newStream[0].languages = languages;
      response.send(newStream);  
    } else {
      newStream = liveStream.filter(tab => tab.language.toLowerCase() === language.toLowerCase());
      newStream[0].languages = languages;
      response.send(newStream);  
    }    
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
        }).on('end', async function() {
          var body = Buffer.concat(bodyChunks);

          data = body;
          var result = convert.xml2json(data, {compact: true, spaces: 4});
          let item = JSON.parse(result).rss.channel.item;
          // var buf = new Buffer(item);

          let latestItems = item.splice(0, 40);

          
          
          response.send(latestItems);

        })
      });

      req.on('error', function(e) {

      });

      }).listen(PORT, () => console.log(`Listening on ${PORT}`));
  
