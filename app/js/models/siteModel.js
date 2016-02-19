class SiteModel {
  
  model(){
    return {
      outputFolder : typeof "str",
      filename : typeof "str",
      width: typeof 10,
      login: typeof "str", 
      password: typeof "str", 
      urls: typeof []
    };
  }

  constructor(options) {

    let defaults = {
      outputFolder : './',  // local folder to save files
      filename : 'screenshot',  // prefix for file name.
      width: 1000,
      login: null, // string
      password: null, // string
      urls: [] // array
    };

    this.opts = Object.assign({}, defaults, options);
  }

  get urls() {
    return this.opts.urls;
  }

  set urls(urlObj) {
    if (urlObj.url) {

      let urlDefaults = {
        filename : "", // string
        width: null, // number
        height: null, // number
        crop : null // object
      };

      var currentUrlObj = Object.assign({}, urlDefaults, urlObj);

      // add in the protocol if it's missing
      if (!/^https?:\/\//i.test(this.opts.url)) {
        currentUrlObj.url = "http://" + currentUrlObj.url;
      }

      if (this.opts.login && this.opts.password) {
         let x = currentUrlObj.url.split("//");
         currentUrlObj.url = `${x[0]}//${this.opts.login}:${this.opts.password}@${x[1]}`;
      }

      this.opts.urls.push(currentUrlObj);
    }
  }

  export() {
    return this.opts;
  }

}

module.exports = SiteModel;