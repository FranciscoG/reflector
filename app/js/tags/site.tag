<site>
  <div class="form-group">
    <label>Site Url</label>
    <input type="text" class="site-root-url" />
  </div>

  <input type="text" placeholder="login" class="site-un" value={ opts.login || '' } />
  <input type="text" placeholder="password" class="site-pw" value={ opts.password || '' } />
  <input type="text" placeholder="screenshot" class="site-filename-prefix" value={ opts.filename || 'screenshot' } />
  <input type="number" placeholder="1000" class="site-width" value={ opts.width || '1000' } />

  <p class="site-output-path">{ opts.outputFolder || '' }</p>

  <button id="savePath" onClick={ showDialog }>save to</button>
  <button id="submit" onClick={ startSpider }>begin spider</button>

  <script>
    var self = this;

    startSpider(e) {
      e.preventDefault();
      var un = this.root.querySelector('.site-un');
      var pw = this.root.querySelector('.site-pw');
      var url = this.root.querySelector('.site-root-url');
      ipcRenderer.send('url-submit', url.value, un.value, pw.value);
    }

    ipcRenderer.on('url-fetched', function(event, arg) {
      document.writeln(`<p>${arg}</p>`); 
    });

    showDialog(e) {
      var myDialogOptions = {
        title: "choose a folder",
        properties: [ 'openDirectory' ]
      };
      ipcRenderer.send('open-dialog', myDialogOptions, 'get-save-path');
    }

    ipcRenderer.on('get-save-path', function(event, dirArray) {
      console.log(dirArray);
      self.root.querySelector('.site-output-path').textContent = dirArray[0];
    });

  </script>
</site>