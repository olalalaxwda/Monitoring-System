const getCurrentDate = () => {
  // 获取当前日期
  const date = new Date();

  // 获取当前月份
  let nowMonth = date.getMonth() + 1;

  // 获取当前是几号
  let strDate = date.getDate();

  // 对月份进行处理，1-9月在前面添加一个“0”
  if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = '0' + nowMonth;
  }

  // 对月份进行处理，1-9号在前面添加一个“0”
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }

  // 最后拼接字符串
  const nowDate = date.getFullYear() + nowMonth + strDate;

  return nowDate;
};

export default getCurrentDate;