require("dotenv").config();
var keys = require("./keys.js")

var spotify = new Spotify(keys.spotify);



//There will be 4 basic command arguments

/// 'concert-this' followed by an <artist/band name here>
///// ex: node liri.js concert-this <artist>
    /// shows: Name of venue, Venue location, Date of event (moment format "MM/DD/YYYY")

/// 'spotify-thissong <song name here>
////// ex: node liri.js spotify-this-song '<song name here>'
    /// shows: Artist, song's name, preview link of song, album song is from

/// 'movie-this' followed by a <movie name here>
////// ex: node liri.js movie-this <movie name here>    
    /// shows: Title, Year, IMDB Rating, Rotten tomatoes rating, country produced, language of movie, plot of movie, actors in movie
    // **Note axios package will be used for this, for OMDB api key use 'trilogy'

/// 'do-what-it-says' 
/////// ex: node liri.js do-what-it-says
    /// Liri will take the text inside of random.txt and use it to call one of LIRI's commands
        ///Should run spotify-this-song for "I want it that way" as follows  the text in random.txt
        //////edit text in random.txt to test out the feature for movie-this and concert-this