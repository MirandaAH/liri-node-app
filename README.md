# liri-node-app

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


What Each Command Should Do:
  1. node liri my-tweets: This will show the last 20 tweets and when they were created at in your terminal/bash window.
  2. node liri spotify-this-song: This will show the following information about the song in your terminal/bash window
   * Artist(s)
   * The song's name
   * A preview link of the song from Spotify
   * The album that the song is from
  3. node liri movie-this: This will output the following information to your terminal/bash window:
   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
  4. node liri do-what-it-says: Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands. It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
  Feel free to change the text in that document to test out the feature for other commands.
  5. node liri admin: Shows a log of commands that have been run.
  
