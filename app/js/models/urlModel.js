class UrlModel {
  
  model(){
    return {
      filename : typeof "str",
      width: typeof 10,
      height: typeof 10, 
      crop: typeof {}
    };
  }

  constructor(urlObj) {
    if (!urlObj || !urlObj.url) {
      console.log("UrlModel: url required");
      return false;
    }

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

    this.urlObj = currentUrlObj;
  }

  get url(){
    return this.urlObj;
  }

}

module.exports = UrlModel;