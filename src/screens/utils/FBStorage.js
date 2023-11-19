import "react-native-get-random-values";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import * as uuid from "uuid";
import getLocation from "./getLocation";

export { useCamera, useFile, saveImageFB }


async function useCamera(userID) {
  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });
  console.log("File is chosen using camera");

  manageUpload(result, userID);
}

async function useFile(userID) {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });
  console.log("File is chosen using existing images");

  manageUpload(result, userID);
}

async function manageUpload(result, userID) {
  getLocation();
  try {
    if (!result.cancelled) {
      const imageURL = await saveImageFB(result.uri, userID);
      console.log("Success");
    }
  } catch (e) {
    console.log(e);

    // TODO: Error message must show option to connect with CCO.
    alert("Error when uploading image");
  }
}

async function saveImageFB(uri, userID) {
  try {
    getLocation();
  } catch (e) {
    console.log("Error getting location: " + e);
  }

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), "images/" + [userID, Date.now()].join("_") + ".png");
  const result = await uploadBytes(fileRef, blob);

  blob.close();

  return await getDownloadURL(fileRef);
}
