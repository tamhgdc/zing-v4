class Helper {
  fmtMSS(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  }
  fmtMSSToString(s) {
    return (
      Math.floor(s / 3600) +
      " giờ " +
      Math.floor(((s / 3600) % Math.floor(s / 3600)) * 60) +
      " phút"
    );
  }
  likesFormat(number) {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1000000) {
      return (number - (number % 1000)) / 1000 + "k";
    } else {
      return (number - (number % 100000)) / 1000000 + "M";
    }
  }
}

export default new Helper();
