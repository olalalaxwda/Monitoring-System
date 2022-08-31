import { checkWhiteScreen, sendComponentState, monitoringUrl } from './monitoring';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import sendPerformanceData from './keyPerformanceMonitoring';
// import monitoringUrl from './vv'



monitoringUrl();

checkWhiteScreen(10) // 监听body节点的变化间隔

// 错误发生时，回调函数会被执行，并将其返回值发生
sendComponentState(() => {

  return {
    name: "test组件",
    data: 0 + ""
  }
})
sendComponentState(() => {

  return {
    name: "tes",
    data: 0 + "456"
  }
})

sendPerformanceData(); // 兼容window.load, 放在最后
// js错误示例
// console.log(t)

// 请求成功示例
// axios.get("http://localhost:3000/")

// 请求失败示例
// axios.get("http://localhost:300/")
ReactDOM.render(
  <HashRouter><App /></HashRouter>
  , document.getElementById('root')
)
