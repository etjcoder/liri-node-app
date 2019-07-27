require("dotenv").config();


var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
var fs = require('fs');

// var spotify = new Spotify({
    // id: your spotify client id
    // secret: your spotify client secret
// })

var divider = "\n(----------------------------------------------------------)\n"

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

var artist = process.argv.slice(3).join(" ");

var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=upcoming";

if (request == 'concert-this') {
axios
    .get(queryURL)
    .then(function(response){
        // console.log(response.data);
        console.log(response.data.length);
        for( i = 0; i < 10; i++) {
            console.log("-----------------------")
            console.log(response.data[i].venue.name);
            console.log(response.data[i].venue.city);
            var showTime = moment(response.data[i].datetime).format("MM-DD-YYYY");
            console.log(showTime)
            console.log("-----------------------")
            
        }
        var venue = response.data[0].venue.name;
            var city = response.data[0].venue.city;
            var time = moment(response.data[0].datetime).format("MM-DD-YYYY");
            var artists = artist.toUpperCase();
            var showString = `You've requested the next upcoming shows for ${artists}! The next show will be at the ${venue} in ${city} on ${time}`

            console.log(showString);
            fs.appendFile('log.txt', divider + showString, function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
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
var songName = process.argv.slice(3).join(" ");

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
    var artist = trackArray[0].artists[0].name;
    var song = trackArray[0].name;
    var link = trackArray[0].external_urls.spotify;
    var albumName = trackArray[0].album.name;
    var song = songName.toUpperCase();
    var spotifyString = `You've searched for details on the song, ${song}. ${song} was written by ${artist} and is part of the album ${albumName}. For more information please check out: ${link}`
    fs.appendFile('log.txt', divider + spotifyString, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });



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

var movie = process.argv.slice(3).join(" ")
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

        var movieTitle = response.data.Title
        var movieYear = response.data.Year;
        var movieRating = response.data.imdbRating;
        var movieCountry = response.data.Country;
        var movieLanguage = response.data.Language;
        var moviePlot = response.data.Plot;
        var movieActors = response.data.Actors;
        var movieName = movie.toUpperCase();
        var movieString = `You've requested information on ${movieName}. ${movieTitle} was released in ${movieCountry} in ${movieYear}. It's original release was in ${movieLanguage}.\n It received a ${movieRating} score from IMDB. \n The movie features ${movieActors}. \n The plot of the movie is: ${moviePlot}`
    
        fs.appendFile('log.txt', divider + movieString, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
    
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
/////// ex: node liri.js do-what-it-says random.txt
    /// Liri will take the text inside of random.txt and use it to call one of LIRI's commands
        ///Should run spotify-this-song for "I want it that way" as follows  the text in random.txt
        //////edit text in random.txt to test out the feature for movie-this and concert-this

var fs = require('fs')

if(request == "do-what-it-says") {

filename = process.argv[3]

fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log("OK: " + filename);
    console.log(data);
    // console.log(data.slice(18))
    console.log(data.split(","));
    var fileArray = data.split(",");

    if (fileArray[0] === "spotify-this-song"){
        console.log("You want to search spotify for information on this track");
        doThisSpotify();
    } else if (fileArray[0] === "movie-this") {
        console.log("You'd like more information via searching a movie title");
        doThisMovie();
    } else if (fileArray[0] === "concert-this") {
        console.log("You'd like to search upcoming shows via searching an artist");
        doThisConcert();
    } else {
        console.log("Sorry couldnt find a valid search paramter in the file")
    }


    /// SPOTIFY-THIS INTEGRATION /////
    function doThisSpotify() {
    spotify.search({ 
        type: 'track',
        query: fileArray[1],
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

    var artist = trackArray[0].artists[0].name;
    var song = trackArray[0].name;
    var link = trackArray[0].external_urls.spotify;
    var albumName = trackArray[0].album.name;
    // var song = songName.toUpperCase();
    var spotifyString = `You've searched for details on the song, ${song}. ${song} was written by ${artist} and is part of the album ${albumName}. For more information please check out: ${link}`
    fs.appendFile('log.txt', divider + spotifyString, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    })
    }

    ////// OMDB INTEGRATION////////
    function doThisMovie(){

    var reqMovie = fileArray[1]
    // console.log(movie)
    var queryURL2b = "http://www.omdbapi.com/?apikey=trilogy&t=" + reqMovie + "&y=&plot=short"

        axios  
    .get(queryURL2b)
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

        var movieTitle = response.data.Title
        var movieYear = response.data.Year;
        var movieRating = response.data.imdbRating;
        var movieCountry = response.data.Country;
        var movieLanguage = response.data.Language;
        var moviePlot = response.data.Plot;
        var movieActors = response.data.Actors;
        // var movieName = movie.toUpperCase();
        var movieString = `You've requested information on ${movieTitle}. ${movieTitle} was released in ${movieCountry} in ${movieYear}. It's original release was in ${movieLanguage}.\n It received a ${movieRating} score from IMDB. \n The movie features ${movieActors}. \n The plot of the movie is: ${moviePlot}`
    
        fs.appendFile('log.txt', divider + movieString, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
    
    })
    }

    /////// BANDSINTOWN INTEGRATION /////////
    
    function doThisConcert(){
    var reqArtist = fileArray.slice(1)

    var queryURLb = "https://rest.bandsintown.com/artists/" + reqArtist + "/events?app_id=codingbootcamp&date=upcoming";

    axios
    .get(queryURLb)
    .then(function(response){
        console.log("ran successfully")
        // console.log(response.data);
        for( i = 0; i < response.data.length; i++) {
            console.log("-----------------------")
            console.log(response.data[i].venue.name);
            console.log(response.data[i].venue.city);
            var showTime = moment(response.data[i].datetime).format("MM-DD-YYYY");
            console.log(showTime)
            console.log("-----------------------")
            
        }
            var venue = response.data[0].venue.name;
            var city = response.data[0].venue.city;
            var time = moment(response.data[0].datetime).format("MM-DD-YYYY");
            var artists = reqArtist
            var myShowString = `You've requested the next upcoming shows for ${artists}! The next show will be at the ${venue} in ${city} on ${time}`

            fs.appendFile('log.txt', divider + myShowString, function(err){
                if(err) throw err;
                console.log('Saved');
            });
    })
    }

})
}


//\\\\////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\\/\/\/\/\\\/
//\\\\////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\\/\/\/\/\\\/
//\\\\////\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\\/\/\/\/\\\/