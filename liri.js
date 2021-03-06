//Variables to require certain node packages
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

//Variables equal to their keys hidden in the local .env file
var omdbKey = keys.omdb.key;
var bandsKey = keys.bands.key;
var spotify = new Spotify(keys.spotify);

//Divider to help clean up displayed and written code
var divider = ("\n\n------------------------\n");

//Function to help a user understand commands
var helpFunction = function () {

    console.log("Liri Bot is a tool which uses API Data from Spotify, Bands In Town, and Open Movie Database. \nIn the command line after typing 'node liri.js' type 'concert-this' followed by a band name to search for available concerts, \n'spotify-this-song' followed by a song name to see information about that song, \n'movie-this' and a movie title to see information about that movie, \nor 'do-what-it-says' for a surprise.");
}

//Function to add data to a text
var appendData = function (data) {

    fs.appendFile("log.txt", data, function (err) {
        if (err) {
            throw err;
        }
    });
}

//Function to connect to Spotify's API
var spotifyFunc = function (search) {

    if (search === "default") {
        search = "Get Lucky";
    }

    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var song = data.tracks.items[0];

        var songInfo = [
            "Song name: " + song.name +
            "\nArtist: " + song.artists[0].name +
            "\nAlbum name: " + song.album.name +
            "\nOn Spotify: " + song.external_urls.spotify
        ].join("\n\n");
        var cleanData = "\n" + songInfo + divider;

        appendData(cleanData);
        console.log(cleanData);
    });
}

//Function to use axios to connect to Bands In Town API
var bandsFunc = function (search) {

    if (search === "default") {
        search = "Unknown Mortal Orchestra";
    }

    url = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=" + bandsKey;

    axios.get(url).then(function (response) {

        for (var i = 0; i < response.data.length; i++) {

            var event = response.data[i];
            var time = moment(event.datatime).format('LLLL');

            var eventInfo = ["\nArtist: " + event.lineup[0] +
                "\nVenue: " + event.venue.name +
                "\nLocation: " + event.venue.city + ", " + event.venue.country +
                "\nTime: " + time
            ].join("\n");

            var cleanData = eventInfo + divider;

            appendData(cleanData);
            console.log(cleanData);
        }
    });
}

//Function to use axios to connect to OMDB API
var omdbFunc = function (search) {

    if (search === "default") {
        search = "Groundhog Day";
    }

    var url = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + search;

    axios.get(url).then(function (response) {

        var movie = response.data;
        var date = moment(movie.Released, "MM-DD-YYYY").format('LL');

        var movieInfo = ["\nTitle: " + movie.Title +
            "\nDate of release: " + date +
            "\nIMDB Rating: " + movie.Ratings[0].Value +
            "\nRotten Tomatoes Rating: " + movie.Ratings[1].Value +
            "\nCountry of Origin: " + movie.Country +
            "\nLanguage: " + movie.Language +
            "\nPlot: " + movie.Plot +
            "\nDirector: " + movie.Director +
            "\nActors: " + movie.Actors
        ].join("\n");

        var cleanData = movieInfo + divider;

        appendData(cleanData);
        console.log(cleanData);
    });
}

//Function to read randomFile data
var readRandom = function (start, end) {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console
        if (error) {
            return console.log(error);
        }

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        readArray(dataArr, start, end);

    });
}

var readArray = function (arr, start, end) {
    for (var i = start; i < end + 1; i++) {

        switch (arr[i]) {

            case "spotify":
                spotifyFunc(arr[i + 1]);
                break;

            case "bands":
                bandsFunc(arr[i + 1]);
                break;

            case "omdb":
                omdbFunc(arr[i + 1]);
                break;
        }
    }
}

//Function to run on searchType of do-what-it-says or random
var randomFunc = function (search) {
    switch (search) {
        case "spotify":
            readRandom(0, 1);
            break;

        case "bands":
            readRandom(2, 3);
            break;

        case "omdb":
            readRandom(4, 5);
            break;

        default:
            readRandom(0, 5);
    }
}

//Switch function to run functions depending on certain user input
//Code should run functions for easier to read code
var masterFunction = function (type, term) {
    switch (type) {

        case "help":
            helpFunction();
            break;

        case "concert-this":
            bandsFunc(term);
            break;

        case "bands":
            bandsFunc(term);
            break;

        case "bandsintown":
            bandsFunc(term);
            break;

        case "spotify-this-song":
            spotifyFunc(term);
            break;

        case "spotify":
            spotifyFunc(term);
            break;

        case "movie-this":
            omdbFunc(term);
            break;

        case "movie":
            omdbFunc(term);
            break;

        case "omdb":
            omdbFunc(term);
            break;

        case "do-what-it-says":
            randomFunc(term);
            break;

        case "surprise":
            randomFunc(term);
            break;

        case "random":
            randomFunc(term);
            break;

        default:
            console.log("Welcome to Liri Bot.\nSearch help for instructions with what you can do with LIRI Bot.");
    }
}

// log user input
var searchType = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");
if (searchTerm === "") {
    searchTerm = "default";
}

//Runs the masterFunction for the first time
masterFunction(searchType, searchTerm);
