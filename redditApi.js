
'use strict';


require('dotenv').config();
const snoowrap = require('snoowrap');
const emailer = require('./emailApi.js');

const r = new snoowrap({
    userAgent: 'ModernRoguebot',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});

var methods ={

redditErrorCount : 0,

postVideo: function(videoTitle,link){
	r.getSubreddit('modernrogue').submitLink({
  		title: videoTitle,
  		url: link
	}).then((success) =>{
    
	    console.log('success');
	    emailer.data.setMailOptions('Modern Rogue bot successfull post to reddit',videoTitle);
	  	emailer.data.transporter.sendMail(emailer.data.mailOptions, function(error, info){
	  		if (error) {
	    		console.log(error);
	  		} else {
	    		console.log('Email sent: ' + info.response);
	  		}
		});



	}).catch((error) =>{

		if(redditErrorCount > 10)
		{
			emailer.data.setMailOptions('Modern Rogue bot failed a lot, shutting down',error);
	  		emailer.data.transporter.sendMail(emailer.data.mailOptions, function(error, info){
	  		if (error) {
	    		console.log(error);
	    		return process.abort();
	  		} else {
	    		console.log('Email sent: ' + info.response);
	    		return process.abort();
	  		}
			});
		}
    //email error 
    	emailer.data.setMailOptions('Modern Rogue bot Failed to post to reddit',error);
	  	emailer.data.transporter.sendMail(emailer.data.mailOptions, function(error, info){
	  		if (error) {
	    		console.log(error);
	  		} else {
	    		console.log('Email sent: ' + info.response);
	  		}
		});
	  	methods.redditErrorCount++;


	});
}

}
exports.data = methods;