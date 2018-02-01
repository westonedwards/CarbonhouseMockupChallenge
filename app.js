var Twitter = require('twitter');
var express = require('express');
var port = 8080;
var app = express();

/* Start Express */
app.listen(port);
console.log('Express listening on port: ' + port);

/* CORS setup */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
 
var client = new Twitter({
  consumer_key: 'S8VKbhaLXZqn6TsbCzzi2di2j',
  consumer_secret: 'WZACVfCgSXpMqMv2JuvmY4IVz2cqB86Y1jugLCRdDTZgjAjXKH',
  access_token_key: '47637346-4vF7DIUUdH27jQPWCXyvGXaZ42n0bZNPb2SGJVLa0',
  access_token_secret: 'JYacuQ0YuSUO6E7Elfpji6oraQjXKrD61e8BdrI7WeWgE'
});
 
var params = {screen_name: 'carbonhouse'};
var tweetRes;
client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if (!error) {
      tweetRes = tweets;
    }
});

app.get('/', (req, res) => {
    res.send(tweetRes);
});
