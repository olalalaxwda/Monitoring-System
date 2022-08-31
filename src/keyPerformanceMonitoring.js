import { apiMonitoring,ax } from './monitoring';
const BASE_URL = apiMonitoring;

const getKeyData = () => {
  const keyPerformanceData = {};

  // PerformanceTiming API
  const {
    domainLookupStart,
    domainLookupEnd,
    fetchStart,
    domContentLoadedEventStart,
  } = window.performance.getEntriesByType('navigation')[0];

  const firstPaintTime =
    window.performance.getEntriesByType('paint')[0].startTime;
  const firstContentPaint =
    window.performance.getEntriesByType('paint')[1].startTime;

  keyPerformanceData.dnsTime = domainLookupEnd - domainLookupStart + ''; // dns解析查询时间
  keyPerformanceData.firstPaintTime = firstPaintTime - fetchStart + ''; // FP: 首次渲染时间(第⼀个非网页背景像素渲染)
  keyPerformanceData.firstContentPaint = firstContentPaint - fetchStart + ''; // FCP: 首次内容渲染时间(第一个 ⽂本、图像、背景图片或非白色 canvas/SVG 内容渲染)
  keyPerformanceData.domReady = domContentLoadedEventStart - fetchStart + ''; // DOMReady: 生成DOM树所花时间
  keyPerformanceData.whiteScreenTime = performance.timing.domLoading - performance.timing.fetchStart+"" // 白屏时间
  return keyPerformanceData;
};

const keyPerformanceMonitoring = () => {
  return new Promise((res) => {
    // 兼容之前的 window.onload
    const oldLoad = window.onload;
    const newLoad = () => {
      const keyPerformanceData = getKeyData();

      if (typeof oldLoad === 'function') {
        oldLoad();
      }
      res(keyPerformanceData);
    };
    window.onload = newLoad;
  });
};

const sendPerformanceData = () => {
  keyPerformanceMonitoring().then((data) => {
    ax.post(BASE_URL + '/keyperformancedata', data)
  });
};

export default sendPerformanceData;
