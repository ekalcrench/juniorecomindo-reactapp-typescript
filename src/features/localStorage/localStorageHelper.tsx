import { AESEncrypt, AESDecrypt } from "./crypto";
import { differenceInDays } from "date-fns";

export function LocalStoreList(
  localSessionName: any, // key yang ingin disimpan di localStorage
  value: any, // value yang ingin disimpan di localStorage
  maxDaysOld: any //Maksimal berapa hari penyimpanan di localStorage
) {
  // Get localStorage
  var localStorageData = localStorage.getItem(localSessionName);
  console.log("localStorageData : ", localStorageData);

  //   Set Date
  var today = new Date();
  console.log("today : ", today);
  const cDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  console.log("cDate : ", cDate);

  //  Jika localStorage dengan key = localSessionName belum ada
  if (localStorageData == null) {
    console.log("localStorageData == null");
    //   Data localStorage berisi value dan date
    var data = [{ value: value, date: cDate }];
    // Set localStorage
    localStorage.setItem(localSessionName, AESEncrypt(data));
  }
  //   Jika localStorage dengan key = localSessionName sudah ada
  else {
    console.log("localStorageData != null");
    var newDataArr = [];
    let dataArr = AESDecrypt(localStorageData);
    console.log("dataArr : ", dataArr);
    var isDuplicate = false;
    dataArr.forEach((element: { date: any; value: string }) => {
      console.log("element.value : ", element.value);
      //  Get date dari data localStorage
      let recordDate = new Date(element.date);
      console.log("recordDate : ", recordDate);
      var daysDiff = differenceInDays(today, recordDate);
      console.log("daysDiff : ", daysDiff);
      if (daysDiff <= maxDaysOld) {
        newDataArr.push(element);
        console.log("maxDaysOld : ", maxDaysOld);
        // Check for duplicate entry
        if (
          JSON.stringify(element.value).toLowerCase() ===
          JSON.stringify(value).toLowerCase()
        ) {
          isDuplicate = true;
          console.log("isDuplicate : ", isDuplicate);
        }
      }
    });

    // Add new value if value is not a duplicate
    if (!isDuplicate) {
      newDataArr.push({ value: value, date: cDate });
    }

    localStorage.setItem(localSessionName, AESEncrypt(newDataArr));
  }
}

export function DeleteLocalStoreListItem(
  localSessionName: any,
  deleteValue: any
) {
  var localStorageData = localStorage.getItem(localSessionName);

  if (localStorageData !== null) {
    var newDataArr: any[] = [];
    let dataArr = AESDecrypt(localStorageData);

    dataArr.forEach((element: any) => {
      if (element.value !== deleteValue) {
        newDataArr.push(element);
      }
    });

    localStorage.setItem(localSessionName, AESEncrypt(newDataArr));
  }
}

export function GetLocalStorageData(localSessionName: any) {
  var data = localStorage.getItem(localSessionName);
  let array: never[] = [];

  if (data == null) {
    return array;
  } else {
    const lastSearch = AESDecrypt(data);
    return lastSearch;
  }
}
