<screenshot-url>
  <input type="text" class="url-capture" />
  <button onClick={ takeScreenshot }>capture</button>

  <script>
    takeScreenshot(e) {
      var capUrl = document.querySelector('.url-capture');
      ipcRenderer.send('capture-submit', capUrl.value);
    }
  </script>
</screenshot-url>