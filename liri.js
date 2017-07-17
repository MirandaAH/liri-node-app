
var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

let command = process.argv[2];
let title = process.argv[3];

switch(command){
  case 'my-tweets':
    TwitterSearch();
    break;
  case 'spotify-this-song':
    SpotifySearch();
    break;
  case 'movie-this':
    OmdbSearch();
    break;
  case 'do-what-it-says':
    WhatSearch();
    break;
  case 'admin':
    fs.readFile('log.txt', 'utf8', function(error, data){
      console.log(data);
    });
    break;
}


//API CALLS

function TwitterSearch () {

let tKeys = keys.twitterKeys;
let params = {screen_name: 'doctorwhoood'};
let client = new Twitter(tKeys);
logUser();
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if(!error){
    // console.log(tweets)
    for (var i = 0; i < tweets.length; i++){
    console.log("Date: " + tweets[i].created_at +"\nUsername: " + tweets[i].user.screen_name + "\nTweet: " + tweets[i].text);
   }
  }
});
}



function OmdbSearch (){
  if (!title){
    title = "Mr.Nobody"
  }
  logUser();
  let queryURL = 'http://www.omdbapi.com/?apikey=40e9cece&type=movie&t=' + title;
  request.post(queryURL, {json: true}, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("Title: " +  body.Title + "\nYear: " +
                  body.Year + "\nIMDB Rating: " + body.IMDBrating +
                  "\nRotten Tomatoes: " + body.Ratings.imdbRating + "\nCountry: " +
                  body.Country + "\nLanguage: " + body.Language + "\nPlot: " +
                  body.Plot + "\nActors: " + body.Actors);
    }
  });
}



function SpotifySearch () {
  let sKeys = keys.spotifyKeys;
  let spotify= new Spotify(sKeys);
  let count;
  logUser();
  spotify.search({type: 'track', query: title}, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
    }
    console.log("Artist: " + data.tracks.items[0].artists[0].name + "\n" +
                "Song: " + data.tracks.items[0].name + "\n" +
                "Preview: " + data.tracks.items[0].external_urls.spotify + "\n"+
                "Album: " + data.tracks.items[0].album.name);
  });
}


function WhatSearch() {
  logUser();
 fs.readFile('random.txt', "utf8", function (error, data) {
    var inputNum = data.indexOf(',');
    command = data.substring(0,inputNum);
    title = data.substring(inputNum+1, data.length);
    if (command === "spotify-this-song"){
      SpotifySearch();
    }else if (command === "movie-this"){
      OmdbSearch();
    }else if (command === "my-tweets"){
      TwitterSearch();
    }
  });
}

//LOG
function UserSearch (command, title){
  this.command = command;
  this.title = title;
  this.date = Date.now();
};

function logUser () {
  var newUserSearch = new UserSearch(command, title);
  var log = "Command: "+ newUserSearch.command + " Title: " + newUserSearch.title + " Date: " + newUserSearch.date + "\n";
  fs.appendFile('log.txt', log, function (err) {if (err){console.log(err);}});
}
