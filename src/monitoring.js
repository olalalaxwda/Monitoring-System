import axios from 'axios';
import getCurrentDate from './utils/getDate';
const apiMonitoring = "https://bn40758905.zicp.fun/monitoringapi"
// const apiMonitoring = "http://localhost:9090/monitoringapi"


let componentState = [] // 各种情况发生时，保存各个组件的状态
let componentFuncArry = [] // 获取各个组件状态的回调函数
let ax = axios.create();
ax.interceptors.response.use(function (response) { return response }, function (response) { return response }); //重置监听器
axios.interceptors.response.use(
  // 2xx 范围内的状态码都会触发该函数，请求正常
  function (response) {
    console.log(response)
    let succeed = {
      status: response.status + "",
      url: response.config.url
    }
    sendMonitoring(succeed, "apisucceed")
    console.log(succeed)
    return response;
  },
  // 超出 2xx 范围的状态码都会触发该函数，请求异常(失败)
  function (error) {
    console.log(error)
    let er = {

      code: error.code, // 请求异常状态
      message: error.message, // 请求异常信息
      url: error.config.url // 请求异常url
    }
    sendMonitoring(er, "apifailed")
    console.log(er)
    return error
  });
// 接收回调函数
function sendComponentState(func) {
  componentFuncArry.push(func)
}

// 执行回调函数，存入状态数组
function getState() {
  if (componentFuncArry != null) {
    componentFuncArry.forEach(element => {
      componentState.push(element())

    });
    let stataAr = componentState
    console.log(stataAr)
    componentState = []
    return stataAr
  }

}

function sendMonitoring(ob, address) {
  ax.post(apiMonitoring + "/" + address, { ...ob, stateAr: getState() }).then((succeed) => {
    // console.log(succeed)
  }, (fail) => {
    console.log(fail)
  })
}



// 兼容react单击事件
let oldEr = {
  filename: NaN, // 错误文件名
  lineno: NaN, // 行号
  message: NaN, // 错误具体信息
  erTime: NaN
}
// js同步异步异常
window.addEventListener('error', (event) => {
  console.log(event);
  // if (event.filename == "")
  //   return
  let er = {
    filename: event.filename, // 错误文件名
    lineno: event.lineno + "", // 行号
    message: event.message, // 错误具体信息
    erTime: new Date()

  }
  if (oldEr.filename == er.filename && oldEr.lineno == er.lineno && oldEr.message == er.message && (er.erTime - oldEr.erTime) < 1000 && er.file != "") {
    oldEr = er
    return
  }

  oldEr = er

  sendMonitoring({
    filename: er.filename,
    lineno: er.lineno,
    message: er.message
  }, "jspe")

})


// 监听资源加载错误
window.addEventListener('error', (event) => {

  let target = event.target || event.srcElement; // 过滤js error

  let isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;

  if (!isElementTarget) return false;

  // 上报资源地址
  let er = {
    targetClassName: target.className, // 标签class
    url: target.src || target.href, // 资源地址
  }
  sendMonitoring(er, "rse")

}, true)

// 监听未捕获的reject错误
window.addEventListener('unhandledrejection', (event) => {

  if (event.reason != undefined) {
    let er = {
      reason: event.reason
    }
    console.log(er)
    sendMonitoring(er, "reject")

  }



})







// 通过监控body的变化间隔是否大于传入的time，来判断是否白屏
function checkWhiteScreen(time) {

  let change = true // 变化标志

  const targetNode = document.body;   // 选择需要观察变动的节点

  const config = { attributes: true, childList: true, subtree: true };    // 观察器的配置（需要观察什么变动）

  // 当观察到变动时执行的回调函数
  const callback = function (mutationsList, observer) {

    // 变化信息会存入mutationsList，所以必须遍历mutationsList
    for (let mutation of mutationsList) {

      if (mutation.type === 'childList') {
        change = true // 标记为true，表示变化发生

      }
      else
        if (mutation.type === 'attributes') {
          change = true // 标记为true，表示变化发生
        }
    }
  };

  const observer = new MutationObserver(callback);    // 创建一个观察器实例并传入回调函数

  observer.observe(targetNode, config); // 以上述配置开始观察目标节点

  // 定时查看变化是否发生变化
  let intervalNum = setInterval(() => {

    if (change) { // 发生变化
      change = !change // 变化标志取反
    } else {
      clearInterval(intervalNum) // 删除定时器
      ax.get("https://restapi.amap.com/v3/ip?key=7d3b2a825b33ebef620eb222eadbc0d1").then(({ data: { city } }) => {
        if (city) {
          let ob = { city }
          ax.post(apiMonitoring + "/ws", ob).then(({ data }) => {

          })

        }
      })
    }
  }, time);

  // 页面加载完成
  window.onload = () => {

    clearInterval(intervalNum) // 删除定时器
    observer.disconnect(); // 取消监控
  }
}





// ----------vv-------------

let urlChangeAr = []
let pageTime = {}
let hiddenTime = undefined
let visibleTime = new Date()




window.onhashchange = (e) => {
  urlChangeAr.forEach((element) => {
    element(e.oldURL.split('/#/')[1], e.newURL.split('/#/')[1]);
  });
};

function ulrChange(func) {
  urlChangeAr.push(func);
}



document.addEventListener("visibilitychange", function () {
  var string = document.visibilityState
  console.log(string)
  if (string === 'hidden') {  // 当页面由前端运行在后端时，出发此代码
    hiddenTime = new Date()
    pageTime[Object.keys(pageTime)[0]].showTime += (hiddenTime - visibleTime) * 1

  }
  if (string === 'visible') {   // 当页面由隐藏至显示时
    visibleTime = new Date()

  }


});

if (window.location.href.split("/#/")[1] == undefined) {
  pageTime["index"] = {
    startTime: new Date(),
    endTime: undefined,
    showTime: 0
  }

}
else {

  pageTime[window.location.href.split("/#/")[1]] = {
    startTime: new Date(),
    endTime: undefined,
    showTime: 0
  }
}

ulrChange((oldURL, newURL) => {
  if (oldURL === undefined || oldURL === '') {
    pageTime['index'].endTime = new Date();
  } else {
    pageTime[oldURL].endTime = new Date();
  }
  console.log(pageTime);
  if (hiddenTime === undefined) {
    pageTime[Object.keys(pageTime)[0]].showTime =
      pageTime[Object.keys(pageTime)[0]].endTime -
      pageTime[Object.keys(pageTime)[0]].startTime;
  }

  ax.post(apiMonitoring + '/ps', {
    page: Object.keys(pageTime)[0],
    stayTime:
      pageTime[Object.keys(pageTime)[0]].endTime -
      pageTime[Object.keys(pageTime)[0]].startTime +
      '',
    visibleTime: pageTime[Object.keys(pageTime)[0]].showTime + ''
  });

  pageTime = {};
  hiddenTime = undefined;
  visibleTime = new Date();

  if (newURL === undefined || newURL === '') {
    pageTime['index'] = {
      startTime: new Date(),
      endTime: undefined,
      showTime: 0
    };
  } else {
    pageTime[newURL] = {
      startTime: new Date(),
      endTime: undefined,
      showTime: 0
    };
  }
});

const history = window.history;
const historyExtend = function (type) {
  const orig = history[type];
  const e = new Event(type);
  return function () {
    const result = orig.apply(this, arguments);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return result;
  };
};




history.pushState = historyExtend('pushState');
history.replaceState = historyExtend('replaceState');

const uploadData = async (e) => {
  const currentTime = getCurrentDate();
  const data = {
    url: window.location.href,
    ip: await (await ax.get("https://api.ipify.org/?format=json")).data.ip
  };
  console.log(e.type);
  if (localStorage.getItem('uploadTime') === currentTime) {
    ax.post(apiMonitoring + '/pvInfo', data);
    console.log('data', data);
  } else {
    localStorage.setItem('uploadTime', currentTime + '');
    ax.post(apiMonitoring + '/pvInfo', data);
    ax.post(apiMonitoring + '/uvInfo', data);
    console.log('data', data);
  }
};

const monitoringUrl = () => {
  window.addEventListener('hashchange', uploadData);
  window.addEventListener('replaceState', uploadData);
  window.addEventListener('pushState', uploadData);
  window.addEventListener('popstate', uploadData);
  window.addEventListener("onload", uploadData)
};



export { checkWhiteScreen, sendComponentState, apiMonitoring, ax, monitoringUrl }


