riot.tag2('site', '<div class="form-group"> <label>Site Url</label> <input type="text" class="site-root-url"> </div> <input type="text" placeholder="login" class="site-un" value="{opts.login || \'\'}"> <input type="text" placeholder="password" class="site-pw" value="{opts.password || \'\'}"> <input type="text" placeholder="screenshot" class="site-filename-prefix" value="{opts.filename || \'screenshot\'}"> <input placeholder="1000" class="site-width" value="{opts.width || \'1000\'}" type="{\'number\'}"> <p class="site-output-path">{opts.outputFolder || \'\'}</p> <button id="savePath" onclick="{showDialog}">save to</button> <button id="submit" onclick="{startSpider}">begin spider</button>', '', '', function(opts) {
    var self = this;

    this.startSpider = function(e) {
      e.preventDefault();
      var un = this.root.querySelector('.site-un');
      var pw = this.root.querySelector('.site-pw');
      var url = this.root.querySelector('.site-root-url');
      ipcRenderer.send('url-submit', url.value, un.value, pw.value);
    }.bind(this)

    ipcRenderer.on('url-fetched', function(event, arg) {
      document.writeln(`<p>${arg}</p>`);
    });

    this.showDialog = function(e) {
      var myDialogOptions = {
        title: "choose a folder",
        properties: [ 'openDirectory' ]
      };
      ipcRenderer.send('open-dialog', myDialogOptions, 'get-save-path');
    }.bind(this)

    ipcRenderer.on('get-save-path', function(event, dirArray) {
      console.log(dirArray);
      self.root.querySelector('.site-output-path').textContent = dirArray[0];
    });

}, '{ }');
riot.tag2('screenshot-url', '<input type="text" placeholder="/url/path" class="url-capture" value="{opts.capture.url || ⁗⁗}"> <input type="text" placeholder="homepage" class="url-filename" value="{opts.capture.filename || ⁗⁗}"> <input placeholder="1000" class="url-width" value="{opts.capture.width || ⁗⁗}" type="{\'number\'}"> <input placeholder="500" class="url-height" value="{opts.capture.height || ⁗⁗}" type="{\'number\'}"> <label> <input type="checkbox" name="crop" class="url-crop" onchange="{setCropStatus}"> Crop </label> <input name="crop:x" class="url-crop-x" placeholder="crop starting x" value="{opts.capture.crop.x || ⁗0⁗}" type="{\'number\'}"> <input name="crop:y" class="url-crop-y" placeholder="crop starting y" value="{opts.capture.crop.y || ⁗0⁗}" type="{\'number\'}"> <input name="crop:w" class="url-crop-w" placeholder="crop width" value="{opts.capture.crop.width || ⁗500⁗}" type="{\'number\'}"> <input name="crop:h" class="url-crop-h" placeholder="crop height" value="{opts.capture.crop.height || ⁗500⁗}" type="{\'number\'}"> <button onclick="{takeScreenshot}">capture</button>', '', '', function(opts) {
    var shouldCrop = false;
    var self = this;

    this.getAllOptions = function() {
      var options = {
        url : this.root.querySelector('.url-capture').value,
        quality : 80
      };
      var width = this.root.querySelector('.url-width').value;
      var height = this.root.querySelector('.url-height').value;

      if (width !== "") {
        options.width = parseInt(width,10);
      }
      if (height !== "") {
        options.height = parseInt(height,10);
        options.page = false;
      }

      if (shouldCrop) {
        options.crop = {
          x : parseInt(this.root.querySelector('.url-crop-x').value, 10),
          y : parseInt(this.root.querySelector('.url-crop-y').value, 10),
          width: parseInt(this.root.querySelector('.url-crop-w').value, 10),
          height : parseInt(this.root.querySelector('.url-crop-h').value, 10),
        }
      }

      return options;
    }.bind(this)

    this.setCropStatus = function(e){
      shouldCrop = e.target.checked;
    }.bind(this)

    this.takeScreenshot = function(e) {
      var filename = this.root.querySelector('.url-filename').value;
      var capOptions = self.getAllOptions();
      ipcRenderer.send('capture-submit', capOptions, '/Users/francisco.gutierrez1/Downloads/', filename);
    }.bind(this)
}, '{ }');