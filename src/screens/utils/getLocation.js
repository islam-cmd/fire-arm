import * as Location from "expo-location";
import { db } from "../../config/firebase";

export default function getLocation() {
  const getCurrentLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return console.log("permission to access location is denied");
      }
      console.log("status is", status);
      let { coords } = await Location.getCurrentPositionAsync();
      // console.log("coords is", coords);
      if (coords) {
        let { longitude, latitude } = coords;
        let regionName = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        // console.log("regionName is", regionName[0]);
        let data = {
          longitude: longitude,
          latitude: latitude,
          ...regionName[0],
        };
        // console.log("data..........", data);
        if (Object.keys(data).length > 0) {
          try {
            await db
              .collection("locations")
              .doc()
              .set(data, { merge: true })
              .then(() => {})
              .catch((error) => {
                console.log("error...", error.message);
                alert(error.message);
              });
          } catch (error) {
            console.log("error...", error.message);
            alert(error.message);
          }
        }
      }
    })();
  };
  return getCurrentLocation();
}
