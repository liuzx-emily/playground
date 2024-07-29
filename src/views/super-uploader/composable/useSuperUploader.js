import { ref } from "vue";
import { ComputeMd5Factory } from "./computeMd5Factory";
import { TASK_STATE } from "./state";

let __uuid = 0;

export function useSuperUploader() {
  const list = ref([]);

  const computingMd5Factory = new ComputeMd5Factory();

  function addTask({ file, path }) {
    const task = {
      id: __uuid++,
      state: TASK_STATE.INITIALIZATION,
      errMsg: "",
      file,
      path,
      md5: null,
    };
    list.value.push(task);
    // console.log(list.value[list.value.length - 1] === task);  // vue3 中返回 false！所以下面不能传 task
    computeTask(task.id); // 这里必须传 taskId，根据 id 去 list 中找。如果直接传这个 task 对象，数据变化但是视图不会响应。
  }

  function computeTask(taskId) {
    const task = list.value.find((task) => task.id === taskId);
    task.state = TASK_STATE.COMPUTING_MD5;

    computingMd5Factory
      .addFile(task.file)
      .then((md5) => {
        task.md5 = md5;
        task.state = TASK_STATE.FINISHED;
      })
      .catch((errMsg) => {
        task.errMsg = errMsg;
        task.state = TASK_STATE.ERROR;
      });
  }

  function initUploadFile(el) {
    const realUploadEl = document.createElement("input");
    realUploadEl.setAttribute("type", "file");
    realUploadEl.setAttribute("multiple", true);
    realUploadEl.style.display = "none";
    realUploadEl.addEventListener("change", () => {
      let files = realUploadEl.files;
      for (let i = 0; i <= files.length - 1; i++) {
        let file = files[i];
        // file.webkitRelativePath 是 ""。路径只能用 file.name
        addTask({ file, path: file.name });
      }
    });
    document.body.appendChild(realUploadEl);
    el.addEventListener("click", () => {
      realUploadEl.click();
    });
  }

  function initUploadDirectory(el) {
    const realUploadEl = document.createElement("input");
    realUploadEl.setAttribute("type", "file");
    realUploadEl.setAttribute("webkitdirectory", true);
    realUploadEl.style.display = "none";
    realUploadEl.addEventListener("change", () => {
      let files = realUploadEl.files;
      for (let i = 0; i <= files.length - 1; i++) {
        let file = files[i];
        // file.webkitRelativePath 有值，路径就是我需要的格式
        addTask({ file, path: file.webkitRelativePath });
      }
    });
    document.body.appendChild(realUploadEl);
    el.addEventListener("click", () => {
      realUploadEl.click();
    });
  }

  function initDragAndDrop(el) {
    el.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    el.addEventListener("drop", (e) => {
      let items = e.dataTransfer.items;
      for (let i = 0; i <= items.length - 1; i++) {
        let item = items[i];
        if (item.kind === "file") {
          let entry = item.webkitGetAsEntry();
          getFileFromEntryRecursively(entry);
        }
      }
      e.preventDefault();
    });
  }

  function getFileFromEntryRecursively(entry) {
    if (entry.isFile) {
      entry.file(
        (file) => {
          console.log(entry.fullPath);
          // file.webkitRelativePath 是 ""。
          // entry.fullPath 有值，但是最前面有斜杠，要和其他两种上传方法统一格式所以把斜杠去掉
          let path = entry.fullPath.substring(1);
          addTask({ file, path });
        },
        (e) => {
          console.log(e);
        }
      );
    } else {
      let reader = entry.createReader();
      reader.readEntries(
        (entries) => {
          entries.forEach((entry) => getFileFromEntryRecursively(entry));
        },
        (e) => {
          console.log(e);
        }
      );
    }
  }

  return { list, initUploadFile, initUploadDirectory, initDragAndDrop };
}
