<screenshot-url>
  <input type="text" placeholder="/url/path" class="url-capture" value={ opts.capture.url || "" } />
  <input type="text" placeholder="homepage" class="url-filename" value={ opts.capture.filename || "" } />
  <input type="number" placeholder="1000" class="url-width" value={ opts.capture.width || "" } />
  <input type="number" placeholder="500"  class="url-height" value={ opts.capture.height || "" } />

  <label>
    <input type="checkbox" name="crop" class="url-crop" onChange={ setCropStatus } /> Crop
  </label>
  <input type="number" name="crop:x" class="url-crop-x" placeholder="crop starting x" value={ opts.capture.crop.x || "0" } />
  <input type="number" name="crop:y" class="url-crop-y" placeholder="crop starting y" value={ opts.capture.crop.y || "0" } />
  <input type="number" name="crop:w" class="url-crop-w" placeholder="crop width" value={ opts.capture.crop.width || "500" } />
  <input type="number" name="crop:h" class="url-crop-h" placeholder="crop height" value={ opts.capture.crop.height || "500" } />
  <button onClick={ takeScreenshot }>capture</button>

  <script>
    var shouldCrop = false;
    var self = this;

    getAllOptions() {
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
    }

    setCropStatus(e){
      shouldCrop = e.target.checked;
    }

    takeScreenshot(e) {
      var filename = this.root.querySelector('.url-filename').value;
      var capOptions = self.getAllOptions();
      ipcRenderer.send('capture-submit', capOptions, '/Users/francisco.gutierrez1/Downloads/', filename);
    }
  </script>
</screenshot-url>