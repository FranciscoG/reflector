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

  export() {
    return this.opts;
  }

}

module.exports = SiteModel;