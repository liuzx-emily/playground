const TASK_STATE = {
  INITIALIZATION: Symbol("初始化"),
  COMPUTING_MD5: Symbol("正在计算md5"),
  FINISHED: Symbol("成功"),
  ERROR: Symbol("出错"),
};

export { TASK_STATE };
