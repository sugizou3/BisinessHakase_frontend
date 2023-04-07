
const dateFunction = (date) => {
    var diff = new Date() - new Date(date);
    var mes_diff;
    var min = parseInt(diff / 1000 / 60);

    if (min >= 60) {
      var hour = parseInt(min / 60);
      if (hour >= 24) {
        var day = parseInt(hour / 24);
        if (day <= 7) {
          mes_diff = day + "日前";
        } else if (day <= 31) {
          var week = parseInt(day / 7);
          mes_diff = week + "週間前";
        } else if (day <= 365) {
          var month = parseInt(day / 31);
          mes_diff = month + "か月前";
        } else {
          var year = parseInt(day / 365);
          mes_diff = year + "年前";
        }
      } else {
        mes_diff = hour + "時間前";
      }
    } else {
      if (min > 0) {
        mes_diff = min + "分前";
      } else {
        mes_diff = "たった今";
      }
    }
    return mes_diff;
  };

export default dateFunction;