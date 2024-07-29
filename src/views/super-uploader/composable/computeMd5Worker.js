import SparkMD5 from "spark-md5";

const chunkSize = 2 * 1024 * 1024; // Read in chunks of 2MB

self.addEventListener("message", (e) => {
  computeMd5(e.data.file)
    .then((md5) => {
      // 成功了，但因算得太快察觉不到排队，所以故意加个延时方便看排队效果
      setTimeout(() => {
        self.postMessage({ isSuccessful: true, md5 });
      }, 200);
    })
    .catch((errMsg) => {
      self.postMessage({ isFailed: true, errMsg });
    });
});

function computeMd5(file) {
  const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

  return new Promise((resolve, reject) => {
    var chunksCount = Math.ceil(file.size / chunkSize);
    var currentChunk = 0;
    var spark = new SparkMD5.ArrayBuffer();
    var fileReader = new FileReader();
    fileReader.onload = (e) => {
      spark.append(e.target.result);
      currentChunk++;
      if (currentChunk < chunksCount) {
        loadNext();
      } else {
        const md5 = spark.end();
        resolve(md5);
      }
    };
    fileReader.onerror = () => {
      reject("Something went wrong when reading the file");
    };
    function loadNext() {
      var start = currentChunk * chunkSize;
      var end = Math.min(start + chunkSize, file.size);

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }
    loadNext();
  });
}
