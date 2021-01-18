
'use strict';
const https = require('https')
require('dotenv').config();
const youtubeApiKey = process.env.YOUTUBE_KEY;
let youtubePath = '/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=UU42VsoDtra5hMiXZSsD6eGg&key=' + youtubeApiKey;


var methods ={

httpRequestYoutube : function () {
	
     return new Promise((resolve, reject) => {
		const options = {
		  hostname: 'youtube.googleapis.com',
		  port: 443,
		  path: youtubePath,
		  method: 'GET',
		  headers: {
		        accept: 'application/json'
		    }
		}
        const req = https.request(options, (res) => {
        	
          if (res.statusCode < 200 || res.statusCode >= 300) {

                return reject(new Error('statusCode=' + res.statusCode));
            }
            let body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', (e) => {
          reject(e.message);
        });
        // send the request
       req.end();
    });
}


}
exports.data = methods;