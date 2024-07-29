<style lang="scss" scoped>
.uploader-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  input[type="button"] {
    cursor: pointer;
    margin-right: 20px;
  }
  .dropArea {
    width: 200px;
    line-height: 50px;
    background: #fafafa;
    color: #bd7096;
    border: 5px solid #bd7096;
    text-align: center;
    font-size: 20px;
  }
}
table {
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #bbb;
    text-align: center;
  }
}
</style>
<template>
  <section>
    <!-- 
    和 nodejs 环境不同，在浏览器中无法获取上传的文件的完整路径，只能获取相对路径（相对上传时选中的文件/目录）。这是浏览器安全策略，无法突破。

    假设 a 文件完整路径为 dir1/dir2/dir3/dir4/a.txt.

    “上传文件”操作只能在 a 的直接父级，所以此时路径只能是 a.txt。
    “上传文件夹”操作可能在 a 的任意父级目录。上传哪个父目录，路径就从哪开始。比如上传 dir3，那么路径是 dir3/dir4/a.txt。
    “拖放文件”操作同上传文件夹。
    -->

    <!-- 
    computeMd5Factory.js：负责排队，给每个任务安排一个 Web Worker 
    computeMd5Worker.js：worker 文件，分块读取文件计算 md5。 
    -->
    <p>
      <a href="https://liuzx-emily.github.io/blog/#/post/e804da0f-9378-4047-83f7-ec37487f2cd9"
        >《Super Uploader：上传文件、上传文件夹、拖拽上传》</a
      >
    </p>

    <div class="uploader-container">
      <input type="button" value="上传文件" ref="uploadFileButton" />
      <input type="button" value="上传文件夹" ref="uploadDirectoryButton" />
      <section class="dropArea" ref="dropArea">把文件拽进来</section>
    </div>
    <table>
      <thead>
        <tr>
          <th width="40%">名称</th>
          <th>完整路径</th>
          <th>状态</th>
          <th>md5</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in list" :key="task.id">
          <td>{{ task.file.name }}</td>
          <td>{{ task.path }}</td>
          <td>{{ task.state }}</td>
          <td>{{ task.md5 }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useSuperUploader } from "./composable/useSuperUploader.js";

const uploadFileButton = ref();
const uploadDirectoryButton = ref();
const dropArea = ref();

const { list, initUploadFile, initUploadDirectory, initDragAndDrop } = useSuperUploader();

onMounted(() => {
  initUploadFile(uploadFileButton.value);
  initUploadDirectory(uploadDirectoryButton.value);
  initDragAndDrop(dropArea.value);
});
</script>
