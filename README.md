# redditBot
Node.js bot that uses youtube and reddit apis

Project uses node.js to query the youtube api for newly posted videos. If it finds a new upload for a specified video then it uploads the link to a subreddit for that channel. Project then emails status updates to developer for api endpoint failures and will slow down the api query rate if not getting http 200 codes.
libraries used:
dotenv
nodemailer
https
express
snoowrap
forever


