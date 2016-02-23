riot.tag2('site', '<input type="text" class="site-root-url"> <input type="text" class="site-un"> <input type="text" class="site-pw"> <input type="text" class="site-output-path"> <input type="text" class="site-filename-prefix"> <input class="site-width" type="number"> <button id="submit" onclick="{startSpider}">begin spider</button>', '', '', function(opts) {


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
}, '{ }');
riot.tag2('screenshot-url', '<input type="text" class="url-capture"> <button onclick="{takeScreenshot}">capture</button>', '', '', function(opts) {
    this.takeScreenshot = function(e) {
      var capUrl = document.querySelector('.url-capture');
      ipcRenderer.send('capture-submit', capUrl.value);
    }.bind(this)
}, '{ }');