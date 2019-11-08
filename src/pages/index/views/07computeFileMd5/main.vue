<style lang="less" scoped>
#dropArea {
	width: 500px;
	height: 200px;
	line-height: 200px;
	text-align: center;
	font-size: 30px;
	color: #333;
	margin: 10px auto 0;
	border: 10px dashed #ddd;
	background: #fafafa;
}
table {
	width: 100%;
	border-collapse: collapse;
	th,
	td {
		border: 1px solid #eee;
		font-size: 12px;
		color: #555;
		text-align: center;
		padding: 5px 0;
	}
}
</style>
<template>
	<section>
		<section id="dropArea">把文件拽到这里</section>
		<table>
			<thead>
				<tr>
					<th width="50%">文件</th>
					<th>md5</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in fileList" :key="item.id">
					<td>{{item.relativePath}}</td>
					<td>{{item.status==1?item.md5:"计算中"}}</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>
<script>
import Worker from 'worker-loader!./md5.worker.js'
export default {
	data() {
		return {
			fileList: []
		}
	},
	mounted() {
		const el = document.querySelector('#dropArea');
		el.addEventListener("dragover", e => {
			// 默认元素不能被drop。想要drop必须在dragover事件中阻止默认事件。
			// 不能释放、能释放的光标不一样。
			e.preventDefault();
		});
		el.addEventListener("drop", e => {
			Array.from(e.dataTransfer.items).forEach(item => {
				// Returns an object based on FileSystemEntry representing the selected file's entry in its file system.
				const entry = item.webkitGetAsEntry();
				if (entry.isFile) {
					this.addFileToList(entry);
				} else {
					this.loadFolder(entry);
				}
			});
			e.preventDefault();
		});
	},
	methods: {
		loadFolder(directoryEntry) {
			const reader = directoryEntry.createReader();
			reader.readEntries(entries => {
				Array.from(entries).forEach(entry => {
					if (entry.isFile) {
						this.addFileToList(entry);
					} else {
						this.loadFolder(entry);
					}
				});
			});
		},
		addFileToList(entry) {
			entry.file(file => {
				let obj = { file };
				obj.id = this.xtools.randomId();
				obj.relativePath = entry.fullPath.substring(1);
				obj.status = 0;
				obj.md5 = null;
				this.computingFileMd5(file).then(md5 => {
					obj.md5 = md5;
					obj.status = 1;
				});
				this.fileList.push(obj);
			}, err => { console.log(err); });
		},
		computingFileMd5(file) {
			let promise = new Promise((resolve, reject) => {
				const worker = new Worker();
				worker.postMessage(file);
				worker.onmessage = e => {
					resolve(e.data);
				};
			});
			return promise;
		},
	},
}
</script>