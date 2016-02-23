'use strict';
const screenshot = require('electron-screenshot-app');
const fs = require('fs');

class TakeAShot {

  constructor (options){
    if (!options || !options.url) {
      console.log("screenshots: url required");
      return false;
    }

    // defaults from: https://github.com/FWeinb/electron-screenshot-app
    var defaults = {
      // these are defaults unchanged from source
      delay: 0,  // Useful when the site does things after load that you want to capture.
      crop: void(0), // object {x:,  y:,  width:, height: }
      css: void(0), // String: This css will be injected into the page before the screenshot is taken.  example:  "html,body{ background-color: transparent !important;}"
      transparent: false, // This will enable transparency. Keep in mind that most site do set a background color on the html/body tag. 
      nodeIntegration : false, // This will enable node integration in the electron window, be careful because this can open up some serious security issues.
      secure: true, // This will enable/disable web security in the electron window
      loadevent: void(0), // The name of a custom page side event which can be used to trigger the page capture. Useful for JS heavy sites
      format: "jpeg",  // only jpeg or png supported
      quality: 80, // If format is 'jpeg', defines the quality of the image '0-100'

      // my change to the defaults
      page: true, // This will try to capture the whole page. width and height are considered the minimum size.
      height: 500,
      width: 1000 
    };
   
    this.opts = Object.assign({}, defaults, options);

    // default path and file name
    this._savePath = "./";
    this._filename = "screenshot" + '.' + this.opts.format;

    // add in the protocol if it's missing
    if (!/^https?:\/\//i.test(this.opts.url)) {
      this.opts.url = "http://" + this.opts.url;
    }
  }

  get filePath() {
    return this._savePath;
  }
  set filePath(loc) {
    this._savePath = loc;
  }

  get fileName() {
    return this._filename;
  }
  set fileName(name) {
    this._filename = name + '.' + this.opts.format;
  }
  
  saveImg (err, image) {
    fs.writeFileSync(this.filePath + this.fileName, image.data);
  }

  screenShotToGetHeight(err, image) {
    this.opts.height = image.size.height;
    
    screenshot(
      this.opts,
      this.saveImg.bind(this)
    );
  }

  run(){
    if (!this.opts.page) {
      screenshot(
        this.opts,
        this.saveImg.bind(this)
      );
    } else {
      screenshot(
        this.opts,
        this.screenShotToGetHeight.bind(this)
      );
    }
    
  }
}

module.exports = TakeAShot;
