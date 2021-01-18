

const yt = require('./youtubeApi.js');
const rd = require('./redditApi.js');
const emailer = require('./emailApi.js');
const fs = require('fs');

let rawdata = fs.readFileSync('status.json');
let programStatus = JSON.parse(rawdata);

let minutes = .15, the_interval = minutes * 60 * 1000;
let lastvideo = programStatus.lastVideo;
let errorCount =0;




setInterval(function() {


yt.data.httpRequestYoutube().then((data) => {
  console.log('starting');
	
	let videoURL = "https://www.youtube.com/watch?v="
	let videoId = data.items[0].snippet.resourceId.videoId;
	videoURL += videoId;
	let imageURL = data.items[0].snippet.thumbnails.default.url;
	let title = data.items[0].snippet.title;
  console.log('videoURL =' + videoURL );
    errorCount = 0;
    minutes = 5;
    the_interval =minutes *60 * 1000;

    if (videoURL.localeCompare(lastvideo) != 0){
    	lastvideo = videoURL;
    	let data = JSON.stringify({lastVideo:lastvideo});
		  fs.writeFileSync('status.json', data);

     
    	rd.data.postVideo(title,videoURL);
    }
    


}).catch((error) =>{
	//email error
	errorCount++;
    //return fail object;
  	if (errorCount >5)
  	{
  		minutes +=5;
  		the_interval =minutes *60 * 1000;
  		 emailer.data.setMailOptions('RedditBot unable to connect to youtube',error);
  		emailer.data.transporter.sendMail(emailer.data.mailOptions, function(error, info){
  		if (error) {
    		console.log(error);
  		} else {
    		console.log('Email sent: ' + info.response);
  		}
	});
  	}
  	if(errorCount >10){
  		   the_interval =720 *60 * 1000;

  	}


});

}, the_interval);

