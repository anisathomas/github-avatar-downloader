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

function downloadImageByURL(url, filePath) {
  var request = require('request');
  var fs = require('fs');

  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
          //console.log('Downloading image...');
         console.log('Response Status Code: ', response.statusMessage, response.headers['content-type']);
       })
       .pipe(fs.createWriteStream(filePath))
       .on('finish', function(){
        console.log('Download Finished')
       })
}

//Test: downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  if(process.argv[2] || process.argv[3] === undefined){
    console.log(Specify both arhuments);
    return -1;
  }
  for(var i = 0; i < result.length; i++){
      downloadImageByURL(result[i].avatar_url, "avatars/" + result[i].login);

    }

  console.log("Errors:", err);

});







// Step 7: Print each avatar_url
// Your next and final step in this exercise should be to change your
// getRepoContributors function to parse the JSON string into an object and pass this object (an array of contributor objects) to the cb function.

// You will also need to modify the callback function to iterate over the results and (for now) console.log the value for each avatar_url in the collection:
