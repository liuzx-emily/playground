import sparkMD5 from 'spark-md5'
self.onmessage = function(ev) {
	const file = ev.data;
	// console.time(1);
	computeFileMd5(file).then(md5 => {
		// console.timeEnd(1);
		self.postMessage(md5);
	});
};

function computeFileMd5(file) {
	let promise = new Promise((resolve, reject) => {
		var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
			chunkSize = 1048576, // Read in chunks of 1MB
			chunks = Math.ceil(file.size / chunkSize),
			currentChunk = 0,
			spark = new sparkMD5.ArrayBuffer(),
			fileReader = new FileReader();
		fileReader.onload = function(e) {
			// console.log('read chunk nr', currentChunk + 1, 'of', chunks);
			spark.append(e.target.result); // Append array buffer
			currentChunk++;
			if (currentChunk < chunks) {
				loadNext();
			} else {
				const md5 = spark.end();
				// console.log(`${file.name}的md5为${md5}`);
				resolve(md5);
			}
		};
		fileReader.onerror = function() {
			console.warn('oops, something went wrong.');
		};

		function loadNext() {
			var start = currentChunk * chunkSize,
				end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
			fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
		}

		loadNext();
	});
	return promise;
}