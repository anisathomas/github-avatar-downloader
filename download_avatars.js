var request = require('request');
var secrets = require('./secrets');
//console.log("Secrets:", secrets);
console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization' : 'token' + secrets.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var data = JSON.parse(body);

    cb(err, data);
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  for(var i = 0; i < result.length; i++){
      console.log(result[i].avatar_url);

    }

  console.log("Errors:", err);
  //console.log("Result:", result);
});







// Step 7: Print each avatar_url
// Your next and final step in this exercise should be to change your
// getRepoContributors function to parse the JSON string into an object and pass this object (an array of contributor objects) to the cb function.

// You will also need to modify the callback function to iterate over the results and (for now) console.log the value for each avatar_url in the collection:




