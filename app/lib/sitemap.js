'use strict';
var Crawler = require("simplecrawler");

function SpiderGwen(opts) {
  // options:
  // url - required
  // user
  // password
  // function fetchcomplete - probably should be required
  // function complete
  // function error
  
  if (!opts.url) { 
    if (typeof opts.error === 'function') { opts.error(); }
    return;
  }

  console.log(opts.url);
  let myCrawler = new Crawler(opts.url.replace(/^https?:\/\//i, ''));

  let conditionID = myCrawler.addFetchCondition(function(parsedURL) {
      return !parsedURL.uriPath.match(/\.(css|js|eot|ttf|svg)$/i);
  });
  let excludeImages = myCrawler.addFetchCondition(function(parsedURL) {
      return !parsedURL.uriPath.match(/\.(png|jpe?g|gif)$/i);
  });
  let excludePDFs = myCrawler.addFetchCondition(function(parsedURL) {
      return !parsedURL.uriPath.match(/\.(pdf)$/i);
  });
  let ignoreHash = myCrawler.addFetchCondition(function(parsedURL) {
      return !parsedURL.uriPath.match(/#/);
  });
  myCrawler.stripQuerystring = true;

  if (opts.user && opts.user.length > 0) {
    myCrawler.needsAuth = true;
    myCrawler.authUser = opts.user;
  }

  if (opts.password && opts.password.length > 0) {
    myCrawler.needsAuth = true;
    myCrawler.authPass = opts.password;
  }

  if (typeof opts.fetchcomplete === 'function') {
    myCrawler.on("fetchcomplete", opts.fetchcomplete);
  }

  if (typeof opts.complete === 'function') {
    myCrawler.on("complete", opts.complete);
  }
  
  myCrawler.start();

}

module.exports = SpiderGwen;