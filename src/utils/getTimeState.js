const getTimeState = () => {
  let timeNow = new Date();
  let hours = timeNow.getHours();

  if (hours >= 7 && hours <= 12) {
    return 0;
  } else if (hours > 12 && hours <= 19) {
    return 1;
  } else {
    return 2;
  }
};

export default getTimeState;
