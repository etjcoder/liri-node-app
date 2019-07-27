# liri-node-app


####### LIRI - LANGUAGE INTERPRETER RESPONSE INTERFACE #############

Liri was inspired by Apple's Siri. Liri is a primitive proto-type for Siri that demostrates some of the basic functionalities of a response interface.

Liri takes in text requests from users. Liri is currently limited to taking in movie names, song names and artist names.

Liri has 3 primary functions these are:
    "concert-this"
    "spotify-this"
    "movie-this"

Each of these functions derive data from separate API data sources.

Liri takes inputs via the command line in your console. In order to distinguish which unique function you would like Liri to perform, you must preface it with the function name. *NOTE: This is done via the process.argv array which we will demonstrate below.

EX: node liri.js concert-this Jonas Brothers
Args:[0]  [1]       [2]           [3..]

The above is an array called process.argv. The first item in the array is 'node', designated by the [0] below it. The rest follows. You want [2] to designate which function you'd like Liri to perform.

Anything after [2] will be included in Array slot 3. This is because we have used a .split(3) function that will split everything in the array after 2 into one variable. You may use multiple separate words because we use a .join(" ") function to separate each word from one combined word into multiple.

########################### CONCERT-THIS ###############################

The concert-this function's primary role is to provide the user with upcoming shows for one of their favorite artists/bands. In the console the user will be given a list of 10 upcoming shows in order of soonest to furthers away. 

The list of data will include the: 
    -Venue Name
    -City of the Venue
    -The date formatted in MM/DD/YYYY (using a Moment package)

This function will also log the first upcoming show into the log.txt for your review.

EXAMPLE VIDEO FOR CONCERT-THIS: (https://share.getcloudapp.com/Wnuw42d5)
############################ SPOTIFY-THIS ###############################

The spotify-this function's primary role is to provide the user with details about a song track name. The user will use the following syntax in the command prompt to run this function:

EX: node liri.js spotify-this Stan
Args:[0]  [1]       [2]        [3..]

The list of data will include the:
    -Primary Artist on the track
    -The official name of the song
    -The Spotify Link URL so the user can go directly to the song
    -The Album to which the song originally belongs to.

This function will also log the name, artists, spotify link and album name into the log.txt for your review.

EXAMPLE VIDEO FOR SPOTIFY-THIS: (https://share.getcloudapp.com/GGuLxnLQ)
############################# MOVIE-THIS ####################################

The movie-this function's primary role is to provide the user with details about a movie that they search by name. The user must use this syntax in the command prompt to run this function:

EX: node liri.js movie-this Terminator
Args:[0]  [1]       [2]       [3..]

The list of data will include the: 
    -Official Movie Title
    -The Year of release
    -The IMDB rating
    -The Country of origin
    -The language of origin
    -The plot
    -The actors/actresses in the movie

This function will also log the title, year released, etc. into the log.txt for your review.

EXAMPLE-VIDEO OF MOVIE-THIS: (https://share.getcloudapp.com/E0uld5PG)
########################### DO-WHAT-IT-SAYS ###################################

The final hidden fourth function which is more of an experimental function to test the limits of Liri is the do-what-it-says function.

This function will read a string of text from a "random.txt" file. This string of text will take the place of the 2nd and 3rd arguments in our command line.

EX: node liri.js do-what-it-says
>Liri will read the random.txt and pull the string making a new request:
EX: node liri.js spotify-this I want it that way

This will trigger the Spotify-this function detailed above.

Spotify test: spotify-this-song,"I Want it That Way"
OMDB test: movie-this,"Terminator"
Concert test: concert-this,Rolling Stones

EXAMPLE VIDEO OF DO-WHAT-IT-SAYS FUNCTION: (https://share.getcloudapp.com/bLuJozdR)

################################################################################

