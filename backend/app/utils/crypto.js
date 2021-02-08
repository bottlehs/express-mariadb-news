const CryptoJS = require("crypto-js");

exports.cryptoAesEncrypt = (value) => {
  var aesKey = CryptoJS.enc.Utf8.parse("2E1655F7CCDF670AB23F56D0820E4918");
  var iv   = CryptoJS.enc.Utf8.parse("155DB2C9362C15A7AF3F461383B8F108");
  var encrypted = CryptoJS.AES.encrypt(value, aesKey,{iv: iv}).toString();
  return encrypted;
};

exports.cryptoAesDecrypt = (value) => {
  var aesKey = CryptoJS.enc.Utf8.parse("2E1655F7CCDF670AB23F56D0820E4918");
  var iv   = CryptoJS.enc.Utf8.parse("155DB2C9362C15A7AF3F461383B8F108");
  var decrypted = CryptoJS.AES.decrypt(value, aesKey,{iv: iv}).toString(CryptoJS.enc.Utf8);
  return decrypted;
};