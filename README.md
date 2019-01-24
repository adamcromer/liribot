# <b>Liri Bot</b>

Liri Bot is a Command Line Interface or CLI which requests data from Spotify, Bands In Town, and the Online Movie Database and using their API to give user song, concert, or movie information. 
<br><br>

## <b>How To Use</b>

<hr>

To run the LIRI Bot you must run the program liri.js in the command line of node and then a valid search function. You must always input node and liri.js as the first two arguments.

**Example**: "node liri.js spotify-this-song subterranean homesick blues"

If you don't put in any argument it will explain how to ask for help.
<br><br>


### <b>Help</b>

Type help as a command prompt and the console will log information to inform or remind the user of acceptable arguments.
<br>

### <b>Search Spotify</b>

To search for song information type:

**"spotify-this-song" or "spotify"**

as the third argument and the song name as the fourth argument. The Spotify API will provide you information about the song including: Artist, Album Name, and a link to listen on Spotify.

A default search will happen if a song is not declared.
<br>

### <b>Search Bands In Town</b>

To search for song information type:

**"concert-this" or "bands" or "bandsintown"**

as the third argument and the artist name as the fourth argument. The Bands In Town API will provide you information about upcoming concerts by the provided artist including: Venue, Location, and Time.

A default search will happen if an artist is not declared.
<br>

### <b>Search OMDB</b>

To search for movie information type:

**"movie-this" or "movie"**

as the third argument and the movie name as the fourth argument. The OMDb API will provide you information about coming up concerts by the provided artist including: Date of Release, IMDB and Rotten Tomatoes ratings, Country of Origin, Language, Plot Summary, Director, and actors.

A default search will happen if a movie is not declared.
<br>

### <b>Random Search</b>

To do a surprise or random search type:

**"do-what-it-says" or "random"**

as the third argument and either spotify, bands, or omdb as the fourth argument for a random search which reads information from the random.txt file.

If a fourth argument is not listed it will provide random searches for all three types.
<br><br>

## <b>Install This Program</b>

<hr>

Clone this repository.

You must create API Keys from Spotify, Bands In Town, and OMDb.

Create a .env file formatted like this with your API Keys instead of where it says API Key. Spotify requires an ID key and a secret Key.

**' Spotify API Keys**

SPOTIFY_ID=APIKEY<br>
SPOTIFY_SECRET=APIKEY

**OMDB Key**

OMDB_KEY=APIKEY

**Bands In Town Key**

BANDS_KEY=APIKEY **'**

Open up your folder container the LIRI Bot files in the command line. **'CTRL + `**<br>

Type **'npm install'**

And then your file should be good to go. You can now type your arguments in to the command line.

<br>

[Made by Adam Cromer, 2018.](http://www.adamcromer.com)

