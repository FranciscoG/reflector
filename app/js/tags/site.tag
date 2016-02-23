<site>
  <input type="text" class="site-root-url" />

  <input type="text" class="site-un" />
  <input type="text" class="site-pw" />
  <input type="text" class="site-output-path" />
  <input type="text" class="site-filename-prefix" />
  <input type="number" class="site-width" />

  <button id="submit" onClick={ startSpider }>begin spider</button>

  <script> 
    //const ipcRenderer = require('electron').ipcRenderer;

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
  </script>
</site>