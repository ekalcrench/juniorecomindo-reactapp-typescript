var CryptoJS = require("crypto-js");

export function AESEncrypt(pureText: any) {
  console.log("AESEncrypt pureText : ", pureText);
  const privateKey = `secret key 123`;
  console.log("privateKey : ", privateKey);
  var ciphertext = encodeURIComponent(
    CryptoJS.AES.encrypt(JSON.stringify(pureText), privateKey).toString()
  );
  console.log("ciphertext : ", ciphertext);
  return ciphertext;
}

export function AESDecrypt(encryptedText: any) {
  console.log("AESDecrypt encryptedText : ", encryptedText);
  const privateKey = `secret key 123`;
  console.log("privateKey : ", privateKey);
  var bytes = CryptoJS.AES.decrypt(
    decodeURIComponent(encryptedText),
    privateKey
  );
  console.log("bytes : ", bytes);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  console.log("decryptedData : ", decryptedData);
  return decryptedData;
}
