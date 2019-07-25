require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');


// var spotify = new Spotify({
    // id: your spotify client id
    // secret: your spotify client secret
// })



var request = process.argv[2];
console.log(request);
///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// LIRI COMMAND FUNCTIONS ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

//There will be 4 basic command arguments

////////////////////////////////////////////////////////////////////
/////////////////////// #1 LIRI "CONCERT-THIS" /////////////////////
////////////////////////////////////////////////////////////////////

/// 'concert-this' followed by an <artist/band name here>
///// ex: node liri.js concert-this <artist>
    /// shows: Name of venue, Venue location, Date of event (moment format "MM/DD/YYYY")

var artist = process.argv.slice(3).join("");

var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=upcoming";

if (request == 'concert-this') {
axios
    .get(queryURL)
    .then(function(response){
        // console.log(response.data);
        console.log(response.data.length);
        for( i = 0; i < response.data.length; i++) {
            console.log("-----------------------")
            console.log(response.data[i].venue.name);
            console.log(response.data[i].venue.city);
            var showTime = moment(response.data[i].datetime).format("MM-DD-YYYY");
            console.log(showTime)
            console.log("-----------------------")
        }
    })
}
//\\\\////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\\/\/\/\/\\\/
//\\\\////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\\/\/\/\/\\\/
//\\\\////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\\/\/\/\/\\\/

//----------------------------------------------------------------------//

////////////////////////////////////////////////////////////////////////
//////////////////////// #2 LIRI "SPOTIFY-THIS" ////////////////////////
////////////////////////////////////////////////////////////////////////

/// 'spotify-this <song name here>
////// ex: node liri.js spotify-this '<song name here>'
    /// shows: Artist, song's name, preview link of song, album song is from
var songName = process.argv.slice(3).join("");

if (request == 'spotify-this') {
spotify.search({ 
        type: 'track',
        query: songName,
}, function(err, data) {
    if (err) {
        return console.log('Error occured: ' + err);
    }
    // console.log(data);
    trackArray = data.tracks.items
    // console.log(trackArray);
    // console.log(JSON.stringify(trackArray[0], null, 2))
    // console.log(trackArray[0])
    console.log("----------------------------------------------------------------------------")
    console.log("Artists: " + trackArray[0].artists[0].name);
    console.log("Song Name: " + trackArray[0].name);
    console.log("Spotify Link: " + trackArray[0].external_urls.spotify);
    console.log("Album Name: " + trackArray[0].album.name);
    console.log("----------------------------------------------------------------------------")
}

)
};




//\\\\////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\\/\/\/\/\\\/
//\\\\////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\\/\/\/\/\\\/
//\\\\////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\\/\/\/\/\\\/

//----------------------------------------------------------------------//

/////////////////////////////////////////////////////////////////////////
/////////////////////// #3 LIRI "MOVIE-THIS"/////////////////////////////
/////////////////////////////////////////////////////////////////////////

/// 'movie-this' followed by a <movie name here>
////// ex: node liri.js movie-this <movie name here>    
    /// shows: Title, Year, IMDB Rating, Rotten tomatoes rating, country produced, language of movie, plot of movie, actors in movie
    // **Note axios package will be used for this, for OMDB api key use 'trilogy'

var movie = process.argv.slice(3).join("")
// console.log(movie)
var queryURL2 = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie + "&y=&plot=short"

if (request == "movie-this"){
axios  
    .get(queryURL2)
    .then(function(response){
        // console.log(response.data);
        // for( i = 0; i < response.data.length; i++){
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.imdbRating);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
        // }
    })
}

//\\\\////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\\/\/\/\/\\\/
//\\\\////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\\/\/\/\/\\\/
//\\\\////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\\/\/\/\/\\\/

//----------------------------------------------------------------------//

////////////////////////////////////////////////////////////////////////
/////////////////////// #4 LIRI DO-WHAT-IT-SAYS ////////////////////////
////////////////////////////////////////////////////////////////////////

/// 'do-what-it-says' 
/////// ex: node liri.js do-what-it-says
    /// Liri will take the text inside of random.txt and use it to call one of LIRI's commands
        ///Should run spotify-this-song for "I want it that way" as follows  the text in random.txt
        //////edit text in random.txt to test out the feature for movie-this and concert-this







//\\\\////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\\/\/\/\/\\\/
//\\\\////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\\/\/\/\/\\\/
//\\\\////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\\/\/\/\/\\\/